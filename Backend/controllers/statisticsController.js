const Product = require('../models/productModel');
exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1;

  try {
    const totalSalesAgg = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] },
          sold: true
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$price" }
        }
      }
    ]);

    const soldItemsCount = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] },
          sold: true
        }
      },
      {
        $count: "soldItems"
      }
    ]);

    const notSoldItemsCount = await Product.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$dateOfSale" }, monthIndex] },
          sold: false
        }
      },
      {
        $count: "notSoldItems"
      }
    ]);

    const totalSales = totalSalesAgg.length > 0 ? totalSalesAgg[0].total : 0;
    const soldItems = soldItemsCount.length > 0 ? soldItemsCount[0].soldItems : 0;
    const notSoldItems = notSoldItemsCount.length > 0 ? notSoldItemsCount[0].notSoldItems : 0;

    res.json({
      totalSales,
      soldItems,
      notSoldItems
    });
  } catch (err) {
    console.error('Error getting statistics:', err);
    res.status(500).send('Error getting statistics');
  }
};

