const Order = require('../Models/orderSchema.js');
const User = require('../Models/userSchema.js');
const auth = require('../auth.js');
const Product = require('../Models/productSchema.js');

// Non-admin User checkout (Create Order)
module.exports.createOrder = (req, res) =>{
	const userData = auth.decode(req.headers.authorization);
	const productId = req.params.productId;

	if(userData.isAdmin){
		return res.send('Sorry, you are not allowed to access this page')
	}else{
		let isUserValid = User.findById(userData._id)
			.then(result => {
				if(!result){
					return res.send('Used ID is invalid!');
				}else{
					result.myOrders.push({productId: productId});
					res.send('Your order has been created!');			
					return result.save()
					.then(save => true)
					.catch(error => false)
				}
			})
			.catch(error =>{
				res.send(error);
		})
	}
}

// Retrieve all orders (Admin only)
module.exports.allOrders = (req, res) => {
	let userData = auth.decode(req.headers.authorization);
	
	if(!userData.isAdmin){
			return res.send('Sorry, you are not allowed to access this page');
	}else{
		Order.find({})
			.then(result => res.send(result))
			.catch(error => res.send(error));
	}
}

// Retrieve authenticated user's orders (Non-admin only)
/*module.exports.orderHistory = (req, res) => {
	let input = req.body;

	User.findOne({email: input.email})
	.then(result => {
		if(result === null){
			return res.send('Email is not yet registered. Register first before logging in!')
		}else{
			const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)

			if(isPasswordCorrect){
				return res.send({myOrders: myOrders.(result)});
			}else{
				return res.send('Password is incorrect!')
			}
		}
	})

	.catch(err => {
		return res.send(err)
	})
}*/