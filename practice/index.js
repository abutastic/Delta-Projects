const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const app = express();
const port = 2800;

app.use(methodOverride("_method"));
app.set("view engin", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});

// profiles database
let profiles = [
  {
    id: uuidv4(),
    username: "Derroit",
    bio: "Coder and Chef",
    img: "https://images.unsplash.com/photo-1551583899-d3f6258ec7c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvZGVyfGVufDB8fDB8fHww",
  },
  {
    id: uuidv4(),
    username: "Kunal",
    bio: "I love to play football",
    img: "https://plus.unsplash.com/premium_photo-1661881922562-e819632c451a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vdGJhbGxlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: uuidv4(),
    username: "RacingHyena",
    bio: "Cars are more loyal than Humans",
    img: "https://images.unsplash.com/photo-1533573271545-c1604421c980?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFjZXJ8ZW58MHx8MHx8fDA%3D",
  },
];

// Paths
app.get("/profiles", (req, res) => {
  res.render("index.ejs", { profiles });
});

// read
app.get("/profiles/:id/view", (req, res) => {
  let { id } = req.params;
  let profile = profiles.find((profile) => id === profile.id);
  if (profile) {
    res.render("view.ejs", { profile });
  } else {
    res.render("error.ejs");
  }
});

// create
app.get("/profiles/new", (req, res) => {
  res.render("newForm.ejs");
});

app.post("/profiles", (req, res) => {
  let { username, img, bio } = req.body;
  let id = uuidv4();
  profiles.push({ id, username, img, bio });
  res.redirect("/profiles");
});

// update
app.get("/profiles/:id/edit", (req, res) => {
  let { id } = req.params;
  let profile = profiles.find((profile) => id === profile.id);
  if (profile) {
    res.render("edit.ejs", { profile });
  }
});

app.put("/profiles/:id", (req, res) => {
  // PUT and PATCH can be used inter changeably
  let { id } = req.params;
  let { username, bio, img } = req.body;
  let profile = profiles.find((profile) => id === profile.id);
  profile.username = username;
  profile.bio = bio;
  profile.img = img;
  res.redirect("/profiles");
});

// delete
app.delete("/profiles/:id", (req, res) => {
  let { id } = req.params;
  profiles = profiles.filter((profile) => id !== profile.id);
  res.redirect("/profiles");
});
