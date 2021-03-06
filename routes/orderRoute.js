const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
    try {
		const order = await Order.find().sort({createdAt: 1});

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

		const order = await Order.addOrder({
			price: req.body.price,
			productos: orders,
			client: {
				id: req.body.userId,
				name: req.body.userName,
				address: req.body.userAddress
			},
			state: req.body.state
		});

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

router.put('/', async (req, res) => {
	try {
		console.log(req.body)

		const updatedOrder = await Order.findByIdAndUpdate(req.body._id, { $set: { state: req.body.state }}, {new: true})

		res.status(201).json({
			message: `Order with id ${req.body._id} updated succesfully`,
			updatedOrder
		})
	} catch (error) {
		res.status(500).json({
			message: error.message
		})
	}
});

module.exports = router;