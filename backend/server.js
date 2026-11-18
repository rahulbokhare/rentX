const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Car = require("./models/car");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


app.use(express.json());
const PORT = process.env.PORT;

async function main(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected")
        app.listen(PORT,() => {
        console.log(`server is listening through ${PORT}`)
        });
    }catch(err){
        console.log(err);
    }
}

main()


app.get("/api/cars", async(req, res) => {
    try{
        const filter = { status : "active"};

        if(req.query.city){
            filter.city = req.query.city;
        };
        if(req.query.transmission){
            filter.transmission = req.query.transmission;
        };
        if(req.query.fuel){
            filter.fuel = req.query.fuel;
        };
        if(req.query.maxPrice){
            filter.pricePerDay = { $lte : Number(req.query.maxPrice)};
        };
        const cars = await Car.find(filter);
        res.status(200).json(cars);
    }catch(err){
        res.status(500).json("faild to fetch cars")
    }
});


app.get("/api/cars/:id", async(req, res) => {
    try{
        const car = await Car.findById(req.params.id).populate("owner","name email");
        res.status(200).json(car);
    }catch(err){
        res.status(500).json(err)
    }
});

app.post("/api/auth/register", async(req, res) => {
    try{
        const{name, email, password, role } = req.body;

        if(!name || !email || !password){
            return res.status(400).json("enter all credentials")
        };

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json("user already exist");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            passwordHash,
            role : role || "customer",
        });

        res.status(201).json({message : "user successfully registered", 
            user :{
                name : user.name,
                email : user.email,
                role : user.role,
            },
        })
    }catch(err){
        res.status(500).json("Registration faild");
    };

});


app.post("/api/auth/login" , async(req, res) => {
        try{
            const{ email, password } = req.body;

            if(!email || !password){
                return res.status(400).json("please provide email and password");
            };

            const user = await User.findOne({ email }).select("+passwordHash");

            if(!user){
                return res.status(400).json("user does not exist please register");
            };

            const isMatch = await bcrypt.compare(password, user.passwordHash);

            if(!isMatch){
                return res.status(400).json("Invalid credentials")
            };

            const token = jwt.sign(
                {id : user._id, role : user.role },
                process.env.JWT_SECRET,
                {expiresIn : "7d"}
            );
            res.status(200).json({ message : "login successfully", token, user : {
                id: user._id,
                name : user.name,
                email : user.email,
                role : user.role,
              }
            });

        }catch(err){
            return res.status(400).json("something went wrong Login faild");
        }
    });

    