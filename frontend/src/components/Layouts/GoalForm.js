import React, { useState } from "react";
import { Input, Button, Form, DatePicker, InputNumber, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const GoalForm = ({ onAddGoal }) => {
  const [form] = Form.useForm();
  const [goalData, setGoalData] = useState({
    goalName: "",
    targetAmount: 0,
    targetDate: null,
    category: "",
  });

  const onFinish = (values) => {
    onAddGoal(values);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Goal Name"
        name="goalName"
        rules={[{ required: true, message: "Please input your goal name!" }]}
      >
        <Input
          value={goalData.goalName}
          onChange={(e) =>
            setGoalData({ ...goalData, goalName: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item
        label="Target Amount"
        name="targetAmount"
        rules={[{ required: true, message: "Please input your target amount!" }]}
      >
        <InputNumber
          min={1}
          value={goalData.targetAmount}
          onChange={(value) => setGoalData({ ...goalData, targetAmount: value })}
        />
      </Form.Item>

      <Form.Item
        label="Target Date"
        name="targetDate"
        rules={[{ required: true, message: "Please select a target date!" }]}
      >
        <DatePicker
          onChange={(date) =>
            setGoalData({ ...goalData, targetDate: date })
          }
        />
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please select a category!" }]}
      >
        <Select
          onChange={(value) => setGoalData({ ...goalData, category: value })}
        >
          <Select.Option value="Savings">Savings</Select.Option>
          <Select.Option value="Investment">Investment</Select.Option>
          <Select.Option value="Expense">Expense</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Add Goal
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GoalForm;
