const dotenv = require('dotenv');
dotenv.config()

const mongoose = require("mongoose");
const path = require("path")
const booking = require("../models/booking");
const Car = require("../models/car");
const User = require("../models/user");
const data = require("./data");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected");

    await Car.deleteMany({});
    await User.deleteMany({});


    const owner = new User({
      name : "rahul",
      email : "rahul@123",
      passwordHash : "placeholder",
      role : "owner"
    })

    await owner.save();
  

    const carsWithOwner = data.cars.map((car) => ({
      ...car, owner : owner._id,
    }))

    // Create sample cars that belong to that owner
    await Car.insertMany(carsWithOwner);



    console.log(`Seed complete: ${owner.name} owner and 6 cars added`);
  } catch (err) {
    console.log("Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();