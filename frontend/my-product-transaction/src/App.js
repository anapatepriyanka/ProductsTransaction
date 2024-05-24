import React, { useState } from 'react';
import TransactionTable from "./components/TransactionTable";
import Statistics from "./components/Statistics";
import BarChart from "./components/BarChart";

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState('');

  return (
    <div>
      <h1>Transaction Board</h1>
      <TransactionTable selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      {/* <Statistics selectedMonth={selectedMonth} /> */}
      {/* <BarChart selectedMonth={selectedMonth} /> */}
    </div>
  );
}
