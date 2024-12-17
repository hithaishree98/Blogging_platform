const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/database'); // Import database connection logic
const path = require('path');
const Blog = require('./models/Blog'); // Import Blog model
const adminController = require('./controllers/adminController'); // Import admin controller
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

// Set the view engine to EJS and configure views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" folder

app.use(session({
  secret: process.env.SECRET,  // You should replace this with a more secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }  
}));

// Middleware to make user data available in all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null; // Assign the session user to a global variable
  next();
});

// // Admin check middleware
// const isAdmin = (req, res, next) => {
//   console.log("Session in isAdmin middleware:", req.session);
//   if (req.session.user && req.session.user.role === 'admin') {
//     return next(); // Proceed to the next middleware or route handler
//   } else {
//     return res.status(403).send('You do not have permission to perform this action'); // Deny if not an admin
//   }
// };


// app.get('/profile', (req, res) => {
//     if (!req.session.user) {
//         return res.redirect('/auth/login'); // Redirect to login if user is not authenticated
//     }
//     res.render('profile', { user: req.session.user }); // Pass user data to the profile view
// });

// Connect to MongoDB
connectToDatabase();

// Routes
app.get('/', (req, res) => {
  res.render('index'); // Render the homepage using EJS layout
});

// Explore Page
app.get('/explore', async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { destination: { $regex: searchQuery, $options: 'i' } }
      ]
    });
    res.render('explore', { blogs }); // Pass blogs to the template
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Error loading explore page');
  }
});

// Route to display the blog creation form
app.get('/blogs/create',isAuthenticated, (req, res) => {
  try {
    res.render('create'); // Ensure the 'create.ejs' file exists in the views directory
  } catch (err) {
    console.error('Error rendering create page:', err.message);
    res.status(500).send('Error rendering create page');
  }
});

// Route to handle blog creation
app.post('/blogs/create', async (req, res) => {
  try {
        if (!req.session.user) {
            return res.status(401).send('Unauthorized'); // Ensure user is logged in
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
            author: req.session.user.id, // Add author reference
        });

        await newBlog.save();

        // Add the blog to the user's "myBlogs"
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



// Route to render the edit form
app.get('/blogs/:id/edit', async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    res.render('edit', { blog }); // Render the 'edit.ejs' page with blog details
  } catch (err) {
    console.error('Error fetching blog for edit:', err.message);
    res.status(500).send('Error loading edit page');
  }
});

// Route to handle blog update
app.post('/blogs/:id/edit', async (req, res) => {
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
      { new: true } // Return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).send('Blog not found');
    }

    res.redirect(`/blogs/${blogId}`); // Redirect to the blog's detail page
  } catch (err) {
    console.error('Error updating blog:', err.message);
    res.status(500).send('Error updating blog');
  }
});

// Admin check middleware
// const isAdmin = (req, res, next) => {
//   if (req.session.user && req.session.user.role === 'admin') {
//     return next(); // Proceed to the next middleware or route handler
//   } else {
//     return res.status(403).send('You do not have permission to perform this action');
//   }
// };

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === 'admin') {
    return next(); // Proceed if the user is an admin
  } else {
    // Render the delete page with a "permission denied" message
    return res.status(403).render('delete', { 
      blog: null, 
      error: 'You do not have permission to perform this action.' 
    });
  }
};


// Route to render the delete confirmation form (ensure only admins can access it)
app.get('/blogs/:id/delete', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    res.render('delete', { blog }); // Render the 'delete.ejs' page with blog details
  } catch (err) {
    console.error('Error fetching blog for delete:', err.message);
    res.status(500).send('Error loading delete page');
  }
});

// Route to handle blog deletion (ensure only admins can delete)
app.post('/blogs/:id/delete', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const blogId = req.params.id;

    // Delete the blog by its ID
    const result = await Blog.deleteOne({ _id: blogId });

    if (result.deletedCount === 0) {
      return res.status(404).send('Blog not found');
    }

    // Redirect to the blog list or homepage after deletion
    res.redirect('/blogs');
  } catch (err) {
    console.error('Error deleting blog:', err.message);
    res.status(500).send('Error deleting blog');
  }
});

app.get('/blogs/:id/save', async (req, res) => {
  console.log(`GET request to /blogs/${req.params.id}/save`); // Log the request
  try {
    const blog = await Blog.findById(req.params.id);
    res.render('save', { blog });
  } catch (error) {
    console.error(error);
    res.status(404).send('Blog not found');
  }
});

// Route to save the blog (POST request)
app.post('/blogs/:id/save', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    // Check if the user is already in the savedBy array
    if (!blog.savedBy.includes(req.user.id)) {
      // Add the user to the savedBy array
      blog.savedBy.push(req.user.id);
      // Set the saved field to true
      blog.saved = true;

      // Save the blog
      await blog.save();
    }

    // Redirect to the saved blogs page
    res.redirect(`/profile/${req.user.id}/saved`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving the blog');
  }
});

app.get('/profile/:userId/saved', async (req, res) => {
  try {
    const savedBlogs = await Blog.find({ savedBy: req.params.userId });
    
    // Render the profile page with the saved blogs
    res.render('profile', { savedBlogs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading saved blogs');
  }
});

// Add route in server.js
// app.post('/blogs/:id/save', isAuthenticated, async (req, res) => {
//   const blogId = req.params.id;
//   const userId = req.session.user.id;

//   try {
//     // Find the blog by its ID
//     const blog = await Blog.findById(blogId);
//     if (!blog) {
//       return res.status(404).send('Blog not found');
//     }

//     // Find the user and add the blog to their savedBlogs list
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }

//     // Check if the blog is already saved by the user
//     if (user.savedBlogs.includes(blogId)) {
//       return res.status(400).send('Blog is already saved');
//     }

//     // Save the blog for the user
//     user.savedBlogs.push(blogId);
//     await user.save();

//     // Add the user to the blog's savedBy list
//     blog.savedBy.push(userId);
//     await blog.save();

//     res.redirect(`/blogs/${blogId}`);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

app.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id)
      .populate('savedBlogs')  // Populate saved blogs
      .populate('myBlogs');    // Populate created blogs

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.render('profile', { user: user }); // Pass the populated user object to the view
  } catch (err) {
    console.error('Error fetching profile data:', err.message);
    res.status(500).send('Error loading profile');
  }
});

// Admin dashboard route
app.get('/admin', adminController.dashboard); // Use the dashboard function from adminController
app.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/'); // Redirect to homepage after logout
  });
});
// Routes for authentication
app.use('/auth', authRoutes);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(methodOverride('_method')); // Enable support for PUT/DELETE in forms

// 404 Route
app.use((req, res) => {
  res.status(404).render('404'); // Render the 404 page
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${listener.address().port}`);
});