const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 1500;
const path = require("path");
const methodOver = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.use(methodOver("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "my_app",
  password: "Abbas@786",
});

// deafult route (show number of users)
app.get("/", (req, res) => {
  let q = "SELECT count(*) FROM users";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

// show route (show all users in the from of table)
app.get("/users", (req, res) => {
  let q = "SELECT * FROM users";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.render("show.ejs", { users: result });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in Database while fetching the data");
  }
});

// Edit route
app.get("/users/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM users WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error while fetching edit form.");
  }
});

// update (DB) route
app.patch("/users/:id", (req, res) => {
  let { id } = req.params;
  let { username, password } = req.body;
  let q = `SELECT * FROM users WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];

      if (password !== user.password) {
        res.send("WRONG password detected!");
      } else {
        let q2 = `UPDATE users SET username ='${username}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect("/users");
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some error while updating user data.");
  }
});

// Post req to add a new user to DB
app.get("/users/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/users", (req, res) => {
  let id = uuidv4();
  let { username, email, password } = req.body;
  let data = [id, username, email, password];
  let q =
    "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)";
  try {
    connection.query(q, data, (err, result) => {
      if (err) throw err;
      res.redirect("/users");
    });
  } catch (err) {
    console.log(err);
    res.send("Some error has occured in database");
  }
});

// delete Account (deleting tuple)
app.get("/users/:id/delete", (req, res) => {
  let { id } = req.params;
  console.log(id);
  res.render("delete.ejs", { id });
});

app.delete("/users/:id", (req, res) => {
  let { id } = req.params;
  let { email, password } = req.body;
  let q = `SELECT * FROM users WHERE id='${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (user.email === email && user.password === password) {
        let q2 = `DELETE FROM users WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (result) {
            res.redirect("/users");
          } else if (err) {
            res.send("error deleting account");
          }
        });
      } else {
        res.send("Wrong Password Enterd!");
      }
    });
  } catch (err) {
    console.log(err);
    res.send("Some problem has occured in DB while deleting");
  }
});

app.listen(port, () => {
  console.log(`the app is listening at port ${port}`);
});
