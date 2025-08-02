const { verifyAccessToken } = require('../utils/jwtUtils');
const { UserModel } = require('../model/UserModel');

// Middleware to authenticate user
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Access token required' 
            });
        }

        const decoded = verifyAccessToken(token);
        
        // Check if user still exists
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        // Check if account is active
        if (user.accountStatus !== 'active') {
            return res.status(401).json({ 
                success: false, 
                message: 'Account is not active' 
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Optional authentication middleware (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            const decoded = verifyAccessToken(token);
            const user = await UserModel.findById(decoded.userId);
            if (user && user.accountStatus === 'active') {
                req.user = user;
            }
        }
        next();
    } catch (error) {
        // Continue without authentication
        next();
    }
};

module.exports = {
    authenticateToken,
    optionalAuth
}; 