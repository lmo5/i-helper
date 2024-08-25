import React from 'react';
import styled from '@emotion/styled';

const DashboardContainer = styled.div`
  padding: 20px;
`;

const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <h2>Dashboard</h2>
      <p>Welcome to i-Helper! This is your dashboard.</p>
      {/* Add more dashboard content here */}
    </DashboardContainer>
  );
};

export default Dashboard;