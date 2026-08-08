import React, { useState } from 'react';
import TopNavbar from '../components/dashboard/TopNavbar';
import CustomerInfo from '../components/dashboard/CustomerInfo';
import ConversationPanel from '../components/dashboard/ConversationPanel';
import InsightsPanel from '../components/dashboard/InsightsPanel';
import RecommendationsPanel from '../components/dashboard/RecommendationsPanel';
import PerformanceInsightsPanel from '../components/dashboard/PerformanceInsightsPanel';
import SummaryPanel from '../components/dashboard/SummaryPanel';
import CostMetricCard from '../components/dashboard/CostMetricCard';
import ConsentBanner from '../components/ConsentBanner';

/**
 * Enterprise Real-Time SaaS Sales Dashboard Page
 * Aggregates Top AI Consent Banner, Left Lead Profile, Center Live Conversation Feed,
 * Right AI Insights & Recommendations Panel, Cost Per Interaction Card,
 * AI Performance Insights Panel, and Executive CRM Summary.
 */
export default function Dashboard() {
  const [currentTurnData, setCurrentTurnData] = useState({
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
    }
  });

  const handleTurnProcessed = (data) => {
    if (data) {
      setCurrentTurnData(data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <TopNavbar />

      {/* AI Privacy & Consent Banner */}
      <ConsentBanner />

      {/* Main SaaS Dashboard Container */}
      <div className="flex-1 p-6 max-w-[1600px] w-full mx-auto space-y-6 overflow-y-auto">
        {/* 3-Column Top & Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel: Customer Information (3 cols) */}
          <div className="lg:col-span-3">
            <CustomerInfo />
          </div>

          {/* Center Panel: Live Conversation Stream (5 cols) */}
          <div className="lg:col-span-5">
            <ConversationPanel onTurnProcessed={handleTurnProcessed} />
          </div>

          {/* Right Panel: AI Intelligence, Suggestions & Cost Metrics (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <CostMetricCard />
            <InsightsPanel turnData={currentTurnData} />
            <RecommendationsPanel recommendations={currentTurnData.recommendations} />
          </div>
        </div>

        {/* AI Performance Insights Section (12 cols) */}
        <div>
          <PerformanceInsightsPanel insightsData={currentTurnData.insights || currentTurnData.insights_data} />
        </div>

        {/* Bottom Panel: Executive Call Summary (12 cols) */}
        <div>
          <SummaryPanel turnData={currentTurnData} />
        </div>
      </div>
    </div>
  );
}
