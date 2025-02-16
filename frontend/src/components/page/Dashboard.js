import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from '../Layouts/Filter';
import Spinner from '../Layouts/Spinner';
import { Progress } from 'antd'
import Header2 from '../Layouts/Header2';

const Dashboard = () => {


  const [allTransaction, setAllTransaction] = useState([]);
  // categoroies
  const categories = ['salary', 'home', 'project', 'tax', 'food', 'fees', 'movie', 'medical', 'bills', 'tip'];

  // states
  const [filter, setFilter] = useState('365');
  const [type, setType] = useState('all');
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState([]);


  useEffect(() => {
    const updateData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transactions/get-transactions",
          {
            userid: user._id,
            filter,
            selectedDate,
            type,
          });
        setLoading(false);

        console.log("Selected Date:", selectedDate); // Log selected date
        console.log("API Response:", res.data); // Log API response
        setAllTransaction(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    updateData();
  }, [filter, selectedDate, type]);


  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
  }



  // For total transaction
  const totalTransaction = allTransaction.length;
  const totalIncomeTransactions = allTransaction.filter((transaction) => transaction.type === 'income');
  const totalExpenseTransactions = allTransaction.filter((transaction) => transaction.type === 'expense');
  const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;

  //For Total turnover
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalTurnover = totalIncomeTurnover - totalExpenseTurnover;

  const totalIncomeTurnoverPercent = (totalIncomeTurnover / (totalIncomeTurnover + totalExpenseTurnover)) * 100;
  const totalExpenseTurnoverPercent = (totalExpenseTurnover / (totalIncomeTurnover + totalExpenseTurnover)) * 100;



  return (
    <main>
      <nav>
        <Header2/>
      </nav>
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


      {/* Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-3">
        {/* Total Transaction */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="bg-gray-100 p-3 rounded-t-lg">
            Total Transaction: {totalTransaction}
          </div>
          <div className="p-5">
            <h5 className="text-green-600 font-medium">
              Income: {totalIncomeTransactions.length}
            </h5>
            <h5 className="text-red-600 font-medium">
              Expense: {totalExpenseTransactions.length}
            </h5>
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-4">
              <Progress
                type="dashboard"
                className="m-5"
                strokeColor={"green"}
                percent={totalIncomePercent.toFixed(0)}
              />
              <Progress
                type="dashboard"
                strokeColor={"red"}
                className="m-5"
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>

        {/* Total Turnover */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="bg-gray-100 p-3 rounded-t-lg">
            Total Turnover: {totalTurnover}
          </div>
          <div className="p-5">
            <h5 className="text-green-600 font-medium">
              Income: {totalIncomeTurnover}
            </h5>
            <h5 className="text-red-600 font-medium">
              Expense: {totalExpenseTurnover}
            </h5>
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 mt-4">
              <Progress
                type="dashboard"
                className="m-5"
                strokeColor={"green"}
                percent={totalIncomeTurnoverPercent.toFixed(0)}
              />
              <Progress
                type="dashboard"
                strokeColor={"red"}
                className="m-5"
                percent={totalExpenseTurnoverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-3">
        {/* Categorywise Income */}
        <div className="bg-white rounded-lg shadow-lg">
          <h4 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">Categorywise Income</h4>
          <div className="max-h-64 overflow-y-scroll">
            {categories.map((category, index) => {
              const amount = allTransaction
                .filter(
                  (transaction) =>
                    transaction.type === "income" && transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div
                    className="bg-white shadow-md rounded-lg mb-4"
                    key={`${category}-${index}`}
                  >
                    <div className="p-4">
                      <h5 className="text-base font-medium text-gray-800">
                        {category}
                      </h5>
                      <div className="flex items-center justify-center mt-2">
                        <Progress
                          percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                        />
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>


        {/* Categorywise Expense */}
        <div className="bg-white rounded-lg shadow-lg">
          <h4 className="text-lg bg-gray-100 p-3 rounded-t-lg font-semibold mb-4">Categorywise Expense</h4>
          <div className="max-h-64 overflow-y-scroll">
            {categories.map((category, index) => {
              const amount = allTransaction
                .filter(
                  (transaction) =>
                    transaction.type === "expense" && transaction.category === category
                )
                .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div
                    className="bg-white shadow-md rounded-lg mb-4"
                    key={`${category}-${index}`}
                  >
                    <div className="p-4">
                      <h5 className="text-base font-medium text-gray-800">
                        {category}
                      </h5>
                      <div className="flex items-center justify-center mt-2">
                        <Progress
                          percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                        />
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>

    </main>
  );
};

export default Dashboard;
