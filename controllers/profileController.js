const User = require('../models/User');
const getUserProfile = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }
        const user = await User.findById(req.session.user.id).populate('savedBlogs').select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.render('profile', {
            user: user
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching profile data' });
    }
};
const updateUserProfile = async (req, res) => {
    const { name, email, username } = req.body;

    try {
        if (!req.session.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.session.user.id,
            { name, email, username },
            { new: true } 
        );

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating profile' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile
};
