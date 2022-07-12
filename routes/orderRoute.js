const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
    try {
		const order = await Order.find();
		res.status(200).send(order);
	} catch (error) {
		res.status(500).json({
			message: error.message
		})
	}

});


module.exports = router;