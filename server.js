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
dotenv.config();

const app = express();

// Set the view engine to EJS and configure views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" folder

app.use(session({
  secret: 'user_id',  // You should replace this with a more secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Set to true if you're using HTTPS
}));

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
app.get('/blogs/create', (req, res) => {
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
    const { title, content, destination, imageUrl } = req.body;

    // Validate required fields
    if (!title || !content || !destination) {
      return res.status(400).send('Title, content, and destination are required');
    }

    const newBlog = new Blog({
      title,
      content,
      destination,
      imageUrl,
    });

    await newBlog.save(); // Save the new blog to the database
    res.redirect('/explore'); // Redirect to the explore page after successful creation
  } catch (err) {
    console.error('Error creating blog:', err.message);
    res.status(500).send('Error creating the blog');
  }
});

// Route to display a specific blog based on ID
app.get('/blogs/:id', async (req, res) => {
  try {
    const blogId = req.params.id; // Extract blog ID from the URL
    const blog = await Blog.findById(blogId); // Fetch blog details from the database

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    res.render('blog', { blog }); // Render the 'blog.ejs' page with the blog data
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/auth/login'); // Redirect to login if not logged in
  }
  res.render('profile', { user: req.session.user }); // Render profile page and pass user data
});

// Admin dashboard route
app.get('/admin', adminController.dashboard); // Use the dashboard function from adminController

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
