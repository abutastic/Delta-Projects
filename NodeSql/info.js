const { faker } = require("@faker-js/faker");
const mySql = require("mysql2");

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  database: "team",
  password: "Abbas@786",
});

let q = "insert into users (id, username, email, password, avatar) values ?";

let user = [];

for (let i = 1; i <= 25; i++) {
  user.push(createRandomUser());
}

try {
  connection.query(q, [user], (err, result) => {
    if (err) throw err;
    console.log(result);
  });
} catch (err) {
  console.log(err);
}

connection.end();

function createRandomUser() {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
    faker.image.avatar(),
  ];
}
