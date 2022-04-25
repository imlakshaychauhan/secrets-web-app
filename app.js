require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { redirect } = require('express/lib/response');


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(session({
  secret: "My secret string",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/secrets", (req, res) => {
  if(req.isAuthenticated())
    res.render("secrets");
  else
    res.redirect("/login");
});
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.post("/register", (req, res) => {
    User.register({username: req.body.username}, req.body.password, (e, user) => {
      if(e){
        console.log(e);
        res.redirect("/register");
      }
      else{
        passport.authenticate("local")(req, res, () => {
          res.render("secrets");
        })
      }
    })
});

app.post("/login", (req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    req.login(user, (e) => {
      if(e)
        console.log(e);
      else
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
    });
});

app.listen("8000", (e) => {
  if(e)
    console.log(e);
  else
    console.log("Server started on Port 8000");
});
