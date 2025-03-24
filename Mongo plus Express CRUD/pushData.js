const mongoose = require("mongoose");
const Profile = require("./models/profiles.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/app");
}

main()
  .then(() => {
    console.log("Node and MongoDB connection established");
  })
  .catch((er) => {
    console.log(er);
  });

const profiles = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    bio: "Web developer and tech enthusiast",
    pin: 12345,
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    bio: "Loves AI and ML",
    pin: 23456,
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    bio: "Avid traveler and foodie",
    pin: 34567,
  },
  {
    name: "David Lee",
    email: "david@example.com",
    bio: "Gamer and software engineer",
    pin: 45678,
  },
  {
    name: "Eva Green",
    email: "eva@example.com",
    bio: "Digital artist and UX designer",
    pin: 56789,
  },
  {
    name: "Frank Ocean",
    email: "frank@example.com",
    bio: "Music producer and singer",
    pin: 67890,
  },
  {
    name: "Grace Hopper",
    email: "grace@example.com",
    bio: "Computer scientist and Navy Rear Admiral",
    pin: 78901,
  },
  {
    name: "Harry Potter",
    email: "harry@example.com",
    bio: "Wizard at Hogwarts",
    pin: 89012,
  },
  {
    name: "Ivy Adams",
    email: "ivy@example.com",
    bio: "Fitness coach and nutritionist",
    pin: 90123,
  },
  {
    name: "Jack Sparrow",
    email: "jack@example.com",
    bio: "Captain of the Black Pearl",
    pin: 98765,
  },
];

console.log(profiles);

Profile.insertMany(profiles);
