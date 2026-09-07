import React from 'react';
import { CoPilotProvider, useCoPilot } from '../../context/CoPilotContext';
import { 
  CoPilotChatView, 
  CoPilotActionsView, 
  CoPilotPromptsLibraryView, 
  CoPilotKnowledgeBaseView 
} from '../../components/copilot';
import { SEOHead } from '../../components/seo/SEOHead';

const CoPilotContent: React.FC = () => {
  const { activeTab } = useCoPilot();

  return (
    <div className="w-full h-full font-sans animate-in fade-in duration-150">
      <SEOHead
        title="Tricksy AI Assistant & Revenue Orchestration | Outtricks"
        description="Autonomous Tricksy AI revenue assistant connected to your lead database, cold email inboxes, Voice SDR, and Deals CRM."
      />

      {activeTab === 'chat' && <CoPilotChatView />}
      {activeTab === 'actions' && <CoPilotActionsView />}
      {activeTab === 'prompts' && <CoPilotPromptsLibraryView />}
      {activeTab === 'kb' && <CoPilotKnowledgeBaseView />}
    </div>
  );
};

export const AppCoPilotPage: React.FC = () => {
  return <CoPilotContent />;
};

export default AppCoPilotPage;
