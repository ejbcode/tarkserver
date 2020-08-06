const express = require("express");

//Create the server
const app = express();

// config a default fallback for the port
const PORT = process.env.PORT || 4000;

//DEine the app page with the router, justo to know it's working
app.get("/", (req, res) => {
  res.send("Hello World");
});

// start the app
app.listen(PORT, () => {
  console.log(`Working from port ${PORT}`);
});
