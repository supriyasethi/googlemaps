const express = require("express");
const app = express();
var router = express.Router();
var http = require("http"),
  fs = require("fs");
//set the view engine to ejs
app.set("view engine", "ejs");
//set the directory of views
app.set("views", "./views");
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.render("index");
});

//specify the path of static directory
router.get("./", function (req, res, next) {
  res.render("index", { title: "Express" });
});
//Capture All 404 errors
app.use(function (req, res, next) {
  res.status(404).send("Unable to find the requested resource!");
});
module.exports = router;
var server = app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
