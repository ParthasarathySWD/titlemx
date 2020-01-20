const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');



/*Import Routes*/
const Productsroutes = require('./api/router/products');
const Ordersroutes = require('./api/router/orders');

const app = express();
app.use(bodyParser.urlencoded({'extended': false}));
app.use(bodyParser.json());	
mongoose.connect('mongodb://localhost:27017/training',
				{ 
					useNewUrlParser: true,
					useUnifiedTopology: true
				  });

app.use(cors());

app.use((req, res, next)=> {
	req.header("Access-Control-Allow-Origin", "*");
	req.header(
		"Access-Control-Allow-Headers", 
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Headers', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json();
	}
	next();
})


app.use('/products', Productsroutes);
app.use('/orders', Ordersroutes);



/*Error Handling*/
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
})


app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,

		}
	})
})
module.exports = app;
