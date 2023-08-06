const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Dhruv";

const router = express.Router();

// ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', "Invalid Name").isLength({ min: 3 }),
    body('email', "Please neter a valid email").isEmail(),
    body('password', "Password must be atleast 5 characters long").isLength({ min: 5 })
], async (req, res) => {
    let success = false;

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success : false, errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success : false, error: "Sorry a user with this email already existed" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id : user.id
            } 
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success : true, authtoken });

    } catch (error) {

        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// ROUTE 2: Authenticate a user using : POST "/api/auth/login". login required
router.post('/login', [
    body('email', "Please enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {

    // Below variable is used to show on concole whether the api is hitted successfully(OR to know the status)
    let success ;

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success : false, errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check whether the user with this email exists already
    try {

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({success : false,Error: "Please try to login with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success : false, Error: "Please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success : true,  authtoken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
})

// ROUTE 3: Get loggedin User details using: POST "/api/auth/getuser". No login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send({ user })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error occured");
    }
});

module.exports = router