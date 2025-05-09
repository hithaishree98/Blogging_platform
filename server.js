const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/database'); 
const path = require('path');
const Blog = require('./models/Blog'); 
const adminController = require('./controllers/adminController'); 
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const session = require('express-session'); 
const User = require('./models/User'); 
dotenv.config();

const app = express();
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    next();
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(session({
  secret: process.env.SECRET,  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }  
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null; 
  next();
});
connectToDatabase();

app.get('/', (req, res) => {
  res.render('index'); 
});

app.get('/explore', async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { destination: { $regex: searchQuery, $options: 'i' } }
      ]
    });
    res.render('explore', { blogs }); 
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Error loading explore page');
  }
});

app.post('/blogs/:id/like', isAuthenticated, async (req, res) => {
    const blogId = req.params.id;
    try {
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).send('Blog not found');

        blog.likes += 1;
        await blog.save();

        res.redirect(`/blogs/${blogId}`);
    } catch (error) {
        console.error('Error liking blog:', error);
        res.status(500).send('Error liking blog');
    }
});

app.post('/blogs/:id/comment', isAuthenticated, async (req, res) => {
    const blogId = req.params.id;
    const { text } = req.body;
    try {
        if (!text || text.trim() === '') return res.status(400).send('Comment cannot be empty');

        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).send('Blog not found');

        blog.comments.push({ user: req.session.user.id, text });
        await blog.save();

        res.redirect(`/blogs/${blogId}`);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Error adding comment');
    }
});

app.get('/blogs/create',isAuthenticated, (req, res) => {
  try {
    res.render('create'); 
  } catch (err) {
    console.error('Error rendering create page:', err.message);
    res.status(500).send('Error rendering create page');
  }
});

app.post('/blogs/create', async (req, res) => {
  try {
        if (!req.session.user) {
            return res.status(401).send('Unauthorized'); 
        }

        const { title, content, destination, imageUrl } = req.body;

        if (!title || !content || !destination) {
            return res.status(400).send('Title, content, and destination are required');
        }

        const newBlog = new Blog({
            title,
            content,
            destination,
            imageUrl,
            author: req.session.user.id, 
        });

        await newBlog.save();
        await User.findByIdAndUpdate(req.session.user.id, {
            $push: { myBlogs: newBlog._id },
        });

        res.redirect('/explore');
    } catch (err) {
        console.error('Error creating blog:', err.message);
        res.status(500).send('Error creating the blog');
    }
});


app.get('/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).send('Blog not found');
    res.render('blog', { blog });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/blogs/:id/edit', isAuthenticated, async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    res.render('edit', { blog }); 
  } catch (err) {
    console.error('Error fetching blog for edit:', err.message);
    res.status(500).send('Error loading edit page');
  }
});

app.post('/blogs/:id/edit', isAuthenticated, async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content, destination, imageUrl } = req.body;

    // Validate required fields
    if (!title || !content || !destination) {
      return res.status(400).send('Title, content, and destination are required');
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { title, content, destination, imageUrl },
      { new: true } 
    );

    if (!updatedBlog) {
      return res.status(404).send('Blog not found');
    }

    res.redirect(`/blogs/${blogId}`); 
  } catch (err) {
    console.error('Error updating blog:', err.message);
    res.status(500).send('Error updating blog');
  }
});

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next(); 
  } else {
    const blogId = req.params.id; 
    return res.status(403).render('delete', {
      blog: { _id: blogId },
      error: 'You do not have permission to perform this action',
    });
  }
};

app.get('/blogs/:id/delete', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    res.render('delete', { blog, error:null }); 
  } catch (err) {
    console.error('Error fetching blog for delete:', err.message);
    res.status(500).send('Error loading delete page');
  }
});

app.post('/blogs/:id/delete', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const blogId = req.params.id;

    const result = await Blog.deleteOne({ _id: blogId });

    if (result.deletedCount === 0) {
      return res.status(404).send('Blog not found');
    }

    res.redirect('/blogs');
  } catch (err) {
    console.error('Error deleting blog:', err.message);
    res.status(500).send('Error deleting blog');
  }
});

app.get('/blogs/:id/save', async (req, res) => {
  console.log(`GET request to /blogs/${req.params.id}/save`); 
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.render('save', { blog });
  } catch (error) {
    console.error(error);
    res.status(404).send('Blog not found');
  }
});

app.post('/blogs/:id/save', isAuthenticated, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    if (!blog.savedBy.includes(req.session.user.id)) {
      blog.savedBy.push(req.session.user.id); 
      await blog.save();
    }
    
    const user = await User.findById(req.session.user.id);
    if (!user.savedBlogs.includes(blog._id)) {
      user.savedBlogs.push(blog._id); 
      await user.save();
    }

    res.redirect(`/profile`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving the blog');
  }
});

app.get('/profile/:userId/saved', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('savedBlogs');
    if (!user) {
      return res.status(404).send('User not found');
    }

    const savedBlogs = await Blog.find({ savedBy: req.params.userId });
    
    res.render('profile', { savedBlogs }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading saved blogs');
  }
});

app.get('/profile/edit', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edit-profile', { user }); 
    } catch (err) {
        console.error('Error loading Edit Profile page:', err.message);
        res.status(500).send('Error loading Edit Profile page');
    }
});

app.post('/profile/edit', isAuthenticated, async (req, res) => {
    try {
        const { username, name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.session.user.id, {
            username,
            name,
            email
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        req.session.user.username = updatedUser.username;
        req.session.user.name = updatedUser.name;
        req.session.user.email = updatedUser.email;

        res.redirect('/profile'); 
    } catch (err) {
        console.error('Error updating profile:', err.message);
        res.status(500).send('Error updating profile');
    }
});


app.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id)
      .populate('savedBlogs')  
      .populate('myBlogs');    

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('profile', { user }); 
  } catch (err) {
    console.error('Error fetching profile data:', err.message);
    res.status(500).send('Error loading profile');
  }
});

app.get('/admin', adminController.dashboard);
app.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/'); 
  });
});
app.use('/auth', authRoutes);
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use(methodOverride('_method')); 
app.use((req, res) => {
  res.status(404).render('404');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${listener.address().port}`);
});