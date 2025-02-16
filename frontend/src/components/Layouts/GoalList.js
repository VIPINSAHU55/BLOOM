import React, { useState } from "react";
import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";
import { Row, Col } from "antd";

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  
  const addGoal = (goal) => {
    setGoals([...goals, { ...goal, currentAmount: 0 }]); // Add currentAmount initially as 0
  };

  return (
    <div>
      <GoalForm onAddGoal={addGoal} />
      <Row gutter={[16, 16]}>
        {goals.map((goal, index) => (
          <Col span={8} key={index}>
            <GoalCard goal={goal} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default GoalList;
