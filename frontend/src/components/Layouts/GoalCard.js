import React from "react";
import { Card, Progress, Button } from "antd";

const GoalCard = ({ goal }) => {
  const { goalName, targetAmount, currentAmount, targetDate, category } = goal;

  const progress = (currentAmount / targetAmount) * 100;

  return (
    <Card
      title={goalName}
      extra={<Button type="link">Edit</Button>}
      style={{ width: 300, marginBottom: 20 }}
    >
      <p>Category: {category}</p>
      <p>Target Amount: ${targetAmount}</p>
      <p>Target Date: {targetDate.format("YYYY-MM-DD")}</p>
      <Progress percent={progress} status="active" />
      <p>Saved: ${currentAmount}</p>
    </Card>
  );
};

export default GoalCard;
