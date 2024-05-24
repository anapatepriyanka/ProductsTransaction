import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Statistics({ selectedMonth }) {
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalUnsoldItems, setTotalUnsoldItems] = useState(0);

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = () => {
    axios.get(`http://localhost:3060/api/transaction/statistics?month=${selectedMonth}`)
      .then((response) => {
        console.log(response.data);
        const { totalAmount, totalSold, totalUnsold } = response.data;
        setTotalSaleAmount(totalAmount);
        setTotalSoldItems(totalSold);
        setTotalUnsoldItems(totalUnsold);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>Transaction Statistics for {selectedMonth !== '' ? getMonthName(selectedMonth) : 'All Months'}</h3>
      <p>Total Amount of Sale: ${totalSaleAmount.toFixed(2)}</p>
      <p>Total Sold Items: {totalSoldItems}</p>
      <p>Total Unsold Items: {totalUnsoldItems}</p>
    </div>
  );
}

function getMonthName(monthIndex) {
  return new Date(2000, monthIndex).toLocaleString('default', { month: 'long' });
}

export default Statistics;
