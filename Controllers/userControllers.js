const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");



//Dec: Register User
//route: POST /api/users
//acess: Public
const registerUser = asyncHandler(async (req, res) => {
    
    const {username, email, password } = req.body;
   
    if (!username || !email || !password) {
        res.status(400);    
        throw new Error("All fields are Required");
    } 

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User name already Taken")
    }

    //hassed password 
    const hassedPassword = await bcrypt.hash(password, 10);
    console.log("hassed Password:", hassedPassword);

    const user = await User.create({
        username,
        email,
        password : hassedPassword,
    });

    console.log(`User created ${user}`);
    if (user){
        res.status(201).json({_id: user.id, email:user.email})
    } else {
        res.status(400);
        throw new Error("User data is not Valid");
    }    
    res.json({ message: "Register the user" });
});


//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    console.log (user);
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password, user.password) )) {
      const accessToken = jwt.sign( 
        { 
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          }, 
        }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: "15m" } );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
  });
  


//Dec: Current info of User
//route: GET /api/users
//acess: private
const currentUser = asyncHandler(async (req, res) => {
    res.json({message:"current user infor"});
});


module.exports = {registerUser, loginUser, currentUser};
  