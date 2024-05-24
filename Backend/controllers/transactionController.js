
const Product = require('../models/productModel');
exports.getTransactions = async (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;
  const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  try {
    const matchStage = {
      $match: {
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, monthIndex]
        },
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { price: { $regex: search, $options: 'i' } }
        ]
      }
    };

    const skipStage = { $skip: (page - 1) * perPage };
    const limitStage = { $limit: Number(perPage) };

    const totalCount = await Product.aggregate([
      matchStage,
      { $count: "total" }
    ]);

    const total = totalCount.length > 0 ? totalCount[0].total : 0;

    const transactions = await Product.aggregate([
      matchStage,
      skipStage,
      limitStage
    ]);

    res.json({ transactions, total });
  } catch (err) {
    console.error('Error getting transactions:', err);
    res.status(500).send('Error getting transactions');
  }
};


