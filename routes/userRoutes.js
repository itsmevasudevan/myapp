const express = require("express");
const router = express.Router();

const {registerUser, 
    loginUser, 
    currentUser} = require("../Controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/currentUser", validateToken, currentUser);

module.exports = router;