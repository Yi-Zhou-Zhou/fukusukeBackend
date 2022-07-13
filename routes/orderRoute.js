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

router.post('/', async (req, res) => {
	try {
		//Axel no me lastimes porfavor
		let orders = []
		
		for (let i = 0; i < req.body.productos.length; i++) {
			const object = {
				id: req.body.productos[i].id,
				name: req.body.productos[i].name,
				price: req.body.productos[i].price,
				description: req.body.productos[i].description,
				picture: req.body.productos[i].picture,
				quantity: req.body.productos[i].quantity,
			}
			orders.push(object)
		}
		const order = await Order.addOrder(req.body
			
			//{
			// price: req.body.price,
			// productos: orders,
			// client:{
			// 	name: req.body.name,
			// 	address: req.body.address,
			// 	phone: req.body.phone,
			// },
			//}
		);
		res.status(201).json({
			message: 'Order added',
			order
		})
	} catch (error) {
		res.status(500).json({
			message: error.message
		})
	}
});


module.exports = router;