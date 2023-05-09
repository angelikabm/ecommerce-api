const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'First Name is required!']
	},
	lastName: {
		type: String,
		required: [true, 'Last Name is required!']
	},
	email: {
		type: String,
		required: [true, 'Email is required!']
	},
	password: {
		type: String,
		required: [true, 'Password is required!']
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	myOrders: [
			{
				productId: {
					type: String,
					required: [true, "Product ID is required!"]
				},
				purchasedOn: {
					type: Date,
					default: new Date()
				},
				status: {
					type: String,
					default: "Completed"
				}
			}
		]
})


module.exports = mongoose.model('User', userSchema);