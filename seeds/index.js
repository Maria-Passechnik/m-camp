const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors, places} = require('./seedHelpers')


// DB connection
mongoose.connect('mongodb://localhost:27017/m-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// DB connecion error
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB CONNECTED');
})

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 3; i++) {
        const random21 = Math.floor(Math.random() * 21);
        const price = Math.floor(Math.random() * 20)+ 10;
        const camp = new Campground({
            // MY USER ID
            author: '618bce983f94dbd4303790b7',
            location: `${cities[random21].city}, ${cities[random21].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,     
            description: 'SOME BEAUTIFUL DEMO PLACES',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random21].longitude,
                    cities[random21].latitude
                ]
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/m-camp/image/upload/v1635263306/MCamp/camp-img-12_ajpwff.jpg',
                    filename: 'marias-camps'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
