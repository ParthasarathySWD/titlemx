const express = require('express');
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	ProductName: {type: String, required: true},
	Price: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);