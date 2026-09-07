import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { AdminProvider } from './context/AdminContext';
import { AppLayout } from './components/shell/AppLayout';
import { NotFoundPage } from './components/shell/NotFoundPage';

// SaaS Platform Pages
import { DashboardPage } from './pages/DashboardPage';
import { AppCoPilotPage } from './pages/app/AppCoPilotPage';
import { AppLeadFinderPage } from './pages/app/AppLeadFinderPage';
import { AppLeadsPage } from './pages/app/AppLeadsPage';
import { AppCompaniesPage } from './pages/app/AppCompaniesPage';
import { AppColdEmailPage } from './pages/app/AppColdEmailPage';
import { AppVoiceAiPage } from './pages/app/AppVoiceAiPage';
import { AppCrmPage } from './pages/app/AppCrmPage';
import { AppFlowBuilderPage } from './pages/app/AppFlowBuilderPage';
import { AppInboxPage } from './pages/app/AppInboxPage';
import { AppDeliverabilityPage } from './pages/app/AppDeliverabilityPage';
import { AppSettingsPage } from './pages/app/AppSettingsPage';
import { AppAdminPage } from './pages/app/AppAdminPage';
import { AppUpworkPage } from './pages/app/AppUpworkPage';
import { AppAnalyticsPage } from './pages/app/AppAnalyticsPage';
import { AppAiAgentsPage } from './pages/app/AppAiAgentsPage';
import { AppCampaignsPage } from './pages/app/AppCampaignsPage';
import { AnalyticsPage } from './pages/platform/AnalyticsPage';
import { CampaignPage } from './pages/platform/CampaignPage';
import { AiAgentsPage } from './pages/platform/AiAgentsPage';
import { LinkedInPage } from './pages/platform/LinkedInPage';
import { IntegrationsPage } from './pages/platform/IntegrationsPage';
import { ApiPage } from './pages/platform/ApiPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';

import { SettingsProvider } from './context/SettingsContext';
import { CrmProvider } from './context/CrmContext';
import { CompaniesProvider } from './context/CompaniesContext';
import { LeadsManagementProvider } from './context/LeadsManagementContext';
import { LeadSearchProvider } from './context/LeadSearchContext';
import { EmailProvider } from './context/EmailContext';
import { VoiceAiProvider } from './context/VoiceAiContext';
import { LinkedInProvider } from './context/LinkedInContext';
import { MasterInboxProvider } from './context/MasterInboxContext';
import { UpworkProvider } from './context/UpworkContext';
import { WorkflowsProvider } from './context/WorkflowsContext';
import { AgentsProvider } from './context/AgentsContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { CoPilotProvider } from './context/CoPilotContext';
import { GlobalTabsProvider } from './context/GlobalTabsContext';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/ui/CustomCursor';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AdminProvider>
            <CursorProvider>
              <BrowserRouter basename={import.meta.env.BASE_URL}>
                <SettingsProvider>
                  <CrmProvider>
                    <CompaniesProvider>
                      <LeadsManagementProvider>
                        <LeadSearchProvider>
                          <EmailProvider>
                            <VoiceAiProvider>
                              <LinkedInProvider>
                                <MasterInboxProvider>
                                  <UpworkProvider>
                                    <WorkflowsProvider>
                                      <AgentsProvider>
                                        <AnalyticsProvider>
                                          <CoPilotProvider>
                                            <GlobalTabsProvider>
                                              <ScrollToTop />
                                              <CustomCursor />
                                              <AppLayout>
                                                <Routes>
                                                  {/* 1. Master Box / Co-Pilot / AI Assistant */}
                                                  <Route path="/" element={<AppCoPilotPage />} />
                                                  <Route path="/master-box" element={<AppCoPilotPage />} />
                                                  <Route path="/master-box/*" element={<AppCoPilotPage />} />
                                                  <Route path="/chat" element={<AppCoPilotPage />} />
                                                  <Route path="/ai-chat" element={<AppCoPilotPage />} />
                                                  <Route path="/copilot" element={<AppCoPilotPage />} />
                                                  <Route path="/copilot/*" element={<AppCoPilotPage />} />
                                                  <Route path="/app/copilot" element={<AppCoPilotPage />} />
                                                  <Route path="/dashboard" element={<DashboardPage />} />
                                                  <Route path="/command-center" element={<DashboardPage />} />
                                                  <Route path="/app" element={<AppCoPilotPage />} />
                                                  <Route path="/app/dashboard" element={<DashboardPage />} />

                                                  {/* 2. Agents / Freelance Bidders */}
                                                  <Route path="/ai-agents" element={<AppAiAgentsPage />} />
                                                  <Route path="/ai-agents/*" element={<AppAiAgentsPage />} />
                                                  <Route path="/agents" element={<AppAiAgentsPage />} />
                                                  <Route path="/agents/*" element={<AppAiAgentsPage />} />
                                                  <Route path="/app/ai-agents" element={<AppAiAgentsPage />} />
                                                  <Route path="/app/ai-agents/*" element={<AppAiAgentsPage />} />
                                                  <Route path="/app/agents" element={<AppAiAgentsPage />} />
                                                  <Route path="/app/agents/*" element={<AppAiAgentsPage />} />

                                                  {/* 3. Deals CRM & Accounts */}
                                                  <Route path="/crm" element={<AppCrmPage />} />
                                                  <Route path="/crm/*" element={<AppCrmPage />} />
                                                  <Route path="/app/crm" element={<AppCrmPage />} />
                                                  <Route path="/app/crm/*" element={<AppCrmPage />} />
                                                  <Route path="/companies" element={<AppCompaniesPage />} />
                                                  <Route path="/app/companies" element={<AppCompaniesPage />} />
                                                  <Route path="/accounts" element={<AppCompaniesPage />} />

                                                  {/* 4. 8D Lead Finder & Prospects */}
                                                  <Route path="/lead-finder" element={<AppLeadFinderPage />} />
                                                  <Route path="/lead-finder/*" element={<AppLeadFinderPage />} />
                                                  <Route path="/app/lead-finder" element={<AppLeadFinderPage />} />
                                                  <Route path="/app/lead-finder/*" element={<AppLeadFinderPage />} />
                                                  <Route path="/leads" element={<AppLeadsPage />} />
                                                  <Route path="/app/leads" element={<AppLeadsPage />} />
                                                  <Route path="/prospects" element={<AppLeadsPage />} />

                                                  {/* 5. Master Multi-Channel Inbox & Mail */}
                                                  <Route path="/inbox" element={<AppInboxPage />} />
                                                  <Route path="/inbox/*" element={<AppInboxPage />} />
                                                  <Route path="/app/inbox" element={<AppInboxPage />} />
                                                  <Route path="/app/inbox/*" element={<AppInboxPage />} />
                                                  <Route path="/mail" element={<AppInboxPage />} />
                                                  <Route path="/mail/*" element={<AppInboxPage />} />
                                                  <Route path="/app/mail" element={<AppInboxPage />} />
                                                  <Route path="/app/mail/*" element={<AppInboxPage />} />
                                                  <Route path="/messages" element={<AppInboxPage />} />
                                                  <Route path="/messages/*" element={<AppInboxPage />} />

                                                  {/* 6. Cold Email Outreach & Deliverability */}
                                                  <Route path="/email" element={<AppColdEmailPage />} />
                                                  <Route path="/email/*" element={<AppColdEmailPage />} />
                                                  <Route path="/app/email" element={<AppColdEmailPage />} />
                                                  <Route path="/app/email/*" element={<AppColdEmailPage />} />
                                                  <Route path="/cold-email" element={<AppColdEmailPage />} />
                                                  <Route path="/cold-email/*" element={<AppColdEmailPage />} />
                                                  <Route path="/app/cold-email" element={<AppColdEmailPage />} />
                                                  <Route path="/deliverability" element={<AppDeliverabilityPage />} />
                                                  <Route path="/app/deliverability" element={<AppDeliverabilityPage />} />
                                                  <Route path="/campaigns" element={<AppCampaignsPage />} />
                                                  <Route path="/campaigns/*" element={<AppCampaignsPage />} />
                                                  <Route path="/app/campaigns" element={<AppCampaignsPage />} />
                                                  <Route path="/app/campaigns/*" element={<AppCampaignsPage />} />
                                                  <Route path="/platform/campaigns" element={<CampaignPage />} />

                                                  {/* 7. LinkedIn Safe Cloud Automation */}
                                                  <Route path="/linkedin" element={<LinkedInPage />} />
                                                  <Route path="/linkedin/*" element={<LinkedInPage />} />
                                                  <Route path="/app/linkedin" element={<LinkedInPage />} />
                                                  <Route path="/app/linkedin/*" element={<LinkedInPage />} />

                                                  {/* 8. Calls & Voice AI SDR */}
                                                  <Route path="/voice-ai" element={<AppVoiceAiPage />} />
                                                  <Route path="/voice-ai/*" element={<AppVoiceAiPage />} />
                                                  <Route path="/calls" element={<AppVoiceAiPage />} />
                                                  <Route path="/calls/*" element={<AppVoiceAiPage />} />
                                                  <Route path="/app/voice-ai" element={<AppVoiceAiPage />} />
                                                  <Route path="/app/voice-ai/*" element={<AppVoiceAiPage />} />
                                                  <Route path="/app/calls" element={<AppVoiceAiPage />} />
                                                  <Route path="/app/calls/*" element={<AppVoiceAiPage />} />

                                                  {/* 9. Upwork Prospecting & Bidding Studio */}
                                                  <Route path="/upwork" element={<AppUpworkPage />} />
                                                  <Route path="/upwork/*" element={<AppUpworkPage />} />
                                                  <Route path="/app/upwork" element={<AppUpworkPage />} />
                                                  <Route path="/app/upwork/*" element={<AppUpworkPage />} />

                                                  {/* 10. Visual Workflows & DAG Flows */}
                                                  <Route path="/flow-builder" element={<AppFlowBuilderPage />} />
                                                  <Route path="/flow-builder/*" element={<AppFlowBuilderPage />} />
                                                  <Route path="/workflows" element={<AppFlowBuilderPage />} />
                                                  <Route path="/workflows/*" element={<AppFlowBuilderPage />} />
                                                  <Route path="/app/flow-builder" element={<AppFlowBuilderPage />} />
                                                  <Route path="/app/flow-builder/*" element={<AppFlowBuilderPage />} />
                                                  <Route path="/app/workflows" element={<AppFlowBuilderPage />} />
                                                  <Route path="/app/workflows/*" element={<AppFlowBuilderPage />} />

                                                  {/* 11. Revenue Analytics & Intelligence */}
                                                  <Route path="/analytics" element={<AppAnalyticsPage />} />
                                                  <Route path="/analytics/*" element={<AppAnalyticsPage />} />
                                                  <Route path="/app/analytics" element={<AppAnalyticsPage />} />
                                                  <Route path="/platform/analytics" element={<AnalyticsPage />} />

                                                  {/* 12. Central Admin Panel */}
                                                  <Route path="/admin" element={<AppAdminPage />} />
                                                  <Route path="/admin/*" element={<AppAdminPage />} />
                                                  <Route path="/app/admin" element={<AppAdminPage />} />
                                                  <Route path="/app/admin/*" element={<AppAdminPage />} />

                                                  {/* 13. Workspace Settings & Governance */}
                                                  <Route path="/settings" element={<AppSettingsPage />} />
                                                  <Route path="/settings/*" element={<AppSettingsPage />} />
                                                  <Route path="/app/settings" element={<AppSettingsPage />} />
                                                  <Route path="/app/settings/*" element={<AppSettingsPage />} />

                                                  {/* Integrations & API */}
                                                  <Route path="/integrations" element={<IntegrationsPage />} />
                                                  <Route path="/app/integrations" element={<IntegrationsPage />} />
                                                  <Route path="/api" element={<ApiPage />} />
                                                  <Route path="/app/api" element={<ApiPage />} />

                                                  {/* Authentication */}
                                                  <Route path="/login" element={<LoginPage />} />
                                                  <Route path="/signup" element={<SignupPage />} />

                                                  {/* Fallback */}
                                                  <Route path="*" element={<NotFoundPage />} />
                                                </Routes>
                                              </AppLayout>
                                            </GlobalTabsProvider>
                                          </CoPilotProvider>
                                        </AnalyticsProvider>
                                      </AgentsProvider>
                                    </WorkflowsProvider>
                                  </UpworkProvider>
                                </MasterInboxProvider>
                              </LinkedInProvider>
                            </VoiceAiProvider>
                          </EmailProvider>
                        </LeadSearchProvider>
                      </LeadsManagementProvider>
                    </CompaniesProvider>
                  </CrmProvider>
                </SettingsProvider>
              </BrowserRouter>
            </CursorProvider>
          </AdminProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
