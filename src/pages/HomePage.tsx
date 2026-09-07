import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { OutboundActivityInMotionSection } from '../components/home/OutboundActivityInMotionSection';
import { FromLeadToRevenueTableSection } from '../components/home/FromLeadToRevenueTableSection';
import { ProblemAndPlatformSection } from '../components/home/ProblemAndPlatformSection';
import { ChannelsDeepDiveSection } from '../components/home/ChannelsDeepDiveSection';
import { ComparisonAndFaqSection } from '../components/home/ComparisonAndFaqSection';
import { SEOHead } from '../components/seo/SEOHead';

const HOME_FAQS = [
  {
    question: "What is Outtricks?",
    answer: "Outtricks is the unified AI revenue operating system that connects 480M+ B2B lead discovery, multi-inbox cold email outreach, cloud LinkedIn automation, conversational sub-400ms Voice AI SDRs, and Deals CRM on a single connected database."
  },
  {
    question: "How does Outtricks eliminate tool sprawl?",
    answer: "Instead of subscribing to separate disconnected point solutions with zapier sync delays and data discrepancies, Outtricks natively unifies prospecting, email deliverability, LinkedIn automation, Voice SDR calling, and CRM pipeline into 1 synchronized platform with 0 tool switching."
  },
  {
    question: "How many verified B2B leads are in the Outtricks database?",
    answer: "Outtricks provides access to 480M+ verified global B2B profiles with contact search cascading across 15 premium verification sources."
  },
  {
    question: "What is the latency of Outtricks Voice AI SDR?",
    answer: "Outtricks Voice AI SDR operates at sub-400ms WebRTC voice latency for seamless, natural conversational phone qualifications and objection handling."
  },
  {
    question: "Does Outtricks support multi-inbox cold email rotation?",
    answer: "Yes, Outtricks includes multi-inbox rotation, dynamic spintax, and automated peer-to-peer warmup across Google Workspace and Microsoft 365 to maintain 99.4% inbox placement."
  }
];

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-20 sm:space-y-28 pt-20 pb-20 overflow-x-hidden">
      <SEOHead 
        title="Outtricks | AI Revenue Operating System for Sales & Growth"
        description="Outtricks unifies 480M+ B2B lead discovery, multi-inbox cold email, LinkedIn outreach, sub-400ms Voice AI SDRs, and CRM execution on 1 connected database."
        keywords={[
          'AI revenue platform',
          'revenue operating system',
          '480M B2B leads database',
          'cold email automation',
          'voice AI SDR',
          'LinkedIn outreach automation',
          'sales pipeline CRM',
          'outbound sales platform'
        ]}
        faqs={HOME_FAQS}
      />

      {/* 1. Announcement Bar, Hero Headline & Interactive Engine Simulator */}
      <HeroSection />

      {/* 2. Outbound Activity in Motion */}
      <OutboundActivityInMotionSection />

      {/* 3. From Lead to Revenue in Six Seamless Steps */}
      <FromLeadToRevenueTableSection />

      {/* 4. The Big Problem & Platform Overview */}
      <ProblemAndPlatformSection />

      {/* 5. 6 Native Channels Deep Dive Sandbox */}
      <ChannelsDeepDiveSection />

      {/* 6. Comparison Matrix & ROI Simulator */}
      <ComparisonAndFaqSection />
    </div>
  );
};
