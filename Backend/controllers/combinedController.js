const axios = require('axios');

exports.getCombinedData = async (req, res) => {
  const { month, page = 1, perPage = 10, search = '' } = req.query;

  const transactionsPromise = axios.get(`http://localhost:3060/api/transaction`, {
    params: { month, page, perPage, search }
  });

  const statisticsPromise = axios.get(`http://localhost:3060/api/statistics`, { params: { month } });
  const barChartPromise = axios.get(`http://localhost:3060/api/barChart`, { params: { month } });
  const pieChartPromise = axios.get(`http://localhost:3060/api/pieChart`, { params: { month } });

  try {
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      transactionsPromise,
      statisticsPromise,
      barChartPromise,
      pieChartPromise
    ]);

    res.json({
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

