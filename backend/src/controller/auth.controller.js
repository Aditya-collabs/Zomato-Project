const userModel = require("../models/user.model")
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Controller function start kiya for registering user 
async function registerUser(req, res) {

    // req.body se fullName, email aur password nikaal rahe hain
    const { fullName, email, password } = req.body;

    //check kiya user exist krta hai ya nahi
    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({ // .json() client ko structured JSON data bhejne ke liye use hota hai.
            message: "User Already Exists"
        })
    }
    // password hash kiya
    const hashedPassword = await bcrypt.hash(password, 10);

    //user ko database me save kiya
    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    //JWT token banaya (AUTH STEP)
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    //Token ko cookie me store karwaya aur cookie ko secure kiya
    res.cookie("token", token, {
        httpOnly: true, // ye cookie ko secure banatey hai
        secure: true
    }) // iska mtlb hai, server JWT ko browser me cookie ke form me save karwa raha hai taaki user bina dobara login kiye authenticated rahe.


    //Final response bheja 
    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

// login user api
async function loginUser(req, res) {

    //Client se aayi request body se email aur password nikaal rahe hain
    const { email, password } = req.body

    // Database me check kar rahe hain ki is email ka user exist karta hai ya nahi
    const user = await userModel.findOne({
        email
    })

    // Agar user nahi mila, to invalid credentials ka error bhej rahe hain
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    // Enter kiya hua password aur database me stored hashed password compare kar rahe hain
    const isPasswordValid = await bcrypt.compare(password, user.password)

    // Agar password match nahi hua, to error response bhej rahe hain
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    // User ki unique ID ke basis par JWT token generate kar rahe hain
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    // Generated JWT token ko browser me cookie ke form me store kar rahe hain
    res.cookie("token", token), {
        httpOnly: true, //JavaScript se cookie access na ho (security)
        secure: false //localhost ke liye false, production me true hota hai
    }

    //Login successful hone par client ko success response bhej rahe hain
    res.status(200).json({
        message: "Login Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}


// Logout User api
async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ //.json() client ko structured JSON data bhejne ke liye use hota hai
        message: "User logegd out Succesfully"
    })
}
// return authenticated user info
async function getUser(req, res) {
    // auth middleware will have attached req.user
    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    res.status(200).json({
        user: {
            _id: req.user._id,
            email: req.user.email,
            fullName: req.user.fullName
        }
    });
}

//Register Foodpartner api
async function registerFoodPartner(req, res) {
    const { name, email, phone, address, password, contactName } = req.body

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if (isAccountAlreadyExists) {
        return res.status(400).json({
            message: "Food Partner Acc Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        contactName
    })

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    //final response
    res.status(201).json({
        message: "Food partner registerd Succesfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name,
            phone: foodPartner.phone,
            address: foodPartner.address,
            contactName: foodPartner.contactName
        }
    })

}

//login foodPartner
async function LoginFoodPartner(req, res) {
    const { email, password } = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if (!foodPartner) {
        console.log("Food partner not found");
        return res.status(400).json({
            message: "User not found with this email"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "Food Partner Logged in Succesfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

// Logout Food Partner
function logoutFoodpartner(req, res) {
    res.clearCookie("token"); // iska mtlb browser se saved token cookie delete kar dena, taaki user logout ho jaye.
    res.status(200).json({
        message: "Food Partner Logged Out Succesfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    registerFoodPartner,
    LoginFoodPartner,
    logoutFoodpartner
}