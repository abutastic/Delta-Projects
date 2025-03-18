const { faker } = require("@faker-js/faker");
const mySql = require("mysql2");
const express = require("express");
const app = express();
const port = 2700;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOver = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOver("_method"));

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  database: "team",
  password: "Abbas@786",
});

// routes
// 1 - Count users route
app.get("/", (req, res) => {
  let q = "select count(*) from users";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("userCount.ejs", { count });
    });
  } catch (err) {
    console.log(err);
  }
});

// 2 - Display All users (READ)
app.get("/users", (req, res) => {
  let q = "select * from users";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let users = result;
      res.render("showUsers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
  }
});

// create path (CREATE)
app.get("/users/new", (req, res) => {
  res.render("register.ejs");
});

app.post("/users", (req, res) => {
  let { username, email, avatar, password } = req.body;
  let id = uuidv4();
  let user = [id, username, email, avatar, password];
  let q =
    "insert into users (id, username, email, avatar, password) values (?, ?, ?, ?, ?)";

  connection.query(q, user, (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.render("errorPage.ejs");
    }
    res.redirect("/users");
  });
});

// update user details (UPDATE)
app.get("/users/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from users where id = '${id}'`;
  connection.query(q, (err, result) => {
    if (err) {
      res.render("errorPage.ejs");
      console.log(err);
    } else {
      let user = result[0];
      res.render("edit.ejs", { user });
    }
  });
});

app.patch("/users/:id", (req, res) => {
  let { id } = req.params;
  let { username: newUser, email: newMail, password: newPass } = req.body;
  let q = `select * from users where id = '${id}'`;
  connection.query(q, (err, result) => {
    let user = result[0];
    if (user.password === newPass) {
      let q2 = `update users set username = '${newUser}', email = '${newMail}' where id = '${id}'`;
      connection.query(q2, (err, result) => {
        if (err) {
          console.log(err);
          res.render("errorPage.ejs");
        } else {
          res.redirect("/users");
        }
      });
    }
  });
});

// delete user;
app.get("/users/:id/delete", (req, res) => {
  let { id } = req.params;
  res.render("delete.ejs", { id });
});

app.delete("/users/:id/delete", (req, res) => {
  let { id } = req.params;
  let { password } = req.body;
  let q = `select * from users where id = '${id}'`;
  connection.query(q, (err, result) => {
    let user = result[0];
    if (user.password === password) {
      let q2 = `delete from users where id = '${id}'`;
      connection.query(q2, (err, result) => {
        if (err) {
          console.log(err);
          res.render("errorPage.ejs");
        } else {
          res.redirect("/users");
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`the app is listening on port ${port}`);
});
