const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Authentication logic (e.g., check user credentials in DB)
            res.json('Login successful! Redirecting...');
        } catch (error) {
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    },

    signup: async (req, res) => {
        try {
            const { name, username, email, password } = req.body;
            // Signup logic (e.g., save user in DB)
            res.json('Signup successful! You can now log in.');
        } catch (error) {
            res.status(400).json({ message: 'Signup failed. Try again.' });
        }
    },
};

module.exports = authController;
