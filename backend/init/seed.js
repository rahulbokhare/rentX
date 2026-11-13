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

    // Delete old data so running this twice doesn't create duplicates
    await Car.deleteMany({});
    await User.deleteMany({});

    // Every car needs an owner, so create the owner first
    const owner = await User.create(data.user);

    const carsWithOwner = data.cars.map((car) => ({
      ...car, owner : owner[Math.floor(Math.random()*2)]._id,
    }))

    // Create sample cars that belong to that owner
    await Car.insertMany(carsWithOwner);



    console.log(`Seed complete: ${owner.length} owner and 6 cars added`);
  } catch (err) {
    console.log("Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();