import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CoPilotProvider, useCoPilot } from '../../context/CoPilotContext';
import { 
  CoPilotChatView, 
  CoPilotActionsView, 
  CoPilotPromptsLibraryView, 
  CoPilotKnowledgeBaseView 
} from '../../components/copilot';
import { SEOHead } from '../../components/seo/SEOHead';

const CoPilotContent: React.FC = () => {
  const { activeTab, setActiveTab } = useCoPilot();
  const location = useLocation();

  useEffect(() => {
    const p = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    if (
      p === '/' ||
      p === '/master-box' ||
      p === '/copilot' ||
      p === '/chat' ||
      p === '/ai-chat' ||
      p === '/app' ||
      p === '/app/copilot'
    ) {
      setActiveTab('chat');
    } else if (p.includes('/actions')) {
      setActiveTab('actions');
    } else if (p.includes('/prompts')) {
      setActiveTab('prompts');
    } else if (p.includes('/kb')) {
      setActiveTab('kb');
    }
  }, [location.pathname, setActiveTab]);

  return (
    <div className="w-full h-full font-sans animate-in fade-in duration-150">
      <SEOHead
        title="TRIXIE AI - Autonomous Revenue Operating Engine | Outtricks"
        description="Autonomous TRIXIE AI connected directly to your lead database, cold email inboxes, Voice SDR, and Deals CRM."
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
