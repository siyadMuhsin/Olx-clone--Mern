import User from "../models/User-model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'


const signUp = async (req, res) => {
  console.log("signUp controller");
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
  
    
    return res.status(201).json({
      success: true,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
      message:"SignUp successFully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const login = async (req, res) => {
  console.log("login controller,", req.body);
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
       
        .json({ success: false, message: "email not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      
      
        return res.json({success:false, message: 'Invalid credentials' });
      }
      const token = jwt.sign({id:user._id},'token',{expiresIn:'1h'})
      res.status(200).json({
        success:true,
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },token})

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });

  }
};
export { signUp,login };
