import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import ChatInterface from './features/chat/ChatInterface';
import Dashboard from './features/dashboard/Dashboard';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Sidebar>
          <h2>i-Helper</h2>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/chat">Chat</Link></li>
              {/* Add more navigation items for other features */}
            </ul>
          </nav>
        </Sidebar>
        <Content>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<ChatInterface />} />
            {/* Add more routes for other features */}
          </Routes>
        </Content>
      </AppContainer>
    </Router>
  );
};

export default App;