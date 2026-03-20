const Gym = require("../Modals/gym");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  try {
    const { userName, password, gymName, profilePic, email } = req.body;
    const isExist = await Gym.findOne({ userName });

    if (isExist) {
      return res.status(400).json({
        error: "Username already exists,Please try with other username",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newGym = new Gym({
        userName,
        password: hashedPassword,
        gymName,
        profilePic,
        email,
      });
      await newGym.save();
      res.status(201).json({
        message: "User registered successfully",
        success: "yes",
        data: newGym,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};


const cookieOptions = {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: "Lax",
  };

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const gym = await Gym.findOne({ userName });

    if (gym && (await bcrypt.compare(password, gym.password))) {
      
        const token = jwt.sign({ gym_id : gym._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
        });

        res.cookie("cookie_token", token, cookieOptions);
      
        res.status(200).json({
        message: "Login successful",
        success: "true",
        data: gym,
        token
      });
    } else {
      res.status(400).json({
        error: "Invalid Credentials",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};



const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2"
  },
  connectionTimeout: 10000, // 10 seconds mein timeout kar dega (loader ruk jayega)
  greetingTimeout: 5000,
});

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const gym = await Gym.findOne({ email });

    if (!gym) {
      return res.status(400).json({ error: "Email not found" });
    }

    // OTP Generation
    const buffer = crypto.randomBytes(4);
    const token = (buffer.readUInt32BE(0) % 900000) + 100000; 
    
    gym.resetPasswordToken = token;
    gym.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await gym.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL, // 👈 process.env use karo hardcode ki jagah
      to: email,
      subject: "Password Reset OTP | Elite Gym",
      text: `Your OTP for password reset is: ${token}. This is valid for 1 hour.`,
    };

    // 🔥 Modern Async/Await way (No Callback)
    // Isse loader ghumna band ho jayega kyunki response turant jayega
    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({
        message: "OTP sent to email successfully!",
      });
    } catch (mailErr) {
      console.error("NODEMAILER ERROR:", mailErr);
      return res.status(500).json({ 
        error: "Email Service Error", 
        details: mailErr.message 
      });
    }

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


exports.checkOtp = async(req,res)=>{
    try{
      const {email,otp} = req.body;
      const gym = await Gym.findOne({
        email,
        resetPasswordToken: otp,
        resetPasswordExpires: { $gt: Date.now() },
    }); 

     if(!gym){
        return res.status(400).json({
            error: "Invalid or expired OTP",
        })
     }
        res.status(200).json({message:"OTP is Successfully verified"})

    }catch(err){
       res.status(500).json({
        message: "Server Error",
       }) 
    }
}


exports.resetPassword = async(req,res)=>{
    try{
        const {email,newPassword} = req.body;
        const gym = await Gym.findOne({email});
        if(!gym){
            return res.status(400).json({
                error: "Some technical issue,Please try again later",
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        gym.password = hashedPassword;
        gym.resetPasswordToken = undefined;
        gym.resetPasswordExpires = undefined;
        
        await gym.save();
        
        res.status(200).json({message: "Password reset successfully"})

    }catch(err){
        res.status(500).json({message: "Server Error",
        })  
    }
}    


exports.logout = async(req,res)=>{
    try{
        res.clearCookie("cookie_token", cookieOptions);
        res.status(200).json({message: "Logout successful"})
    }
    catch(err){
        res.status(500).json({message: "Server Error",
        })  
    }
}

