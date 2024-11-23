const prisma = require("../db/prisma.js");
const bcryptjs = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const { sendEmail } = require("../utils/sendEmail.js");
const jwt = require("jsonwebtoken");

// signup
const signup = async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    // missing fields case 1
    if (!fullName || !email || !password || !confirmPassword) {
      res.status(400); 
      throw new Error("Please fill in all fields");
    }

    // passwords match case 2
    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("Passwords don't match");
    }

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    // user exists case 3
    if (user) {
      res.status(400);
      throw new Error("Email already exists");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      generateToken(newUser.id, res);

      res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
};

// login
const login = async (req, res, next) => {
  try {
    console.log('login hit')
    const { email, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(400);
      throw new Error("Passwords didn't match");
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    next(error);
  }
};

// logout
const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// me (refresh)
const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id; 
  
  try {
    // Find the user by their ID
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.password) {
      res.status(404);
      throw new Error("User not found");
    }

    // Verify the old password
    const isOldPasswordCorrect = await bcryptjs.compare(currentPassword, user.password);
    if (!isOldPasswordCorrect) {
      res.status(400);
      throw new Error("Old password is incorrect");
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

    // Update the password in the database
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};

// generate reset password link
const resetRequest = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user){
      res.status(404);
      throw new Error('User not found');
    }

    // Generate a reset token with user id and email, expires in 15 minutes
    const resetToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const resetHtml = `
      <p>This request has been made to reset credentials associated with this account <strong>${email}</strong></p>
      <p>Please click the following link to reset your password:</p>
      <a href="${process.env.CLIENT_URL}/reset-password?token=${resetToken}">Reset Password</a>
    `;
    // Send reset email
    await sendEmail(email,  "Forget Password", html=resetHtml, next);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    next('An error occurred');
  }
};

// reset Password
const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log(password,' pass res')

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Update the user's password
    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: 'Password has been reset successfully' });
  }catch (error) {
    console.error('Error in resetPassword:', error);

    // Custom error handling for TokenExpiredError
    if (error.name === 'TokenExpiredError') {
      res.status(400);
      next(new Error('Token has expired. Please request a new password reset.'))
    }
    
    // Custom error handling for invalid token
    if (error.name === 'JsonWebTokenError') {
      res.status(400);
      next(new Error('Invalid token. Please request a new password reset.'))
    }

    // Generic server error
    next('An error occurred while resetting the password.');
  }
};

// new invites
const inviteNewUser = async (req, res, next) => {
  console.log('invite hit')
  const { email } = req.body;
  // Sender email
  const from_email=  req.user.email;

  try {
    if (!email) {
      res.status(400); // You can set the status here
      throw new Error("Please provide a valid Email");
    }
    // Generate a random password
    const password = Math.random().toString(36).slice(-8);

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        fullName:"",
        email,
        password: hashedPassword,
      },
    });

    // Generate an invitation token (valid for 15 minutes)
    const invitationToken = jwt.sign(
      { email: newUser.email, id: newUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    // Send invitation email
    const invitationEmailHtml = `
      <p>You have been invited by ${from_email} to join Easy Manage.</p>
      <p><strong>Your Credentials:</strong></p>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <p>Please click the following link to set a new password or log in:</p>
      <a href="${process.env.CLIENT_URL}/reset-password?token=${invitationToken}">Reset Password</a>
    `;

    await sendEmail(
      email, // Recipient email
      "Invitation to Join Our Platform", // Subject
      invitationEmailHtml, // Email body (HTML)
      next
    );

    res.status(201).json({ message: "User invited successfully" });
  } catch (error) {
    console.error("Error inviting user:", error);
    next("Failed to invite user");
  }
};

module.exports = {
  signup,
  login,
  logout,
  getMe,

  changePassword,
  resetRequest,
  resetPassword,
  inviteNewUser,
};
