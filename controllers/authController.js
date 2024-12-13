const User = require('../models/user');

// Handle Signup
exports.signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  
  try {
    const user = new User({ username, email, password, role });
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

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    // Redirect based on role
    if (user.role === 'admin') return res.redirect('/admin/dashboard');
    res.redirect('/user/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during login');
  }
};
