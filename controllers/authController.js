const authController = {
    login: (req, res) => {
        const { email, password } = req.body;
        // Handle login logic here
        res.send(`Login successful for email: ${email}`);
    },

    signup: (req, res) => {
        const { name, username, email, password } = req.body;
        // Handle signup logic here
        res.send(`Signup successful for username: ${username}`);
    }
};

module.exports = authController;