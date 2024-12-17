# **Project Report - Taste Trails**

## **Introduction**

**Team Members:**  
- **Aishwarya Bhargava** (Pitt_ID: AIB79@pitt.edu)  
- **Hithaishree Shankar** (Pitt_ID: HIS52@pitt.edu)  
- **Radhika Purohit** (Pitt_ID: RAP276@pitt.edu)  

### **Project Overview**  
Taste Trails is a dynamic food blogging and travel exploration platform that enables users to browse, create, save, like, comment, and share blogs related to food and travel. It is designed to provide a seamless user experience through an interactive interface and well-structured functionalities. Users can explore blogs based on destinations and cuisines, interact with blog posts, and manage their profiles. Administrators can moderate blogs, manage users, and analyze platform statistics through an admin dashboard.

The application is built using modern **web technologies** and follows the **MVC (Model-View-Controller)** architecture, ensuring scalability and maintainability.

---

## **Objective**

The primary objectives of this project were:  
- Build a **responsive and interactive blogging platform** for food and travel enthusiasts.  
- Implement a full **CRUD (Create, Read, Update, Delete)** system for blogs.  
- Enable **user authentication** for secure access and personalized experiences.  
- Add interactive features like **comments, likes, saved blogs**, and **social media sharing**.  
- Provide an **admin dashboard** to manage blogs and visualize user activity through analytics.  
- Learn and apply RESTful API principles for structured data flow.  
- Ensure responsive design and consistent UI across devices.  

### **Additional Features Implemented**
1. **Dynamic Comment Section**: Users can add and view comments dynamically under blog posts.  
2. **Like and Save Blogs**: Users can like blogs to increase engagement and save them for later viewing.  
3. **Social Media Sharing**: Share blog posts on platforms like Twitter, Facebook, and Email.  
4. **Admin Dashboard**: Provides admin users with statistics on the total number of blogs, users, and interactive visualizations for insights.  

---

## **Team Member Contributions**

- **Aishwarya Bhargava**  
   - Contribution1
   - Contribution2
   - Contribution3
   
- **Hithaishree Shankar**  
   - Contribution1
   - Contribution2
   - Contribution3
   
- **Radhika Purohit**  
   - Contribution1
   - Contribution2
   - Contribution3
   
---

## **Technical Architecture**

### **Technologies Used**
- **Backend**: Node.js, Express.js  
- **Frontend**: EJS (Embedded JavaScript), HTML5, CSS3, JavaScript  
- **Database**: MongoDB with Mongoose ODM  
- **Authentication**: Express-session, cookie-parser  
- **Additional Libraries**:  
   - `mongoose` for database schema and querying.  
   - `method-override` for supporting PUT and DELETE methods in forms.  
   - `express-session` for secure session management.  

### **MVC Architecture**  
The project adheres to the MVC design pattern:  
1. **Model**:  
   - **Blog.js**: Defines the blog schema with fields for title, content, likes, comments, and saved data.  
   - **User.js**: Defines user schema with fields for username, email, password, profile photo, and saved blogs.  
2. **View**:  
   - **EJS Templates**:  
     - `index.ejs`: Home page  
     - `explore.ejs`: Blog exploration page with filters  
     - `blog.ejs`: Individual blog details page (includes like, comment, and share buttons)  
     - `profile.ejs`: User profile page displaying saved and created blogs  
     - `edit-profile.ejs`: Profile editing form  
3. **Controller**:  
   - Routes handle tasks like creating blogs, liking, commenting, saving blogs, and user authentication.  
   - Example: `/blogs/:id/comment` to add comments dynamically.  

---

## **Challenges**

During the project, we faced the following challenges:  
1. **MongoDB Validation**:  
   - MongoDB Atlas' free tier restricted us from modifying validation rules via UI. We addressed this by defining strict validation rules in the **Mongoose Schema**.  

2. **Dynamic Comments and Likes**:  
   - Implementing interactive features required careful management of database updates and frontend rendering.  

3. **Social Media Integration**:  
   - Creating dynamic sharing links with query parameters for platforms like Facebook and Twitter required additional formatting logic.  

4. **User Authentication**:  
   - Implementing session-based authentication and restricting access to specific routes was initially tricky but resolved with **middleware** and secure session management.  

---

## **Future Work**

If given more time, we would like to enhance Taste Trails by adding the following features:  
1. **Real-Time Updates**:  
   - Implement real-time likes and comments using WebSockets or a similar technology.  

2. **Advanced Search and Filters**:  
   - Add dynamic filters to sort blogs by tags, ratings, and popularity.  

3. **Image Uploads for Blogs**:  
   - Integrate **Cloudinary** or **AWS S3** for blog image uploads.  

4. **User Engagement Analytics**:  
   - Provide blog owners with insights into views, likes, and shares.  

5. **OAuth Authentication**:  
   - Allow users to log in using third-party services like Google, Facebook, or GitHub.  

---

## **Conclusion**

The development of Taste Trails allowed us to gain hands-on experience in **full-stack web development**. Through the project, we learned to:  
- Build and manage RESTful APIs using Node.js and Express.js.  
- Work with MongoDB to store and retrieve data effectively.  
- Implement **user authentication** and role-based access (admin and regular users).  
- Create a dynamic and responsive frontend with **EJS, HTML, and CSS**.  
- Add engaging features like likes, comments, saves, and sharing to increase user interactivity.  

This project has equipped us with the necessary skills to develop scalable web applications and will serve as a strong foundation for future advanced projects.

---

## **Resources**

- [Node.js Documentation](https://nodejs.org/)  
- [Express.js Guide](https://expressjs.com/)  
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- [Mongoose ODM Documentation](https://mongoosejs.com/)  
- [MDN Web Docs (HTML, CSS, JavaScript)](https://developer.mozilla.org/)  
- [W3Schools Responsive Design](https://www.w3schools.com/css/css_rwd_mediaqueries.asp)  
- [Stack Overflow](https://stackoverflow.com/)  

---

## **Testing Instructions**

1. **Run the Application**:  
   - Start the server using: `node server.js`.  
   - Open your browser and navigate to `http://localhost:3000`.  

2. **User Testing**:  
   - **Sign Up/Login**: Create a user account and log in.  
   - **Explore Blogs**: Visit the Explore page to browse existing blogs.  
   - **Create Blog**: Use `/blogs/create` to create a new blog.  
   - **Interact with Blogs**:  
     - **Like**: Click the "Like" button to add likes.  
     - **Comment**: Add comments dynamically under blogs.  
     - **Save**: Save blogs to view later under your profile.  
     - **Share**: Use sharing buttons to post blogs to social media.  
   - **Edit Profile**: Access `/profile/edit` to update your details and upload a profile picture.  

3. **Admin Testing**:  
   - Log in as Admin (**Email**: `admin123@gmail.com`, **Password**: `admin123`).  
   - Access the admin dashboard to view blog statistics, manage blogs, and analyze user activity.  