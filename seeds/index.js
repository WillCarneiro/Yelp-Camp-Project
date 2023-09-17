const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp", {
    useNewUrlParser: true,
    index: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "64dc4aadbc9f891d32c6e304",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia sapiente placeat enim officia nisi. Corrupti quo consequuntur expedita assumenda deserunt nostrum, libero, vero at sapiente minima molestiae. Aliquam, asperiores incidunt.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dsogxravy/image/upload/v1692496941/YelpCamp/hs35ocekqdr80aqjfg7d.jpg",
                    filename: "YelpCamp/hs35ocekqdr80aqjfg7d",
                },
                {
                    url: "https://res.cloudinary.com/dsogxravy/image/upload/v1692496941/YelpCamp/hzpu9vutvvbbpshix5kw.jpg",
                    filename: "YelpCamp/hzpu9vutvvbbpshix5kw",
                },
            ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
