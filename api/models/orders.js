const express = require('express');
const mongoose = require('mongoose');


const OrdersModel = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	OrderNumber: {type: String, required: true},
	ProductID: {type: String, required: true},
	OrderedDate: Date,
	Status: {type: String, required: true},
});

module.exports = mongoose.model('Orders', OrdersModel);