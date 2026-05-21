let ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        throw new ApiError(401, "Access token missing");
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    req.user = user;

    next();
});

module.exports = {
    isAuthenticated,
};


// cookie se accessToken lo
// JWT verify karo
// user DB se find karo
// req.user me user attach karo
// next controller ko bhejo