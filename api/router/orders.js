const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OrdersModel = require('../models/orders');


/*Handles product get requests*/
router.get('/', async function (req, res) {
	const orders = await OrdersModel.find();

	res.status('200').json({
		'Orders': orders,
		'message': 'Orders Fetched',
	});
})


/*Handles product post requests*/
router.post('/', async function (req, res) {

	const newOrder = new OrdersModel({
		_id: new mongoose.Types.ObjectId(),
		OrderNumber: req.body.OrderNumber, 
		ProductID: req.body.ProductID, 
		OrderedDate: Date.now(),
		Status: req.body.Status,
	})

	await newOrder.save().catch(err => {
		res.status('501').json({
			err
		})
	});
	res.status('200').json({
		'message': 'Order Placed',
		'createdOrder': newOrder,
	});
})

/*Handles product patch requests*/
router.patch('/', async function (req, res) {

	const updatedOrder = {
		OrderNumber: req.body.OrderNumber,
		ProductID: req.body.ProductID, 
		ModifiedDate: Date.now(),
		Status: req.body.Status,

	};

	const order = await OrdersModel.findOne({_id: req.body._id});

	await order.updateOne(updatedOrder).catch(err => {
		res.status('501').json({
			err
		});
	});

	const updated = await OrdersModel.findOne({_id: req.body._id}).catch(err => {
		res.status('501').json({
			err
		})
	})

	res.status('200').json({
		'message': 'Order Updated Successfully',
		'updateOrder': updated,
	});
})

/*Handles product delete requests*/
router.delete('/', async function (req, res) {

	await OrdersModel.deleteOne({_id: req.body._id})
	.catch(err => {
		res.status('501').json({
			err
		});
	});

	res.status('200').json({
		'message': 'Handles Orders delete Request',
	});
})

module.exports = router;