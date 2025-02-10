const bcrypt = require('bcrypt');
const { User } = require('../Model/user'); // Adjust import based on your setup
const jwt = require('jsonwebtoken');


// Secret key for JWT (Store this in your environment variables)
const JWT_SECRET = process.env.JWT_SECRET ;

// signup
// Replace with a strong secret

const handleSignup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the email or username already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });
        if (existingUser) {
            return res.status(409).json({
                message: "Username or email already in use",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            profile: {
                // Defaults will automatically apply
            },
            streak: {
                // Defaults will automatically apply
            },
        });

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Return a response (exclude sensitive information like hashed password)
        res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profile: user.profile,
            },
            token, // Include the token in the response
        });
    } catch (error) {
        console.error("Failed to sign up:", error);
        res.status(500).json({ message: "An internal server error occurred" });
    }
};

module.exports = { handleSignup };


// handle login
const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: "7d" } // Token expires in 1 hour
        );

        // Send response with the token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profile: user.profile, // Include additional profile data if needed
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An internal server error occurred' });
    }
};



module.exports = {
    handleSignup,
    handleLogin
}
