const bcrypt = require('bcrypt');
const User = require('../models/user');

// Handle Signup
exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Step 1: Ensure the username and email are not empty
  if (!username || !email) {
    return res.status(400).send('Username and email are required');
  }

  try {
    // Step 2: Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send('Username or email already exists');
    }

    // Step 3: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create a new user
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();

    res.redirect('/auth/login'); // Redirect to login after successful signup
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during signup');
  }
};

// Handle Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    // Redirect based on role
    if (user.role === 'admin') return res.redirect('/admin/dashboard');
    res.redirect('/user/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during login');
  }
};
