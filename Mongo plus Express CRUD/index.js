const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Profile = require("./models/profiles.js");
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Node and MongoDB connection established");
  })
  .catch((er) => {
    console.log(er);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/app");
}

//routes
app.get("/", (req, res) => {
  res.send("Respose is working");
});

app.get("/profiles/count", async (req, res) => {
  let count = await Profile.countDocuments();
  res.render("count.ejs", { count });
});

app.get("/profiles", async (req, res) => {
  let profiles = await Profile.find();
  res.render("index.ejs", { profiles });
});

app.get("/profiles/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/profiles", (req, res) => {
  let { name, email, bio, pin } = req.body;
  let userProfile = new Profile({
    name: name,
    email: email,
    bio: bio,
    pin: pin,
  });

  userProfile
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((er) => {
      console.log(er);
    });
  res.redirect("/profiles");
});

app.get("/profiles/:id/edit", async (req, res) => {
  let { id } = req.params;
  let user = await Profile.findById(id);
  res.render("edit.ejs", { user });
});

app.patch("/profiles/:id", async (req, res) => {
  let { id } = req.params;
  let { name: newName, bio: newBio, pin } = req.body;
  pin = Number(pin);
  try {
    let user = await Profile.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.pin === pin) {
      let result = await Profile.updateOne(
        { _id: id }, // Filter
        { $set: { name: newName, bio: newBio } }, // Update operation
        { runValidators: true } // Ensures validation rules are applied
      );

      if (result.modifiedCount > 0) {
        res.redirect("/profiles");
      } else {
        res.send("No changes made");
      }
    } else {
      res.status(401).send("Wrong PIN entered");
    }
  } catch (error) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.delete("/profiles/:id", async (req, res) => {
  let { id } = req.params;
  let deletedProfile = await Profile.findByIdAndDelete(id);
  console.log(deletedProfile);
  res.redirect("/profiles");
});

app.listen(6060, () => {
  console.log("The server is listening on port 6060");
});
