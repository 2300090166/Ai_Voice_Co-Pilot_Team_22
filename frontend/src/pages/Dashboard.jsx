import React, { useState } from 'react';
import CustomerInfo from '../components/dashboard/CustomerInfo';
import ConversationPanel from '../components/dashboard/ConversationPanel';
import InsightsPanel from '../components/dashboard/InsightsPanel';
import RecommendationsPanel from '../components/dashboard/RecommendationsPanel';
import PerformanceInsightsPanel from '../components/dashboard/PerformanceInsightsPanel';
import SummaryPanel from '../components/dashboard/SummaryPanel';
import CostMetricCard from '../components/dashboard/CostMetricCard';
import ConsentBanner from '../components/ConsentBanner';
import ErrorBoundary from '../components/ErrorBoundary';
import { CheckCircle2 } from 'lucide-react';

/**
 * Enterprise Real-Time SaaS Sales Dashboard Page Component
 * Manages full React Session State Lifecycle:
 * Idle -> Start Stream -> Streaming -> Pause -> Paused -> Resume -> Streaming -> End Session -> Ended -> Reset UI
 */
export default function Dashboard() {
  const [sessionStatus, setSessionStatus] = useState('streaming');
  const [toastMessage, setToastMessage] = useState('');

  const sampleMessages = [
    {
      id: 1,
      speaker: 'Customer',
      text: 'Hi, I am interested in buying a laptop for $600. Can students apply for Pay-in-3 zero-cost EMI?',
      time: '10:42 AM'
    },
    {
      id: 2,
      speaker: 'AI Co-Pilot',
      text: 'Full-time college and university students aged 18 and older can apply for Pay-in-3 zero-cost EMI. Students qualify with a valid student ID, active bank debit card, and proof of part-time income or allowance.',
      time: '10:42 AM'
    }
  ];

  const sampleTurnData = {
    answer: 'Full-time college and university students aged 18 and older can apply for Pay-in-3 zero-cost EMI. Students qualify with a valid student ID, active bank debit card, and proof of part-time income or allowance.',
    intent: 'EMI_INFORMATION',
    emotion_data: { emotion: 'Interested' },
    recommendations: [
      {
        title: 'Explain Zero Interest EMI',
        priority: 'High',
        reason: 'Customer requested Pay-in-3 installment terms and student eligibility.'
      },
      {
        title: 'Offer Application Link',
        priority: 'Medium',
        reason: 'Customer is eligible; offer instant digital checkout link.'
      }
    ],
    sources: ['faq.txt', 'product_info.txt'],
    confidence: 0.95,
    insights: {
      sales_score: 91,
      interest_level: 'High',
      conversation_quality: 'Excellent',
      conversion_probability: 87,
      strengths: [
        'Explained Pay-in-3 zero-cost EMI benefits clearly',
        'Grounded answers strictly in verified company knowledge base'
      ],
      improvements: [
        'Mention promotional cashback offers earlier in the call'
      ],
      suggestions: [
        'Offer application link',
        'Send product brochure'
      ]
    },
    crm: {
      customer_summary: 'Customer inquired about Pay-in-3 zero-cost EMI eligibility for a laptop purchase and verified student debit card requirements.',
      interest_score: 87,
      conversation_status: 'Interested',
      products_discussed: ['Pay-in-3 Zero-Cost EMI'],
      next_best_action: 'Offer Application Link',
      follow_up: 'Call Tomorrow'
    }
  };

  const [messages, setMessages] = useState(sampleMessages);
  const [currentTurnData, setCurrentTurnData] = useState(sampleTurnData);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  const handleStartSession = () => {
    setSessionStatus('streaming');
    setMessages(sampleMessages);
    setCurrentTurnData(sampleTurnData);
    triggerToast('New Call Session Started Successfully');
  };

  const handlePauseSession = () => {
    setSessionStatus('paused');
    triggerToast('Call Session Paused');
  };

  const handleResumeSession = () => {
    setSessionStatus('streaming');
    triggerToast('Call Session Resumed');
  };

  const handleEndSession = () => {
    setSessionStatus('ended');
    setMessages([]);
    setCurrentTurnData({
      answer: '',
      intent: 'NONE',
      emotion_data: { emotion: 'Neutral' },
      recommendations: [],
      sources: [],
      confidence: 0.0,
      insights: {
        sales_score: 0,
        interest_level: 'Ended',
        conversation_quality: 'Ended',
        conversion_probability: 0,
        strengths: ['Session completed'],
        improvements: [],
        suggestions: []
      },
      crm: {
        customer_summary: 'Call session ended by sales representative.',
        interest_score: 0,
        conversation_status: 'Completed',
        products_discussed: [],
        next_best_action: 'None',
        follow_up: 'Session Ended'
      }
    });
    triggerToast('Call Session Ended Successfully');
  };

  const handleTurnProcessed = (data) => {
    if (data) {
      setCurrentTurnData(data);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] w-full mx-auto">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl flex items-center justify-between text-xs font-bold shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top AI Privacy Consent Banner */}
      <ErrorBoundary>
        <ConsentBanner />
      </ErrorBoundary>

      {/* 3-Column Top & Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Customer Information & Call Controls (3 cols) */}
        <div className="lg:col-span-3">
          <ErrorBoundary>
            <CustomerInfo
              sessionStatus={sessionStatus}
              onStartSession={handleStartSession}
              onPauseSession={handlePauseSession}
              onResumeSession={handleResumeSession}
              onEndSession={handleEndSession}
            />
          </ErrorBoundary>
        </div>

        {/* Center Panel: Live Conversation Stream (5 cols) */}
        <div className="lg:col-span-5">
          <ErrorBoundary>
            <ConversationPanel
              messages={messages}
              sessionStatus={sessionStatus}
              onTurnProcessed={handleTurnProcessed}
              onMessagesUpdate={setMessages}
            />
          </ErrorBoundary>
        </div>

        {/* Right Panel: Cost Metric, AI Insights & Recommendations (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <ErrorBoundary>
            <CostMetricCard />
          </ErrorBoundary>
          <ErrorBoundary>
            <InsightsPanel turnData={currentTurnData} />
          </ErrorBoundary>
          <ErrorBoundary>
            <RecommendationsPanel recommendations={currentTurnData.recommendations} />
          </ErrorBoundary>
        </div>
      </div>

      {/* AI Performance Insights Section (12 cols) */}
      <div>
        <ErrorBoundary>
          <PerformanceInsightsPanel insightsData={currentTurnData.insights || currentTurnData.insights_data} />
        </ErrorBoundary>
      </div>

      {/* Bottom Panel: Executive Call Summary & CRM Card (12 cols) */}
      <div>
        <ErrorBoundary>
          <SummaryPanel turnData={currentTurnData} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
