const express = require('express');
const router = express.Router();
const auth = require('../auth.js');

const productController = require('../Controllers/productController.js');

// Route for creating a product
router.post('/', auth.verify, productController.createProduct);

// Route for retrieving all active products
router.get('/active', productController.allActiveProducts);


// [ Routes with Params]

// Route for retrieving a single product
router.get('/:productId', productController.productDetails);

// Route for updating product information
router.put('/update/:productId', auth.verify, productController.updateProduct);

// Route for archiving a product
router.patch('/archive/:productId', auth.verify, productController.archiveProduct);

module.exports = router;