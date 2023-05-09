const express = require('express');
const router = express.Router();
const auth = require('../auth.js');

const orderController = require('../Controllers/orderController.js');

// Route for adding an order
router.post('/:productId', auth.verify, orderController.createOrder);

// Route for retrieving all orders
router.get('/all', auth.verify, orderController.allOrders);

// Route for retrieving authenticated user's orders
// router.get('/history/:userId', auth.verify, orderController.orderHistory);


module.exports = router;