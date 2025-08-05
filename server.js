const express = require("express");
const mongoose = require("mongoose"); // ✅ Only once
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // To serve form.html



mongoose.connect("mongodb+srv://admin:sahil1234@cluster0.pelg9.mongodb.net/formDB?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));


// Define schema and model
const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  address: String
});

const FormModel = mongoose.model("FormData", FormSchema);

// Route to handle form submission
app.post("/submit", async (req, res) => {
  try {
    const formData = new FormModel(req.body);
    await formData.save();
    res.send("✅ Form submitted successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Failed to save form data.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
// Home route to serve form.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});

