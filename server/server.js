require('dotenv').config();

/* Import statement for modules */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Import Nodemailer
const crypto = require('crypto'); // For OTP generation

const UserModel = require('./models/User');

const app = express();

/* Middleware */
// https://travelwheelsph.xcom
// http://localhost:x3000
// https://travelwheelsph.onrender.xcom
// http://localhost:3001
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://travelwheelsph.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

/* Connect to MongoDB */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log(err));

/* Nodemailer transporter setup */
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'cams.castro03@gmail.com', // Replace with your email
    pass: 'fobe homp ilhh uxvj' // Replace with your app-specific password
  }
});

/* Helper function to generate OTP */
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString(); // Generates a 6-digit OTP
};

/* Routes */
const userRoutes = require('./routes/userRouter');
const bookingRoutes = require('./routes/bookingRouter');
const rideRoutes = require('./routes/rideRouter');
const quotationRoutes = require('./routes/quotationRouter');
const travelRoutes = require('./routes/travelRouter');
const educationRoutes = require('./routes/educationRouter');
const packageRoutes = require('./routes/packageRouter');
const inquiryRoutes = require('./routes/inquiryRouter');
const promoRoutes = require('./routes/promoRouter');
const deactRoutes = require('./routes/deactRouter');
const feedbackRoutes = require('./routes/feedbackRouter');
const contentRoutes = require('./routes/contentRouter');
const auditRoutes = require('./routes/auditRouter');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});



app.post('/deact-acc-otp', async (req, res) => {
  const { email, userId, firstname } = req.body;

  const otp = generateOTP();

  try {
    // Update the user's OTP in the database
    await UserModel.updateOne(
      { _id: userId },
      { $set: { otp: otp } },
      { upsert: true }
    );
    

    const mailOptions = {
      from: 'cams.castro03@gmail.com',  // Replace with your email
      to: email,
      subject: 'Verify your account - OTP',
      text: `Hi ${firstname},\n\nYour One-Time Password (OTP) is ${otp}. This code is valid for 5 minutes. For your security, please dp not share this code with anyoe. Happy Travels! \n\nBest regards,\nYour Travel Tayo Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        return res.status(500).send('OTP email could not be sent');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(201).send('Please check your email for OTP.');
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send('Server error');
  }
});



app.post('/new-email-otp', async (req, res) => {
  const { newEmail, userId, firstname } = req.body;

  const otp = generateOTP();

  try {
    // Update the user's OTP in the database
    await UserModel.updateOne({ _id: userId }, { otp: otp }); 

    const mailOptions = {
      from: 'cams.castro03@gmail.com',  // Replace with your email
      to: newEmail,
      subject: 'Verify your account - OTP',
      text: `Hi ${firstname},\n\nYour OTP code is ${otp}. \n\nBest regards,\nYour Travel Tayo Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        return res.status(500).send('OTP email could not be sent');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(201).send('Please check your email for OTP.');
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send('Server error');
  }
});




// Sign-up route with OTP
app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password, type, contactNumber } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();

    const newUser = new UserModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      type,
      otp,
      isVerified: false,
      contactNumber
    });

    await newUser.save();

    const mailOptions = {
      from: 'cams.castro03@gmail.com',  // Replace with your email
      to: email,
      subject: 'Verify your account - OTP',
      text: `Hi ${firstname},\n\nYour OTP code is ${otp}. \n\nBest regards,\nYour Travel Tayo Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        return res.status(500).send('User registered, but OTP email could not be sent');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(201).send('User registered successfully! Please check your email for OTP.');
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send('Server error');
  }
});


// OTP verification route
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;


  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    console.log(email)
    console.log(otp)

    // Check if OTP is valid and not expired
    if (user.otp === otp) {
      user.isVerified = true; // Set the user as verified
      user.otp = undefined; // Remove the OTP after verification
      user.otpExpires = undefined;
      await user.save();
      res.status(200).send('OTP verified successfully');
    } else {
      res.status(400).send('Invalid or expired OTP');
    }
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).send('Server error');
  }
});


// OTP verification route
app.post('/verify-request-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found');
    }

    // Check if OTP is valid and not expired
    if (user.otp === otp) {
      user.isVerified = true; // Set the user as verified
      user.otp = undefined; // Remove the OTP after verification
      user.otpExpires = undefined;
      await user.save();
      res.status(200).send('OTP verified successfully');
    } else {
      res.status(400).send('Invalid or expired OTP');
    }
  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).send('Server error');
  }
});


// OTP verification route
app.post('/request-otp', async (req, res) => {
  const { email } = req.body;

  try {

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const otp = generateOTP();

    user.otp = otp;
    await user.save();

    const mailOptions = {
      from: 'cams.castro03@gmail.com',  // Replace with your email
      to: email,
      subject: 'Verify your account - OTP',
      text: `Our system detected that this account wants to change the password\n\nYour OTP code is ${otp}. \n\nBest regards,\nYour Travel Tayo Team`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email Error:", error);
        return res.status(500).send('OTP email could not be sent');
      } else {
        console.log(`Email sent: ${info.response}`);
        res.status(201).send('Please check your email for OTP.');
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send('Server error');
  }
});


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    if (user.isVerified == false) {
      user.otp = undefined;
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    res.status(200).send('Login successful');
  } catch (error) {
    res.status(500).send('Server error');
  }
});







app.post('/change-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Email and new password are required.' });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});


app.put('/update-email', async (req, res) => {
  const { oldEmail, newEmail } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: newEmail });
    if (existingUser) {
      return res.status(400).send('Email already in use. Please use a different email.');
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { email: oldEmail },
      { email: newEmail },
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).send('User not found or failed to update email.');
    }

    res.status(200).send('Email updated successfully.');
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).send('Internal server error.');
  }
});


/* API Routes */
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/travels', travelRoutes); 
app.use('/api/educs', educationRoutes); 
app.use('/api/packs', packageRoutes); 
app.use('/api/inquiries', inquiryRoutes); 
app.use('/api/promos', promoRoutes); 
app.use('/api/deacts', deactRoutes); 
app.use('/api/feedbacks', feedbackRoutes); 
app.use('/api/contents', contentRoutes);
app.use('/api/audits', auditRoutes);

/* Start the server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
