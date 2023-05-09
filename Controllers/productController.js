const Product = require('../Models/productSchema.js');
const auth = require('../auth.js');

// Create Product (Admin Only)
module.exports.createProduct = (req, res) =>{
	let input = req.body;
	let userData = auth.decode(req.headers.authorization);

	let newProduct = new Product({
		name: input.name,
		description: input.description,
		price: input.price
	});

	if(!userData.isAdmin){
		return res.send('Sorry, you are not allowed to access this page')
	}else{
		Product.findOne({name: input.name})
		.then(result => {
			if(result){
				return res.send('Product already exists!')
			}else{
			return newProduct.save()
			
			.then(product =>{
				
				res.send('You have successfully added a product!');
			})
		
			.catch(error =>{
			
			res.send(false);
			})
		}
		
	})
	}
}


// Retrieve all active products
module.exports.allActiveProducts = (req, res) => {

	Product.find({isAvailable: true})
		.then(result => res.send(result))
		.catch(error => res.send(error));
}


// Retrieve single product
module.exports.productDetails = (req, res) => {
	
	const productId = req.params.productId;

	Product.findById(productId)
		.then(result => res.send(result))
		.catch(error => res.send(error));
}


// Update product information (Admin Only)
module.exports.updateProduct = (req, res) => {

	const userData = auth.decode(req.headers.authorization);
	const productId = req.params.productId;
	const input = req.body

	if(!userData.isAdmin){
		return res.send('Sorry, you are not allowed to access this page');
	}else{
		Product.findById(productId)
		.then(result =>{
			if (result === null){
				return res.send('Product Id is invalid, please try again!')
		}else{
		let updatedProduct = {
			name: input.name,
			description: input.description,
			price: input.price
		}

		Product.findByIdAndUpdate(productId, updatedProduct, {new: true})
		.then(result => {
			
			return res.send('Product information has been successfully updated!')})
		.catch(error => res.send(error));
		}
	})
	}
}


// Archive Product (Admin Only)
module.exports.archiveProduct = (req, res) => {

	const userData = auth.decode(req.headers.authorization);
	const productId = req.params.productId;
	const input = req.body

	if(!userData.isAdmin){
		return res.send('Sorry, you are not allowed to access this page');
	}else{
		Product.findById(productId)
		.then(result =>{
			if (result === null){
				return res.send("Product Id is invalid, please try again!")
		}else{
		let archivedProduct = {
			isAvailable: input.isAvailable
		}

		Product.findByIdAndUpdate(productId, archivedProduct, {new: true})
		.then(result => {
			
			return res.send('This product is currently unavailable')})
		.catch(error => res.send(error));
		}
	})
	}
}