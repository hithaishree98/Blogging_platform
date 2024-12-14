const bcrypt = require('bcrypt');
const User = require('../models/User');

const authController = {
    // Signup logic
    signup: async (req, res) => {
        const { name, username, email, password } = req.body;

        try {
            // Check if the username or email already exists
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.json({ success: false, message: 'Username or email already exists.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Assign role based on username (case-insensitive)
            const role = username.toLowerCase() === 'admin' ? 'admin' : 'user';

            // Create and save the user
            const user = new User({ name, username, email, password: hashedPassword, role });
            await user.save();

            console.log(`User '${username}' created with role: ${role}`);
            res.json({ success: true, message: 'Signup successful! Please log in.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error during signup.' });
        }
    },

    // Login logic
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Check if the user exists
            const user = await User.findOne({ email });
            if (!user) return res.json({ success: false, message: 'Invalid email or password.' });

            // Compare the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.json({ success: false, message: 'Invalid email or password.' });

            req.session.user = {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role
            };
          
            // Send role-based redirect information
            const redirectUrl = user.role === 'admin' ? '/admin' : '/profile';
            res.json({ success: true, message: 'Login successful!', redirect: redirectUrl, role: user.role });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error during login.' });
        }
    },
  
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.json({ success: false, message: 'Error logging out' });
            }
            res.redirect('/');
        });
    },
  
    getProfile: async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ success: false, message: 'Not authenticated' });
            }

            // Send the user data (exclude sensitive information like password)
            res.json({
                success: true,
                username: req.session.user.username,
                name: req.session.user.name,
                email: req.session.user.email,
                savedBlogs: [] // Add logic to retrieve saved blogs if needed
            });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error fetching profile data' });
        }
    }
};

module.exports = authController;
