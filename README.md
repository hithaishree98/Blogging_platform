# **Taste Trails**

**Taste Trails** is a food blogging and travel exploration platform that allows users to **browse, create, save, like, comment, and share blogs** related to food and travel. It features a seamless user experience with interactive functionalities and a responsive design. Administrators have additional capabilities to manage content and view platform statistics.

---

## **Table of Contents**

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Technologies Used](#technologies-used)  
4. [Testing Instructions](#testing-instructions)  
5. [Challenges](#challenges)  
6. [Future Enhancements](#future-enhancements)  
7. [Resources](#resources)

---

## **Project Overview**

Taste Trails connects food and travel enthusiasts by enabling users to:  
- **Explore** blogs based on destination and cuisine.  
- **Create** personalized blogs with images, comments, and ratings.  
- **Interact** through likes, comments, and saving favorite blogs.  
- **Share** blogs via social media platforms.  
- **Manage content** as an admin, with analytics and moderation capabilities.  

The platform follows the **MVC (Model-View-Controller)** architecture, ensuring scalability and maintainability.

---

## **Features**

### **User Features**
- **Create Blogs**: Add blogs with images, content, and destination details.  
- **Like and Comment**: Interact with blogs dynamically.  
- **Save Blogs**: Save favorite blogs for later viewing.  
- **Edit Profile**: Update profile details, including profile images.  
- **Share Blogs**: Share blog content to social media platforms using preformatted links.  

### **Admin Features**
- **Dashboard**: View total users, blogs, and detailed analytics.  
- **Blog Moderation**: Edit or delete blogs as required.  
- **Data Visualizations**: Analyze blog ratings, top destinations, and trends.

---

## **Technologies Used**

### **Frontend**
- **EJS (Embedded JavaScript)** for templating  
- **HTML5/CSS3** for structure and styling  
- **JavaScript** for interactivity  

### **Backend**
- **Node.js/Express.js** for server and routing  
- **MongoDB** with **Mongoose** for database management  
- **Express-session** and **cookie-parser** for authentication  

### **Additional Libraries**
- **Multer**: For image uploads  
- **Chart.js**: For admin dashboard visualizations  
- **Method-Override**: To enable PUT and DELETE methods in forms  

---

## **Testing Instructions**

### **User Testing**
1. **Sign Up / Login**: Create an account or log in as an existing user.  
2. **Explore Blogs**: Browse blogs under the **Explore** section.  
3. **Create Blogs**: Use the "Create Blog" option to add a new blog.  
4. **Interact**:
   - **Like**: Click the "Like" button to add likes.  
   - **Comment**: Add comments dynamically under blogs.  
   - **Save**: Save blogs to view later.  
5. **Edit Profile**: Update your profile, including username and profile picture.  

### **Admin Testing**
1. **Admin Login**:
   - **Email**: admin123@gmail.com  
   - **Password**: admin123  
2. **Dashboard**: Access the admin dashboard to view analytics and manage blogs.  
3. **Manage Blogs**: Edit or delete blogs.  

---

## **Challenges**

During the project, we faced the following challenges:

- **MongoDB Validation**:  
   MongoDB Atlas' free tier restricted us from modifying validation rules via UI. We addressed this by defining strict validation rules in the Mongoose Schema.  
- **Dynamic Features**:  
   Managing real-time likes, comments, and saved blogs required careful handling of database updates and frontend rendering.  
- **Social Media Integration**:  
   Creating dynamic sharing links with query parameters for platforms like Facebook and Twitter.  
- **User Authentication**:  
   Implementing session-based authentication and restricting access to specific routes was initially tricky but resolved with middleware and secure session management.

---

## **Future Enhancements**

If given more time, we would like to enhance Taste Trails by adding the following features:

- **Real-Time Updates**:  
   Implement WebSocket-based real-time updates for likes and comments.  
- **Advanced Search**:  
   Allow users to search blogs based on tags, ratings, and popularity.  
- **Image Management**:  
   Integrate services like Cloudinary for secure blog image uploads.  
- **OAuth Login**:  
   Enable third-party login via Google or Facebook.  
- **Notifications**:  
   Add notifications for new comments, likes, or saved blogs.

---

## **Resources**

- [Node.js Documentation](https://nodejs.org/)  
- [Express.js Guide](https://expressjs.com/)  
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- [Mongoose ODM](https://mongoosejs.com/)  
- [Chart.js Documentation](https://www.chartjs.org/)  
- [MDN Web Docs](https://developer.mozilla.org/)  
- [W3Schools Responsive Design](https://www.w3schools.com/)  

---

## **Live Demo**

For testing the live version of the project, visit:  
**[Taste Trails Live App](https://taste-trails.glitch.me/)**  

---

**Thank you for exploring Taste Trails!**  
**Happy Blogging and Traveling! 🌍🍽️**  
