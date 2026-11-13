const mongoose = require("mongoose");
const booking = require("../models/booking");
const Car = require("../models/car");
const User = require("../models/user");

async function seed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/rentX");
    console.log("database connected");

    // Delete old data so running this twice doesn't create duplicates
    await Car.deleteMany({});
    await User.deleteMany({});

    // Every car needs an owner, so create the owner first
    const owner = await User.create({
      name: "Test Owner",
      email: "owner@rentx.test",
      passwordHash: "placeholder",
      role: "owner",
    });

    // Create sample cars that belong to that owner
    await Car.insertMany([
      { owner: owner._id, title: "Maruti Swift", city: "Indore", pricePerDay: 1200, transmission: "manual", fuel: "petrol", seats: 5 },
      { owner: owner._id, title: "Hyundai Creta", city: "Indore", pricePerDay: 2500, transmission: "automatic", fuel: "diesel", seats: 5 },
      { owner: owner._id, title: "Toyota Innova", city: "Indore", pricePerDay: 3200, transmission: "manual", fuel: "diesel", seats: 7 },
      { owner: owner._id, title: "Tata Nexon EV", city: "Indore", pricePerDay: 2800, transmission: "automatic", fuel: "electric", seats: 5 },
      { owner: owner._id, title: "Honda City", city: "Bhopal", pricePerDay: 2200, transmission: "automatic", fuel: "petrol", seats: 5 },
      { owner: owner._id, title: "Maruti WagonR", city: "Indore", pricePerDay: 900, transmission: "manual", fuel: "cng", seats: 5 },
    ]);

    console.log("Seed complete: 1 owner and 6 cars added");
  } catch (err) {
    console.log("Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();