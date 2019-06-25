const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./server/routes/api/users");

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// DB Config
const db = require("./server/config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./server/config/passport")(passport);
// Routes
app.use("./server/routes/api/users", users);

const port = process.env.PORT || 5004;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
