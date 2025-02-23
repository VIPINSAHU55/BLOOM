import React, { useState } from "react";
import { Card } from "antd";
import { Input, Button } from "antd";
import Header2 from "../Layouts/Header2";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Budgeting = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [chartData, setChartData] = useState([]);

  const calculateBudget = () => {
    const remaining = income - expenses - savingsGoal;
    setRemainingBudget(remaining);

    // Update chart data
    setChartData([
      { name: "Income", amount: income },
      { name: "Expenses", amount: expenses },
      { name: "Savings", amount: savingsGoal },
      { name: "Remaining", amount: remaining }
    ]);
  };

  return (
    <>
      <nav>
        <Header2 />
      </nav>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Budgeting</h1>
        <Card className="max-w-md mx-auto shadow-lg p-6 bg-white rounded-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              calculateBudget();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Monthly Income
              </label>
              <Input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                placeholder="Enter your monthly income"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Monthly Expenses
              </label>
              <Input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                placeholder="Enter your monthly expenses"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Savings Goal
              </label>
              <Input
                type="number"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(Number(e.target.value))}
                placeholder="Enter your savings goal"
              />
            </div>
            <Button type="primary" htmlType="submit" className="w-full">
              Calculate Budget
            </Button>
          </form>
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Remaining Budget:</h2>
            <p className={`text-xl ${remainingBudget < 0 ? "text-red-500" : "text-green-500"}`}>
              {remainingBudget < 0
                ? `-${Math.abs(remainingBudget)} (Over budget)`
                : `₹${remainingBudget}`}
            </p>
          </div>
        </Card>

        {/* Chart Section */}
        <div className="mt-8 max-w-md mx-auto bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-center mb-4">Budget Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Budgeting;
