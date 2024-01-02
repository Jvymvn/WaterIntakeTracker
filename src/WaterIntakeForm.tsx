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
      <div className='my-4'>
        {currentGoal !== null ? (
          <>
            <h2 className='mb-4'>Track Your Water Intake</h2>
            <p className='mb-3'>Current Goal: {currentGoal} fl oz</p>
            <p className='mb-3'>Current Intake: {currentIntake} fl oz ({calculatePercentage()}% of Goal)</p>
            <Form onSubmit={handleSubmitIntake}>
              <Form.Group controlId="waterIntakeAmount">
                <Form.Label className='mb-3'><h4>Enter water intake amount (in fl oz)</h4></Form.Label>
                <div style={{display: 'flex'}}>
                <Form.Control
                  type="number"
                  placeholder="Enter intake amount"
                  value={intakeAmount}
                  onChange={handleIntakeInputChange}
                  style={{ maxWidth: '25rem', marginRight: "5px" }}
                  required
                />
                <Button variant="primary" type="submit">
                Log Intake
              </Button></div>
              </Form.Group>
              
            </Form>
          </>
        ) : (
          <Form onSubmit={handleGoalSubmit}>
            <Form.Group controlId="waterIntakeGoal">
              <Form.Label className='mr-2'><h4>Enter your daily water intake goal (in fl oz)</h4></Form.Label>
              <div style={{display: 'flex'}}>
              <Form.Control
                type="number"
                placeholder="Enter goal"
                value={goal}
                onChange={handleGoalInputChange}
                style={{ maxWidth: '25rem', marginRight: "5px" }}
                required
              />
              <Button variant="primary" type="submit">
              Submit
            </Button>
            </div>
            </Form.Group>
            
          </Form>
        )}
      </div>
    );
  };
  
  export default WaterIntakeForm;