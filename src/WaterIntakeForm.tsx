import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

interface WaterIntakeFormProps {
    onSubmitGoal: (goal: number) => void;
    onSubmitIntake: (intake: number) => void;
    currentGoal: number | null;
    currentIntake: number;
  }

  const WaterIntakeForm: React.FC<WaterIntakeFormProps> = ({
    onSubmitGoal,
    onSubmitIntake,
    currentGoal,
    currentIntake,
  }) => {
    const [goal, setGoal] = useState<number | ''>('');
    const [intakeAmount, setIntakeAmount] = useState<number | ''>('');
  
    const handleGoalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setGoal(value === '' ? '' : parseFloat(value));
    };
  
    const handleIntakeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setIntakeAmount(value === '' ? '' : parseFloat(value));
    };

    const calculatePercentage = () =>{
        if (currentGoal !== null && currentIntake !== null) {
            const percentage = (currentIntake / currentGoal) * 100;
            return isNaN(percentage) ? 0 : percentage.toFixed(2);
        }
        return 0;
    };
  
    const handleSubmitIntake = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (intakeAmount !== '' && currentGoal !== null) {
        const newIntake = currentIntake + intakeAmount;
        onSubmitIntake(newIntake);
        setIntakeAmount('');
      }
    };
  
    const handleGoalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (goal !== '') {
        onSubmitGoal(parseFloat(goal.toString()));
      }
    };
  
    return (
      <div>
        {currentGoal !== null ? (
          <>
            <h2>Track Your Water Intake</h2>
            <p>Current Goal: {currentGoal} fl oz</p>
            <p>Current Intake: {currentIntake} fl oz ({calculatePercentage()}% of Goal)</p>
            <Form onSubmit={handleSubmitIntake}>
              <Form.Group controlId="waterIntakeAmount">
                <Form.Label>Enter water intake amount (in fl oz)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter intake amount"
                  value={intakeAmount}
                  onChange={handleIntakeInputChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Log Intake
              </Button>
            </Form>
          </>
        ) : (
          <Form onSubmit={handleGoalSubmit}>
            <Form.Group controlId="waterIntakeGoal">
              <Form.Label>Enter your daily water intake goal (in fl oz)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter goal"
                value={goal}
                onChange={handleGoalInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
      </div>
    );
  };
  
  export default WaterIntakeForm;