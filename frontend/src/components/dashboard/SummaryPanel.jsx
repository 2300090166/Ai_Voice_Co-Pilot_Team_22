import React from 'react';
import CRMSummaryCard from './CRMSummaryCard';

/**
 * Summary Panel Wrapper Component
 * Renders the automated CRM Summary Card in the bottom dashboard section.
 */
export default function SummaryPanel({ turnData }) {
  const crmData = turnData?.crm || turnData?.crm_data;

  return (
    <div>
      <CRMSummaryCard crmData={crmData} />
    </div>
  );
}
