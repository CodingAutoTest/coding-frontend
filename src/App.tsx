import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProblemPage } from './features/problem/ProblemPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/problems/:id" element={<ProblemPage />} />
      </Routes>
    </Router>
  );
};

export default App;
