import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import WaterIntakeForm from './WaterIntakeForm';

const App: React.FC = () => {
  const [intakeGoal, setIntakeGoal] = useState<number | null>(null);
  const [currentIntake, setCurrentIntake] = useState(0);

  const handleFormSubmit = (goal: number) => {
    setIntakeGoal(goal);
  };

  const handleIntakeSubmit = (intake: number) => {
    setCurrentIntake(intake);
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h1>Water Intake Tracker</h1>
          <WaterIntakeForm
            onSubmitGoal={handleFormSubmit}
            onSubmitIntake={handleIntakeSubmit}
            currentGoal={intakeGoal}
            currentIntake={currentIntake}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
