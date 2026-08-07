import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CallAssistant from './pages/CallAssistant';

/**
 * Main Application Component with React Router Configuration
 */
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/call-assistant" element={<CallAssistant />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
