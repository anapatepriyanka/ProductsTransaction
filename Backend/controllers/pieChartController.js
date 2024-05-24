const Product = require('../models/productModel');

exports.getPieChart = async (req, res) => {
  const { month } = req.query;
  const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  try {
    const categories = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] }
        }
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(categories);
  } catch (err) {
    console.error('Error getting pie chart data:', err);
    res.status(500).send('Error getting pie chart data');
  }
};
