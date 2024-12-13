const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = []; // Replace with a database in production

exports.signup = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the user (replace with a DB in production)
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully.' });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid username or password.' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful.', token });
};
