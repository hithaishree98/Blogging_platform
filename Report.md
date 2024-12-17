# Project Report - Taste Trails

## Introduction

**Team Members:**
- Aishwarya Bhargava (Pitt_ID: [your Pitt ID])
- Hithaishree Shankar (Pitt_ID: HIS52@pitt.edu)
- Radhika Purohit (Pitt_ID: RAP276@pitt.edu)

**Project Overview:**
Taste Trails is a food blogging and exploration platform that allows users to browse, create, and manage food-related blog posts. The application features a clean, responsive design, enabling users to search for blogs based on filters like location, cuisine, and budget. Users can also sign up, log in, and create or edit their blog posts, while administrators can manage the platform's content and user accounts. The project employs modern web technologies and follows the MVC (Model-View-Controller) architecture to maintain a clean and scalable codebase.

## Objective

The primary objective of the Taste Trails project was to build a web application that allows users to explore, create, and interact with food-related content. The goals included:
- Implementing a fully functional CRUD system for blog posts, allowing users to create, read, update their blogs.
- Learning and applying RESTful API practices to manage user authentication and blog creation.
- Building a responsive, user-friendly interface that adjusts across different devices.
- Enhancing the project beyond the assignment requirements by implementing user authentication and an admin dashboard to manage and delete blogs.
- Learning how to integrate MongoDB for database storage and using Passport.js for user authentication.

## Team Member Contributions

- **Radhika Purohit:**
  - Responsible for backend development, including the setup of Express.js server and routes.
  - Implemented user authentication using Passport.js and JWT (JSON Web Token).
  - Developed the blog controller and integrated MongoDB for storing and retrieving blogs.
  - Worked on frontend features, including forms for creating and editing blogs and the blog listing page.

- **[Add team members’ names and contributions]**

## Technical Architecture

### Libraries, Frameworks, and Technologies Used:
- **Express.js**: Used to handle the backend routing and serve static files.
- **MongoDB**: A NoSQL database used for storing user information, blog posts, and comments.
- **Passport.js**: Implemented for user authentication (sign-up, log-in).
- **HTML5/CSS3**: Used to structure and style the frontend.
- **JavaScript**: For implementing interactive frontend elements and API calls.
- **Responsive CSS**: Media queries in `responsive.css` to adjust the layout for different devices.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **EJS (Embedded JavaScript)**: For templating in views.

### MVC Architecture:
- **Model**: Represents the application's data, such as `User.js`, `Blog.js`, and `Comment.js` models. These define the structure of data stored in MongoDB.
- **View**: The user-facing HTML pages such as `index.html`, `blog.html`, and `profile.html`. These files render the frontend elements.
- **Controller**: Handles the logic behind routes and actions, such as `userController.js`, `blogController.js`, and `adminController.js`. The controllers handle tasks like retrieving blog posts, user authentication, and blog creation.

## Challenges

Some of the challenges faced during development were:
- **User Authentication**: Implementing Passport.js for handling user sign-ups and logins was initially challenging due to the complexity of session management. However, with extensive research and testing, we successfully integrated the authentication system.
- **MongoDB Integration**: Integrating MongoDB and ensuring proper data validation for user inputs was tricky at times, especially when working with relationships (e.g., blog posts and comments).
- **Responsive Design**: Ensuring that the website was fully responsive across different breakpoints and devices was challenging, particularly with ensuring forms and media scaled well on smaller screens.

## Future Work

Given more time, we would add the following features:
- **User Reviews**: Allow users to rate and review blog posts, adding more interactivity to the platform.
- **Social Media Sharing**: Add social media sharing options to enable users to share blogs on platforms like Facebook and Twitter.
- **Tagging System**: Implement a more complex tagging system to categorize blogs by themes (e.g., vegan, street food, etc.).
- **Admin Features**: Enhance the admin dashboard to include more analytics and better management of the platform's users.

We would also like to explore more advanced technologies, such as using GraphQL for efficient data fetching or integrating a real-time chat system for user interactions.

## Conclusion

Throughout this project, we learned a lot about web development technologies, particularly how to design and implement a full-stack application using Express.js, MongoDB, and Passport.js for user authentication. The project helped us understand the importance of creating a responsive design and integrating back-end functionality to build a feature-rich application. The skills we acquired will definitely be valuable in future development tasks and provide a solid foundation for more advanced web projects.

## Resources

Here are the resources we used to complete this project:
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Atlas Setup Guide](https://www.mongodb.com/cloud/atlas)
- [Passport.js Authentication Guide](http://www.passportjs.org/docs/)
- [MongoDB Mongoose Documentation](https://mongoosejs.com/)
- [W3Schools Responsive Design Tutorial](https://www.w3schools.com/css/css_rwd_mediaqueries.asp)

For testing the application, you can:
1. Start the server by running `node server.js`.
2. Open the application in your browser at `http://localhost:3000`.
3. Use Postman to test the API endpoints, particularly for user login, blog creation, and CRUD operations.

