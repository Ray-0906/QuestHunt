const mongoose = require('mongoose');

async function connectDb(url) {
    try {
        await mongoose.connect(url);
        console.log("Database connected...");
    } catch (error) {
        console.error("Failed to connect to Database:", error);
        throw error; // Re-throwing the error ensures calling code can handle it
    }
}

module.exports = { connectDb };
