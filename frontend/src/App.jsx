import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CallAssistant from './pages/CallAssistant';
import VoiceAssistant from './pages/VoiceAssistant';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/call-assistant" element={<CallAssistant />} />
          <Route path="/voice-assistant" element={<VoiceAssistant />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Layout>
    </Router>
  );
}
