# **Taste Trails**

### **Project Directory Structure**

**Project Root:**

```
taste-trails/
├── public/                # Static files (CSS, JS, Images)
│   ├── css/
│   │   ├── style.css      # Global styles
│   │   ├── responsive.css # Media queries and breakpoints
│   ├── js/
│   │   ├── app.js         # Frontend interactivity
│   ├── images/            # Static images (logos, blog images)
│       └── logo.png
├── routes/                # Backend routes
│   ├── index.js           # General routes (home, explore, etc.)
│   ├── users.js           # User-related routes
│   ├── blogs.js           # Blog-related routes
│   ├── admin.js           # Admin-specific routes
├── views/                 # Static HTML files for rendering
│   ├── partials/          # Reusable components
│   │   ├── header.html    # Header with navigation
│   │   ├── footer.html    # Footer
│   ├── index.html         # Homepage
│   ├── explore.html       # Blog exploration page
│   ├── blog.html          # Single blog post view
│   ├── create.html        # Create or edit blog
│   ├── profile.html       # User profile page
│   ├── admin.html         # Admin dashboard
│   ├── login.html         # Login page
│   ├── signup.html        # Signup page
├── models/                # Database models
│   ├── User.js
│   ├── Blog.js
│   ├── Comment.js
├── controllers/           # Controller logic for routes
│   ├── userController.js
│   ├── blogController.js
│   ├── adminController.js
├── config/                # Configuration files
│   ├── database.js        # MongoDB connection
│   ├── passport.js        # Passport.js strategies
├── server.js              # Main server file (entry point)
├── package.json           # Project dependencies
├── .env                   # Environment variables (API keys, secrets)
├── README.md              # Project documentation
```

---

### **1. Pages and Links**

#### **Pages**

1. **Homepage (`index.html`)**

   - **URL:** `/`
   - **Purpose:** Landing page with an introduction to the website.
   - **Features:**
     - Welcome banner with a brief description.
     - Featured or trending blogs section.
     - Navigation links to Explore, Login, and Signup.
   - **HTML Template:** `views/index.html`
   - **CSS File:** `public/css/style.css`

2. **Explore Page (`explore.html`)**

   - **URL:** `/explore`
   - **Purpose:** Allow users to browse and filter blog posts.
   - **Features:**
     - Search bar and filters (location, cuisine, budget).
     - Blog cards with title, image, and summary.
   - **HTML Template:** `views/explore.html`
   - **CSS File:** `public/css/style.css`

3. **Blog Details Page (`blog.html`)**

   - **URL:** `/blogs/:id`
   - **Purpose:** Display full blog content and user comments.
   - **HTML Template:** `views/blog.html`

4. **Create/Edit Blog Page (`create.html`)**

   - **URL:** `/blogs/create` or `/blogs/edit/:id`
   - **Purpose:** Form for creating or editing blog posts.
   - **HTML Template:** `views/create.html`

5. **User Profile Page (`profile.html`)**

   - **URL:** `/profile`
   - **Purpose:** Manage user profile and saved blogs.
   - **HTML Template:** `views/profile.html`

6. **Admin Dashboard (`admin.html`)**

   - **URL:** `/admin`
   - **Purpose:** Manage blogs and user accounts.
   - **HTML Template:** `views/admin.html`

7. **Login and Signup Pages (`login.html` and `signup.html`)**
   - **URL:** `/login` and `/signup`
   - **Purpose:** User authentication.
   - **HTML Templates:** `views/login.html` and `views/signup.html`

---

### **2. Backend Implementation**

#### **Server File (`server.js`)**

- Main entry point for the application.
- Set up Express, session handling, and static file serving.
- Route requests to respective route files.
- Example code:

```javascript
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/blogs", require("./routes/blogs"));
app.use("/admin", require("./routes/admin"));

// 404 Handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

### **3. Frontend Development**

#### **HTML and CSS**

- Use **HTML5** for semantic structure.
- Write responsive styles in `style.css` and `responsive.css`.
- Reuse components like headers and footers.

#### **Forms**

- Include:
  - Validation for signup/login.
  - Input for blog creation with image upload fields.

#### **Static Files**

- Place static assets (CSS, JS, images) in the `public` directory.
- Serve them using `express.static()` in `server.js`.

---

### **4. Database (MongoDB)**

#### **Models**

1. **User Model:**
   - Includes fields like `name`, `email`, `password`, and `isAdmin`.
2. **Blog Model:**
   - Includes `title`, `content`, `author`, `tags`, and `comments`.
3. **Comment Model:**
   - Includes `blogId`, `userId`, and `content`.

---

### **5. Routes and Controllers**

#### **Routes**

| **Route**    | **Controller**       | **Description**             |
| ------------ | -------------------- | --------------------------- |
| `/`          | `index.js`           | Render homepage.            |
| `/explore`   | `blogController.js`  | List all blogs.             |
| `/blogs/:id` | `blogController.js`  | Display a single blog.      |
| `/users`     | `userController.js`  | Handle user authentication. |
| `/admin`     | `adminController.js` | Admin-specific features.    |

#### **Route Example (`routes/index.js`)**

```javascript
const express = require("express");
const router = express.Router();
const path = require("path");

// Homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;
```

---

### **6. Deployment**

- Deploy the project on **Glitch**.
- Use **MongoDB Atlas** for persistent data storage.
- Test functionality with Postman for APIs and manual testing for UI.
