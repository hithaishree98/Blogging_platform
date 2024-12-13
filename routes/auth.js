// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// // Signup
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered." });
//     }

//     const user = new User({ name, email, password, role });
//     await user.save();
//     res.status(201).redirect("/login");
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).send("User not found.");

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(401).send("Invalid credentials.");

//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     res.cookie("token", token, { httpOnly: true });

//     if (user.role === "admin") {
//       res.redirect("/admin/dashboard");
//     } else {
//       res.redirect("/user/dashboard");
//     }
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });

// router.get("/logout", (req, res) => {
//   res.clearCookie("token");
//   res.redirect("/login");
// });

// module.exports = router;
