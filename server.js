const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./Routes/userRoutes.js');
const productRoutes = require('./Routes/productRoutes.js');
const orderRoutes = require('./Routes/orderRoutes.js');

const port = 4000;
const app = express();
	mongoose.set('strictQuery', true);

	//[MongoDB Connection]
	mongoose.connect('mongodb+srv://admin:admin@batch245-manalang.eyiiu2i.mongodb.net/EcommerceAPI?retryWrites=true&w=majority', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})

	let db = mongoose.connection;

	//for error handling
	db.on('err', console.error.bind(console, 'Connection Error!'));

	//for validation of the connection
	db.once('open', () => {console.log('Welcome to my shop!')});

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//routing
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, ()=> console.log(`Server is running at port ${port}!`));	