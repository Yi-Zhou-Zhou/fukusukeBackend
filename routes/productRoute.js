const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const auth = require("../middleware/auth");

router.get('/', auth, async (req, res) => {
	try {
		if (req.userData.role !== 'admin') {
			return res.status(401).send('Access denied.');
		}
		const products = await Product.find();
		res.status(200).send(products);
	} catch (error) {
		res.status(500).json({
			message: error.message
		})
	}
});

router.post('/', auth, async (req, res) => {
	try {
		if (req.userData.role !== 'admin') {
			return res.status(401).send('Access denied.');
		}
		const product = await Product.addProduct({
			name: req.body.name,
			price: req.body.price,
			stock: req.body.stock,
			description: req.body.description,
			category: req.body.category,
			picture: "https://images.unsplash.com/photo-1615361200141-f45040f367be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
		});
		res.status(201).json({
			message: 'Product added',
			product
		})
	} catch (error) {
		res.status(500).json({
			message: error.message
		})
	}
});

module.exports = router;