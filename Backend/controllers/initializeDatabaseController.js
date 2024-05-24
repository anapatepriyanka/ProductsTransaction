const axios = require('axios');
const Product = require('../models/productModel');

const initializeDatabase = async (req, res) => {
  console.log('initializeDatabase function called');
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    await Product.deleteMany({});
    await Product.insertMany(data);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error initializing database:', err);
    res.status(500).json('Error initializing database.');
  }
};

module.exports = { initializeDatabase };


// transactionCtrl.list = async (req, res) => {
//     try {
//       const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
//       const transactions = response.data;
  
//       res.status(200).send(transactions);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
// }