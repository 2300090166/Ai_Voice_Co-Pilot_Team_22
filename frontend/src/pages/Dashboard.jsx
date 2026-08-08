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

/**
 * Enterprise Real-Time SaaS Sales Dashboard Page Component
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
    <div className="space-y-6 max-w-[1600px] w-full mx-auto">
      {/* Top AI Privacy Consent Banner */}
      <ErrorBoundary>
        <ConsentBanner />
      </ErrorBoundary>

      {/* 3-Column Top & Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Customer Information (3 cols) */}
        <div className="lg:col-span-3">
          <ErrorBoundary>
            <CustomerInfo />
          </ErrorBoundary>
        </div>

        {/* Center Panel: Live Conversation Stream (5 cols) */}
        <div className="lg:col-span-5">
          <ErrorBoundary>
            <ConversationPanel onTurnProcessed={handleTurnProcessed} />
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
