import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function BarChart({ selectedMonth }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchChartData();
  }, [selectedMonth]);

  const fetchChartData = () => {
    axios.get(`http://localhost:3060/api/transaction/chart-data?month=${selectedMonth}`)
      .then((response) => {
        const { priceRanges, itemCounts } = response.data;

        setChartData({
          labels: priceRanges,
          datasets: [
            {
              label: 'Number of Items',
              data: itemCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>Transactions Bar Chart for {selectedMonth !== '' ? getMonthName(selectedMonth) : 'All Months'}</h3>
      <Bar data={chartData} />
    </div>
  );
}

function getMonthName(monthIndex) {
  return new Date(2000, monthIndex).toLocaleString('default', { month: 'long' });
}

export default BarChart;
