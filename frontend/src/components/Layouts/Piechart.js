import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Spinner from './Spinner';

const Piechart = ({ filter, type, selectedDate }) => {
  const [loading, setLoading] = useState(false);
  const [pieData, setPieData] = useState([]);

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

        // Prepare data for the pie chart
        const pieChartData = preparePieData(res.data);
        console.log('Pie Chart Data:', pieChartData);

        setPieData(pieChartData);

      } catch (error) {
        console.log(error);
      }
    };

    updateData();
  }, [filter, selectedDate, type]);

  const preparePieData = (transactions) => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });

    return [
      { name: 'Income', value: income },
      { name: 'Expense', value: expense },
    ];
  };

  return (
    <div>
      {loading && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <Spinner />
        </div>
      )}

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie 
            data={pieData} 
            dataKey="value" 
            nameKey="name" 
            cx="50%" 
            cy="50%" 
            outerRadius={150} 
            fill="#8884d8"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.name === 'Income' ? '#82ca9d' : '#FF0000'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Piechart;
