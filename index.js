const express = require("express");
const connectDB = require("./config/db");

//Create the server
const app = express();

//conect to connectDB
connectDB();

//8 enable express.json
app.use(express.json({ extend: true }));

// config a default fallback for the port
const PORT = process.env.PORT || 4000;

//import the routes
app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/project", require("./routes/project"));
app.use("/api/task", require("./routes/task"));

//DEine the app page with the router, justo to know it's working
app.get("/", (req, res) => {
  res.send("Hello World");
});

// start the app
app.listen(PORT, () => {
  console.log(`Working from port ${PORT}`);
});
