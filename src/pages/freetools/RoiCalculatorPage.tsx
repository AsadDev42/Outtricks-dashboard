import { SEOHead } from '../../components/seo/SEOHead';
import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { RoiCalculator } from '../../components/RoiCalculator';
import { CtaBanner } from '../../components/CtaBanner';

export const RoiCalculatorPage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Free Outbound Sales ROI & Pipeline Calculator | Outtricks"
        description="Calculate your outbound pipeline ROI, expected meetings booked, and revenue potential."
        canonical="https://outtricks.com/free-tools/roi-calculator"
        keywords={["outbound ROI calculator","sales pipeline estimator","sales meeting revenue calculator","SDR ROI tool"]}
        breadcrumbs={[{"name":"Free Tools","url":"/resources/free-tools"},{"name":"ROI Calculator","url":"/free-tools/roi-calculator"}]}
      />
      <PageHeader 
        category="Free Tools"
        categoryHref="/resources/free-tools"
        badge="Revenue Forecasting"
        title="Cold Email ROI Calculator"
        description="Estimate meetings booked, deals closed, and new ARR based on your target ICP volume and average contract value."
      />

      <RoiCalculator />

      <CtaBanner 
        title="Start closing high-ticket deals on autopilot"
        description="Experience 99.4% deliverability and multi-channel Voice AI with Outtricks."
      />
    </div>
  );
};
