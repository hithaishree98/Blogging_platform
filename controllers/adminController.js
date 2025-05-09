const Blog = require("../models/Blog");
const User = require("../models/User");

exports.dashboard = async (req, res) => {
  try {
    if (!req.session || !req.session.isAdmin) {
      return res.redirect("/auth/login");
    }

    const blogCount = await Blog.countDocuments();
    const userCount = await User.countDocuments();

    const averageRating = await Blog.aggregate([
      { $group: { _id: null, averageRating: { $avg: "$rating" } } }
    ]);
    const avgRating = averageRating[0] ? averageRating[0].averageRating : 0;

    const topDestinations = await Blog.aggregate([
      { $group: { _id: "$destination", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 2 }
    ]);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); 
    const blogTrend = await Blog.aggregate([
      {
        $match: { createdAt: { $gte: startDate } } 
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } } 
    ]);

    const trendData = {
      dates: blogTrend.map(item => item._id),
      counts: blogTrend.map(item => item.count)
    };

    res.render('admin', {
      blogCount,
      userCount,
      avgRating,
      topDestinations,
      trendData
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).send("Server Error");
  }
};

exports.viewBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name");
    res.render("adminBlogs", { blogs });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};


exports.editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render("editBlog", { blog }); 
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

