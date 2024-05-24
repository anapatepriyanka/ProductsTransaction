import { useState, useEffect } from 'react';
import axios from 'axios';
import Statistics from './Statistics';
import BarChart from './BarChart';

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  function getMonthName(monthIndex) {
    return new Date(2000, monthIndex).toLocaleString('default', { month: 'long' });
  }
  
  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, currentPage, searchText]);

  const fetchTransactions = () => {
    axios.get(`http://localhost:3060/api/transaction`, {
      params: {
        month: selectedMonth,
        page: currentPage,
        search: searchText,
        limit: itemsPerPage,
      }
    })
      .then((response) => {
        console.log(response.data);
        setTransactions(response.data.transactions);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="monthSelect">Select Month:</label>
        <select id="monthSelect" value={selectedMonth} onChange={handleMonthChange}>
          <option value="">All Months</option>
          {Array.from({length: 12}, (_, i) => (
            <option key={i} value={i}>{getMonthName(i)}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="searchInput">Search:</label>
        <input type="text" id="searchInput" value={searchText} onChange={handleSearchChange} />
      </div>
      <Statistics selectedMonth={selectedMonth} />
      <BarChart selectedMonth={selectedMonth} />
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction._id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.sold}</td>
              <td>{transaction.image}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}
