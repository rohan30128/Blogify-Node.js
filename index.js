
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");
const cors = require("cors");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middleware/authentication");

mongoose
  .connect("mongodb+srv://himanshukotwani898:OQs42xtqgAXOh6rV@cluster0.2qwjb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDb connected Successfully"))
  .catch((err) => console.log("Error on MongoDb", err));

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie());
app.use(express.static(path.resolve("./public")));
app.use(cors())

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/",async (req, res) => {
    const allBlogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs : allBlogs
  });
});

app.use("/user", userRoute);
app.use("/blog",blogRoute);

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
