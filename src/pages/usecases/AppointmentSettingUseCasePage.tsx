import { SEOHead } from '../../components/seo/SEOHead';
import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CtaBanner } from '../../components/CtaBanner';

export const AppointmentSettingUseCasePage: React.FC = () => {
  return (
    <div className="pt-20 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <SEOHead 
        title="Automated Appointment Setting & Calendar Booking | Outtricks"
        description="Convert outbound prospects into confirmed sales demos automatically with AI meeting booking."
        canonical="https://outtricks.com/use-cases/appointment-setting"
        breadcrumbs={[{"name":"Use Cases","url":"/use-cases"},{"name":"Appointment Setting","url":"/use-cases/appointment-setting"}]}
      />
      <PageHeader 
        category="Use Cases" categoryHref="/use-cases"
        badge="Appointment Setting"
        title="Autonomous Demo Qualification & Calendar Booking"
        description="Use AI Voice SDRs and smart email agents to qualify inbound/outbound leads and insert meetings directly into your team's Google Calendar."
      />
      <CtaBanner />
    </div>
  );
};
