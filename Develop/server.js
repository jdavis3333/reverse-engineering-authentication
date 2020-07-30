// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring the models directory contents for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
//
var app = express();

// Parse the request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status, this will save "keyboard cat" as the password in the database.
// Each application will have its own secret key to authenticate
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// Middleware required to initialize Passport
app.use(passport.initialize());
// Middleware required for persistent login sessions
app.use(passport.session());

// Requiring our routes from html-routes.js and api-routes.js
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
// This means the db sequelize is used
//.sync means it will not drop tables if they already exist and there is a mismatch, if there is a force:true in the parentheses, it will overwrite the mismatch
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
