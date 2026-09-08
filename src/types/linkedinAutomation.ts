export type LinkedInTriggerType =
  | 'Connection Accepted'
  | 'Profile Viewed'
  | 'Profile Visit Detected'
  | 'Connection Request Sent'
  | 'Connection Request Not Accepted'
  | 'No Reply After 1 Day'
  | 'No Reply After 3 Days'
  | 'No Reply After 7 Days'
  | 'Message Received'
  | 'Message Not Replied'
  | 'Post Engagement Detected'
  | 'Lead Added to Campaign'
  | 'Lead Removed from Campaign'
  | 'Campaign Step Completed';

export interface LinkedInTriggerConfig {
  days?: number;
  hours?: number;
  campaignId?: string;
  campaignName?: string;
  postEngagementType?: 'Like' | 'Comment' | 'Any';
}

export type LinkedInConditionField =
  | 'connection_degree'
  | 'profile_type'
  | 'industry'
  | 'company_size'
  | 'location'
  | 'campaign'
  | 'lead_status'
  | 'has_email'
  | 'has_phone'
  | 'profile_viewed'
  | 'message_received'
  | 'last_activity'
  | 'custom';

export type LinkedInConditionOperator =
  | 'equals'
  | 'not_equals'
  | 'contains'
  | 'is_true'
  | 'is_false'
  | 'greater_than'
  | 'less_than';

export interface LinkedInRuleCondition {
  id: string;
  field: LinkedInConditionField;
  operator: LinkedInConditionOperator;
  value: string;
}

export type LinkedInActionType =
  | 'view_profile'
  | 'visit_profile'
  | 'send_connection_request'
  | 'send_connection_note'
  | 'send_message'
  | 'follow_profile'
  | 'like_post'
  | 'comment_post'
  | 'add_to_campaign'
  | 'remove_from_campaign'
  | 'add_tag'
  | 'change_lead_status'
  | 'assign_lead'
  | 'wait_delay'
  | 'stop_automation';

export interface LinkedInRuleAction {
  id: string;
  type: LinkedInActionType;
  delay?: number;
  delayUnit?: 'Minutes' | 'Hours' | 'Days';
  message?: string;
  connectionNote?: string;
  campaignName?: string;
  leadStatus?: string;
  tag?: string;
  comment?: string;
  assignee?: string;
}

export interface LinkedInAutomationRuleEntity {
  id: string;
  name: string;
  trigger: string;
  triggerConfig?: LinkedInTriggerConfig;
  action: string;
  stepsCount: number;
  steps: string[];
  delayHours: number;
  condition: string;
  conditions?: LinkedInRuleCondition[];
  conditionLogic?: 'AND' | 'OR';
  actionsList?: LinkedInRuleAction[];
  status: 'Active' | 'Paused' | 'Draft';
  runsCount: number;
  successRate: number;
  lastRun: string;
  created?: string;
}

export const AVAILABLE_TRIGGERS: { id: LinkedInTriggerType; label: string; description: string; category: string }[] = [
  { id: 'Connection Accepted', label: 'Connection Accepted', description: 'Triggered immediately when a connection request is accepted.', category: 'Connections' },
  { id: 'Profile Viewed', label: 'Profile Viewed', description: 'When a target prospect visits your LinkedIn profile.', category: 'Views' },
  { id: 'Profile Visit Detected', label: 'Profile Visit Detected', description: 'When system stealth view detects an active prospect profile.', category: 'Views' },
  { id: 'Connection Request Sent', label: 'Connection Request Sent', description: 'Dispatches when an outreach invite is sent.', category: 'Connections' },
  { id: 'Connection Request Not Accepted', label: 'Connection Request Not Accepted', description: 'Timeout check when invite remains unaccepted.', category: 'Connections' },
  { id: 'No Reply After 1 Day', label: 'No Reply After 1 Day', description: '24-hour timeout after last message with no response.', category: 'Timeout' },
  { id: 'No Reply After 3 Days', label: 'No Reply After 3 Days', description: '72-hour humanized follow-up timeout window.', category: 'Timeout' },
  { id: 'No Reply After 7 Days', label: 'No Reply After 7 Days', description: '1-week long-cycle nurture trigger.', category: 'Timeout' },
  { id: 'Message Received', label: 'Message Received', description: 'When prospect sends any direct message or reply.', category: 'Messaging' },
  { id: 'Message Not Replied', label: 'Message Not Replied', description: 'When inbound prospect query has not been answered.', category: 'Messaging' },
  { id: 'Post Engagement Detected', label: 'Post Engagement Detected', description: 'When prospect likes or comments on your post.', category: 'Engagement' },
  { id: 'Lead Added to Campaign', label: 'Lead Added to Campaign', description: 'When prospect is enrolled into a campaign sequence.', category: 'Campaign' },
  { id: 'Lead Removed from Campaign', label: 'Lead Removed from Campaign', description: 'When prospect is unenrolled or finished.', category: 'Campaign' },
  { id: 'Campaign Step Completed', label: 'Campaign Step Completed', description: 'When a previous campaign stage executes.', category: 'Campaign' },
];

export const AVAILABLE_CONDITION_FIELDS: { id: LinkedInConditionField; label: string; options?: string[] }[] = [
  { id: 'connection_degree', label: 'Connection Degree', options: ['1st', '2nd', '3rd', 'Out of Network'] },
  { id: 'profile_type', label: 'Profile Type / Role', options: ['Founder', 'CEO', 'VP', 'Director', 'Manager', 'Other'] },
  { id: 'industry', label: 'Industry', options: ['Technology', 'SaaS', 'Finance', 'Healthcare', 'Consulting', 'Real Estate', 'Marketing'] },
  { id: 'company_size', label: 'Company Size', options: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'] },
  { id: 'location', label: 'Location' },
  { id: 'campaign', label: 'Campaign' },
  { id: 'lead_status', label: 'Lead Status', options: ['Cold', 'Contacted', 'In Outreach', 'Connected', 'Replied', 'Interested', 'Meeting Booked', 'Not Interested'] },
  { id: 'has_email', label: 'Has Verified Email', options: ['Yes', 'No'] },
  { id: 'has_phone', label: 'Has Direct Phone', options: ['Yes', 'No'] },
  { id: 'profile_viewed', label: 'Profile Viewed Back', options: ['Yes', 'No'] },
  { id: 'message_received', label: 'Message Received', options: ['Yes', 'No'] },
  { id: 'last_activity', label: 'Last Activity Time', options: ['Within 24 Hours', 'Within 3 Days', 'Within 7 Days', 'Older than 14 Days'] },
  { id: 'custom', label: 'Custom Property' },
];

export const AVAILABLE_ACTIONS: { id: LinkedInActionType; label: string; description: string; category: 'Communication' | 'Profile' | 'Campaign' | 'Control' }[] = [
  { id: 'visit_profile', label: 'Visit Profile', description: 'View prospect profile with stealth residential IP.', category: 'Profile' },
  { id: 'view_profile', label: 'View Profile Back', description: 'Acknowledge visitor profile silently.', category: 'Profile' },
  { id: 'follow_profile', label: 'Follow Profile', description: 'Follow prospect publicly on LinkedIn.', category: 'Profile' },
  { id: 'send_connection_request', label: 'Send Connection Request', description: 'Send invite without a custom note.', category: 'Communication' },
  { id: 'send_connection_note', label: 'Send Connection Note', description: 'Send personalized 300-char invite note.', category: 'Communication' },
  { id: 'send_message', label: 'Send Message', description: 'Deliver personalized LinkedIn direct message.', category: 'Communication' },
  { id: 'like_post', label: 'Like Recent Post', description: 'Engage with prospect’s latest published post.', category: 'Profile' },
  { id: 'comment_post', label: 'Comment on Post', description: 'Leave automated insightful engagement comment.', category: 'Profile' },
  { id: 'wait_delay', label: 'Wait / Delay', description: 'Paced delay before executing subsequent steps.', category: 'Control' },
  { id: 'change_lead_status', label: 'Change Lead Status', description: 'Update CRM lifecycle stage for prospect.', category: 'Campaign' },
  { id: 'add_tag', label: 'Add Tag', description: 'Apply segment or organizational tag.', category: 'Campaign' },
  { id: 'add_to_campaign', label: 'Add to Campaign', description: 'Enroll prospect into another sequence.', category: 'Campaign' },
  { id: 'remove_from_campaign', label: 'Remove from Campaign', description: 'Eject lead from current sequence.', category: 'Campaign' },
  { id: 'assign_lead', label: 'Assign Lead', description: 'Assign prospect ownership to sales rep.', category: 'Campaign' },
  { id: 'stop_automation', label: 'Stop Automation', description: 'Halt all subsequent automated actions.', category: 'Control' },
];

export const MESSAGE_VARIABLES = [
  { tag: '{{first_name}}', label: 'First Name', preview: 'Sarah' },
  { tag: '{{last_name}}', label: 'Last Name', preview: 'Jenkins' },
  { tag: '{{company}}', label: 'Company', preview: 'CloudScale AI' },
  { tag: '{{job_title}}', label: 'Job Title', preview: 'VP of Growth' },
  { tag: '{{industry}}', label: 'Industry', preview: 'Enterprise SaaS' },
];
