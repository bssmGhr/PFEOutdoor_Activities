const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017"; // MongoDB connection URL
const database1 = "salledesport";
const JWT_SECRET =
    "nFUQ9BNTd86b";

async function connectDB() {
    await mongoose.connect(`${uri}/${database1}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
module.exports = {
    JWT_SECRET,
    connectDB,
    database1,
};