import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Progress, Checkbox, DatePicker, Select } from 'antd';
import axios from 'axios';
import Header2 from '../Layouts/Header2';
import Spinner from "../Layouts/Spinner";
import moment from 'moment';

const { Option } = Select;

const GoalPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post('/goals/get-goals', { userId: user._id });
      setGoals(res.data);
    } catch (error) {
      message.error("Failed to fetch goals");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateGoal = async (values) => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const goalData = {
        userId: user._id,
        name: values.name,
        targetAmount: parseFloat(values.targetAmount),
        savedAmount: parseFloat(values.savedAmount),
        targetDate: values.targetDate ? values.targetDate.format("YYYY-MM-DD") : null, // Convert date to string
        category: values.category,
        status: values.status || "Ongoing",
      };

      if (editingGoal) {
        await axios.put('/goals/update-goal', { goalId: editingGoal._id, ...goalData });
        message.success("Goal updated successfully");
      } else {
        await axios.post('/goals/add-goal', goalData);
        message.success("Goal added successfully");
      }

      setIsModalVisible(false);
      setEditingGoal(null);
      form.resetFields();
      fetchGoals();
    } catch (error) {
      message.error("Failed to save goal");
    } finally {
      setLoading(false);
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    form.setFieldsValue({
      ...goal,
      targetDate: goal.targetDate ? moment(goal.targetDate) : null, // Convert string to moment object
    });
    setIsModalVisible(true);
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      setLoading(true);
      await axios.delete(`/goals/delete-goal/${goalId}`);
      message.success("Goal deleted successfully");
      fetchGoals();
    } catch (error) {
      message.error("Failed to delete goal");
    } finally {
      setLoading(false);
    }
  };

  const toggleGoalStatus = async (goalId, currentStatus) => {
    try {
      setLoading(true);
      const newStatus = currentStatus === 'Ongoing' ? 'Completed' : 'Ongoing';
      await axios.put(`/goals/update-goal`, { goalId, status: newStatus });
      fetchGoals();
    } catch (error) {
      message.error("Failed to update goal status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav>
        <Header2 />
      </nav>
      {loading && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <Spinner />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">🎯 Goals</h2>
        <div className="flex flex-wrap gap-4">
          {goals.map((goal) => (
            <div key={goal._id} className="bg-gray-800 p-4 rounded-lg text-white w-60 relative">
              <h3 className="text-lg font-semibold">{goal.name}</h3>
              <p>₹{goal.savedAmount.toFixed(2)} / ₹{goal.targetAmount.toFixed(2)}</p>
              <p>📅 Target Date: {goal.targetDate ? moment(goal.targetDate).format("YYYY-MM-DD") : "Not set"}</p>
              <p>📂 Category: {goal.category}</p>
              <Progress percent={((goal.savedAmount / goal.targetAmount) * 100).toFixed(2)} status="active" />

              <div className="flex justify-between items-center mt-2">
                <Button type="link" onClick={() => handleEditGoal(goal)}>✏️ Edit</Button>
                <Button type="link" danger onClick={() => handleDeleteGoal(goal._id)}>🗑 Delete</Button>
              </div>

              <Checkbox
                className="mt-2 text-white"
                checked={goal.status === 'Completed'}
                onChange={() => toggleGoalStatus(goal._id, goal.status)}
              >
                Mark as Completed
              </Checkbox>
            </div>
          ))}
        </div>

        {/* Ongoing & Completed Goals */}
        <div className="mt-6">
          <h3 className="text-lg font-bold">⏳ Ongoing</h3>
          {goals.filter(goal => goal.status === 'Ongoing').map((goal) => (
            <div key={goal._id} className="bg-gray-900 p-3 rounded-md flex justify-between items-center text-white mt-2">
              <span>{goal.name}</span>
              <span>₹{goal.targetAmount}</span>
            </div>
          ))}

          <h3 className="text-lg font-bold mt-4">✅ Completed</h3>
          {goals.filter(goal => goal.status === 'Completed').map((goal) => (
            <div key={goal._id} className="bg-green-900 p-3 rounded-md flex justify-between items-center text-white mt-2">
              <span>{goal.name}</span>
              <span>₹{goal.targetAmount}</span>
            </div>
          ))}
        </div>

        {/* Add Goal Button */}
        <div className="mt-6">
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            ➕ {editingGoal ? "Edit Goal" : "Add Goal"}
          </Button>
        </div>

        {/* Add/Edit Goal Modal */}
        <Modal
          title={editingGoal ? "Edit Goal" : "Add Goal"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingGoal(null);
            form.resetFields();
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleAddOrUpdateGoal}>
            <Form.Item name="name" label="Goal Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="targetAmount" label="Target Amount" rules={[{ required: true }]}>
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="savedAmount" label="Saved Amount">
              <Input type="number" min={0} />
            </Form.Item>
            <Form.Item name="targetDate" label="Target Date">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please select a category" }]}>
              <Select placeholder="Select category">
                <Option value="Savings">Savings</Option>
                <Option value="Expense">Expense</Option>
                <Option value="Investment">Investment</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editingGoal ? "Update Goal" : "Add Goal"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default GoalPage;
