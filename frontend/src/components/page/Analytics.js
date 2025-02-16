import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Spinner from '../Layouts/Spinner';
import Header2 from '../Layouts/Header2';
import Filter from '../Layouts/Filter';
import Piechart from '../Layouts/Piechart';

const Analytics = () => {
  const [filter, setFilter] = useState('365');
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState([]);
  const [graph, setGraph] = useState([]);

  useEffect(() => {
    const updateData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transactions/get-transactions", {
          userid: user._id,
          filter,
          selectedDate,
          type,
        });

        setLoading(false);

        // Prepare data for the graph
        const graphData = prepareGraphData(res.data);
        console.log('Graph Data:', graphData);

        setGraph(graphData);

      } catch (error) {
        console.log(error);
      }
    };

    updateData();
  }, [filter, selectedDate, type]);

  const prepareGraphData = (transactions) => {
    const graph = [];
  
    transactions.forEach((transaction) => {
      const monthYear = new Date(transaction.date).toLocaleString('default', { year: 'numeric', month: 'long' });
      const existingMonth = graph.find((entry) => entry.monthYear === monthYear);
  
      // Check if the transaction is income or expense and update accordingly
      const amount = transaction.type === 'income' ? transaction.amount : -transaction.amount;
  
      if (existingMonth) {
        existingMonth.money += amount;
        if (transaction.type === 'income') {
          existingMonth.income += transaction.amount;
        } else {
          existingMonth.expense += transaction.amount;
        }
      } else {
        graph.push({
          monthYear, // Month-Year format (e.g., "January 2025")
          money: amount, // Total amount (income - expense)
          income: transaction.type === 'income' ? transaction.amount : 0,
          expense: transaction.type === 'expense' ? transaction.amount : 0
        });
      }
    });
  
    // Sorting by year and month
    const monthsOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    graph.sort((a, b) => {
      const [monthA, yearA] = a.monthYear.split(' ');
      const [monthB, yearB] = b.monthYear.split(' ');
      const yearComparison = yearA.localeCompare(yearB);
      if (yearComparison === 0) {
        return monthsOrder.indexOf(monthA) - monthsOrder.indexOf(monthB);
      }
      return yearComparison;
    });
  
    return graph;
  };
  
  

  const handleFilterChange = (value) => setFilter(value);
  const handleTypeChange = (value) => setType(value);
  const handleDateChange = (value) => setSelectedDate(value);

  return (
    <div>
      <nav><Header2 /></nav>

      {loading && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <Spinner />
        </div>
      )}

      <Filter
        onFilterChange={handleFilterChange}
        onTypeChange={handleTypeChange}
        onDateChange={handleDateChange}
        filter={filter}
        type={type}
        selectedDate={selectedDate}
      />

<ResponsiveContainer width="100%" height={500}>
  <LineChart data={graph}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="monthYear" />
    <YAxis />
    <Tooltip />
    <Legend />
    
    {/* Line for Income */}
    <Line type="monotone" dataKey="income" stroke="#82ca9d" />
    
    {/* Line for Expense */}
    <Line type="monotone" dataKey="expense" stroke="#FF0000" />
    
    {/* Total Money (income - expense) */}
    <Line type="monotone" dataKey="money" stroke="#8884d8" />
  </LineChart>
</ResponsiveContainer>

<hr className='border-sky-300 border-y-4 mt-5'/>

<section>
  <Piechart
  filter={filter}
  type={type}
  selectedDate={selectedDate}
  />
</section>

    </div>
  );
};

export default Analytics;
