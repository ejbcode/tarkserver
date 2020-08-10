# Backend

    `npm init`
    npm i express mongoose
    npm -D nodemon dotenv

create a index.js in the root
create this two scripts in the package.json
`"start": "node .", "dev": "nodemon ."`

## Configuration Express

```
const express = require("express");

//Create the server
const app = express();

// config a default fallback for the port
const PORT = process.env.PORT || 4000;

//define the app page with the router, justo to know it's working
app.get("/", (req, res) => {
  res.send("Hello World");
});

// start the app
app.listen(PORT, () => {
  console.log(`Working from port ${PORT}`);
});

```
