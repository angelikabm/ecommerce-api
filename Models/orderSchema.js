const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, 'UserId is required!']
	},
	products: [
			{
				productId: {
					type: String,
					required: [true, "Product ID is required!"]
				},
				quantity: {
					type: Number,
					default: 0
				}
			}
		],
	purchasedOn: {
		type: Date,
		default: new Date()
	}
})


module.exports = mongoose.model('Order', orderSchema);