const User = require("../models/user");


module.exports.cars = [
      {  title: "Maruti Swift", city: "Indore", pricePerDay: 1200, transmission: "manual", fuel: "petrol", seats: 5 },
      {  title: "Hyundai Creta", city: "Indore", pricePerDay: 2500, transmission: "automatic", fuel: "diesel", seats: 5 },
      {  title: "Toyota Innova", city: "Indore", pricePerDay: 3200, transmission: "manual", fuel: "diesel", seats: 7 },
      {  title: "Tata Nexon EV", city: "Indore", pricePerDay: 2800, transmission: "automatic", fuel: "electric", seats: 5 },
      {  title: "Honda City", city: "Bhopal", pricePerDay: 2200, transmission: "automatic", fuel: "petrol", seats: 5 },
      {  title: "Maruti WagonR", city: "Indore", pricePerDay: 900, transmission: "manual", fuel: "cng", seats: 5 },
    ];


    module.exports.user = [{
        name: "Rahul",
        email: "owner@rentx.test",
        passwordHash: "placeholder",
        role: "owner",
        },
        {
        name: "daksh",
        email: "daksh@rentx.test",
        passwordHash: "placeholder",
        role: "owner",
        }
    ]