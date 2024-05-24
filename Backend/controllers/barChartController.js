const Product = require('../models/productModel');

const priceRanges = [
  { min: 0, max: 100 },
  { min: 101, max: 200 },
  { min: 201, max: 300 },
  { min: 301, max: 400 },
  { min: 401, max: 500 },
  { min: 501, max: 600 },
  { min: 601, max: 700 },
  { min: 701, max: 800 },
  { min: 801, max: 900 },
  { min: 901, max: Infinity }
];

exports.getBarChart = async (req, res) => {
  const { month } = req.query;
  const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  try {
    const result = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] }
        }
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
          default: "901+",
          output: {
            count: { $sum: 1 }
          }
        }
      },
      {
        $addFields: {
          range: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 0] }, then: "0-100" },
                { case: { $eq: ["$_id", 100] }, then: "101-200" },
                { case: { $eq: ["$_id", 200] }, then: "201-300" },
                { case: { $eq: ["$_id", 300] }, then: "301-400" },
                { case: { $eq: ["$_id", 400] }, then: "401-500" },
                { case: { $eq: ["$_id", 500] }, then: "501-600" },
                { case: { $eq: ["$_id", 600] }, then: "601-700" },
                { case: { $eq: ["$_id", 700] }, then: "701-800" },
                { case: { $eq: ["$_id", 800] }, then: "801-900" },
                { case: { $eq: ["$_id", 900] }, then: "901+" }
              ],
              default: "Unknown"
            }
          }
        }
      }
    ]);

    res.json(result.map(item => ({ range: item.range, count: item.count })));
  } catch (err) {
    console.error('Error generating bar chart data:', err);
    res.status(500).send('Error generating bar chart data');
  }
};
