const mongoose = require('mongoose');
const User = require('../Models/userSchema.js');

const bcrypt = require('bcrypt');
const auth = require('../auth.js');

// Controllers

//User Registration
module.exports.userRegistration = (req, res) => {

		const input = req.body;

		User.findOne({email: input.email})
		.then(result => {
			if(result !== null){
				return res.send(false)
			}else{
				let newUser = new User({
					firstName: input.firstName,
					lastName: input.lastName,
					email: input.email,
					password: bcrypt.hashSync(input.password, 10),
					mobileNo: input.mobileNo
				})

				newUser.save()
				.then(save => {
					return res.send(true)
							})
				.catch(err => {
					return res.send(false)
				})
			}
		})

		.catch(err => {
			return res.send(false)
		})
}

//User Authentication 	
module.exports.userAuthentication = (req, res) => {
		let input = req.body;

		User.findOne({email: input.email})
		.then(result => {
			if(result === null){
				return res.send(false)
			}else{
				const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)

				if(isPasswordCorrect){
					return res.send({auth: auth.createAccessToken(result)});
				}else{
					return res.send(false)
				}
			}
		})

		.catch(err => {
			return res.send(false)
		})
}

//Retrieve User Details
module.exports.getProfile = (req, res) => {
		const userId = req.params.userId;

		User.findById(userId)
			.then(result => {
			result.password = "";

			return res.send(result);
		})
			.catch(error => res.send(error));
}


//Set user as admin (Admin only)
module.exports.updateUser = (req, res) => {
		const userData = auth.decode(req.headers.authorization);
		const userId = req.params.userId;
		const input = req.body

		if(!userData.isAdmin){
			return res.send('You don\'t have access in this page!');
		}else{
			User.findById(userId)
			.then(result =>{
				if (result === null){
					return res.send(false)
			}else{
			let updatedUser = {
				isAdmin: true
			}

			User.findByIdAndUpdate(userId, updatedUser, {new: true})
			.then(result => {
				
				return res.send(true)})
			.catch(error => res.send(false));
			}
		})
		}
	}	

