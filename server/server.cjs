const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const cors=require('cors')
const port = 3000;
const { client, connectDB } = require('./config/db.cjs')
const users=require('./routes/users.cjs')
app.use(cors()); 
app.get('/api/endpoint', (req, res) => { res.json({ message: 'CORS enabled' }); });
dotenv.config();
const contactRoutes = require('./routes/contactRoutes.cjs'); // Ajustez le chemin

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../src")));
app.use('/api/endpoint/users',users)
app.use('/api/endpoint/contact', contactRoutes); // Nouvelles routes pour le contact
const { notFound, errorHandler } = require("./middleware/errorMiddleware.cjs");

// Serve static files from React's build folder
app.use(express.static(path.join(__dirname, "src/build")));

// Catch-all route to send all requests to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "src/build", "index.html"));
});

// Définir la route des utilisateurs en utilisant le router importé

app.get("/passwordcrypto", (req, res, next) => {
    res.send(SHA256.AES.encrypt("mdp", "hash").toString());
});

// Start the server
app.listen(port, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${port}`);
});