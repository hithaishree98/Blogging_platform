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

            // Normalize username and assign role
            

            // Create and save the user
            const user = new User({ name, username, email, password: hashedPassword, role });
            await user.save();

            const adminUser = await User.findOne({ username: 'admin' });
            const role = username.toLowerCase() === 'admin' ? 'admin' : 'user';
            console.log('Admin user role:', adminUser?.role); // Should log 'admin' if correctly assigned

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

            // Redirect based on role
            const redirectUrl = user.role === 'admin' ? '/admin' : '/profile';
            res.json({ success: true, message: 'Login successful!', redirect: redirectUrl });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Error during login.' });
        }
    },
};

module.exports = authController;
