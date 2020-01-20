const express = require('express');
const router = express.Router();
const productModel = require('../models/products');
const mongoose = require('mongoose');

/*Handles product get requests*/
router.get('/', function (req, res) {

	productModel.find().then(response => {
		res.status('200').json(response);		
	})
	.catch(err => {
		console.error(err);
		res.status('501').json(err);
	})
})


/*Handles product post requests*/
router.post('/', function (req, res) {
	const product = new productModel({
		_id: new mongoose.Types.ObjectId(),
		ProductName: req.body.ProductName,
		Price: req.body.Price
	})

	product.save().then(response => {
		res.status('200').json({
			'message': 'Product Created',
			'createdProduct': product
		});		
	})
	.catch(err => {
		console.log(err);
		res.status('501').json({
			'message': 'Failed to create Products',
		});				
	});
})

/*Handles product patch requests*/
router.patch('/', async function (req, res) {


	const updateproduct =  {
		ProductName: req.body.ProductName,
		Price: req.body.Price,
	}


	const product = await productModel.findOne({_id: req.body._id});

	await product.updateOne(updateproduct);
	const newproduct = await productModel.findOne({_id: req.body._id});

	res.status('200').json({
		'message': 'Product Updated',
		'updateproduct': newproduct
	})



})

/*Handles product delete requests*/
router.delete('/', async function (req, res) {


	await productModel.deleteOne({_id: req.body._id});

	res.status('200').json({
		'message': 'Product Deleted',
	})

})

module.exports = router;