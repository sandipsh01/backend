// import packages
const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const multipart = require('connect-multiparty');

const connectDB = require('./database/DB');

// dotenv config
require('dotenv').config();

// using express
const app = express();

// cors config
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));

// ejs config
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

// connect to mongodb
connectDB();

// middleware json
app.use(express.json());
app.use(multipart())

// All route config
app.use('/api/users', require('./controllers/userControllers'));
app.use('/api/products', require('./controllers/productController'));
app.use('/api/orders', require('./controllers/orderController'));

// cloudinary config
cloudinary.config({
    cloud_name: 'kingsly',
    api_key: '368993726257699',
    api_secret: 't7wlk7UbEkBn--lCB4OhDJ-E4_U'
});


// first test route
app.get('/', (req, res) => {
    res.send('Welcome to FlyBuy API');
});

// listen to port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});