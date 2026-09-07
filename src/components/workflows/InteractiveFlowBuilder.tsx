import React, { useState } from 'react';
import { 
  Workflow, 
  Play, 
  RotateCcw, 
  Search, 
  Sparkles, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Check, 
  ArrowRight, 
  Clock, 
  Layers, 
  Zap, 
  CheckCircle2,
  Plus,
  Trash2,
  Edit3,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Save,
  ArrowLeft,
  GitBranch,
  Database,
  FileCode,
  Settings,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useWorkflows, WorkflowNode } from '../../context/WorkflowsContext';
import { useToast } from '../../context/ToastContext';

export interface InteractiveFlowBuilderProps {
  onOpenAddNodeModal: () => void;
}

export const InteractiveFlowBuilder: React.FC<InteractiveFlowBuilderProps> = ({
  onOpenAddNodeModal,
}) => {
  const { 
    activeWorkflow, 
    setActiveTab, 
    updateWorkflowNode, 
    removeWorkflowNode, 
    runWorkflowNow 
  } = useWorkflows();

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(activeWorkflow?.nodes[0]?.id || null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStepIndex, setSimStepIndex] = useState(-1);
  const { success } = useToast();

  if (!activeWorkflow) {
    return (
      <div className="p-12 text-center rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#161616] text-slate-400 text-xs space-y-3 font-sans">
        <Workflow className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
        <div className="text-sm font-bold text-slate-700 dark:text-slate-300">No Workflow Selected</div>
        <Button variant="primary" size="sm" onClick={() => setActiveTab('visual-flows')}>
          Back to Visual Flows
        </Button>
      </div>
    );
  }

  const selectedNode = activeWorkflow.nodes.find(n => n.id === selectedNodeId) || activeWorkflow.nodes[0];

  const getNodeIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case 'lead finder':
      case 'prospecting':
        return Search;
      case 'lead data':
      case 'database':
        return Database;
      case 'cold email':
        return Mail;
      case 'linkedin api':
      case 'linkedin':
        return Linkedin;
      case 'voice ai':
      case 'voice ai sdr':
        return PhoneCall;
      case 'deals crm':
      case 'crm':
        return Building2;
      case 'logic':
      case 'condition':
        return GitBranch;
      default:
        return Zap;
    }
  };

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStepIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < activeWorkflow.nodes.length) {
        setSimStepIndex(current);
        setSelectedNodeId(activeWorkflow.nodes[current].id);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setSimStepIndex(activeWorkflow.nodes.length);
          success(`Simulation complete! All ${activeWorkflow.nodes.length} nodes executed successfully.`, 'Simulation Passed');
        }, 500);
      }
    }, 650);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimStepIndex(-1);
    setSelectedNodeId(activeWorkflow.nodes[0]?.id || null);
  };

  return (
    <div className="space-y-4 font-sans h-[calc(100vh-14rem)] flex flex-col min-w-0">
      
      {/* Top Toolbar */}
      <div className="p-4 bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
        
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('visual-flows')}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            All Flows
          </Button>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                {activeWorkflow.name}
              </span>
              <Badge variant="emerald" size="sm">
                {activeWorkflow.status}
              </Badge>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {activeWorkflow.nodes.length} DAG Nodes • Trigger: {activeWorkflow.triggerType}
            </div>
          </div>
        </div>

        {/* Right: Simulation, Zoom & Actions */}
        <div className="flex items-center gap-2">
          
          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs">
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.max(prev - 10, 60))}
              className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[10px] font-bold text-slate-600 dark:text-slate-300">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.min(prev + 10, 140))}
              className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Test Run Simulation */}
          {simStepIndex === activeWorkflow.nodes.length ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetSimulation}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Replay Flow
            </Button>
          ) : (
            <Button
              variant={isSimulating ? "outline" : "secondary"}
              size="sm"
              onClick={handleRunSimulation}
              disabled={isSimulating}
              leftIcon={<Play className={`w-3.5 h-3.5 ${isSimulating ? 'text-blue-500 animate-pulse' : 'fill-current'}`} />}
            >
              {isSimulating ? `Running Step ${simStepIndex + 1}...` : 'Test Flow'}
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenAddNodeModal}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Node
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              runWorkflowNow(activeWorkflow.id);
            }}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save & Run
          </Button>

        </div>

      </div>

      {/* Main Canvas + Right Inspector Area */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 overflow-hidden">
        
        {/* Left/Center Visual DAG Canvas */}
        <div className="flex-1 bg-slate-50/70 dark:bg-[#080d1a] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs p-6 overflow-auto relative min-h-[360px]">
          
          {/* Canvas Dot Matrix Background */}
          <div 
            className="w-full h-full transition-transform origin-top-left"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            <div className="space-y-6 max-w-4xl mx-auto">
              
              {/* Sequential Flow Nodes Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activeWorkflow.nodes.map((node, idx) => {
                  const Icon = getNodeIcon(node.channel);
                  const isSelected = selectedNodeId === node.id;
                  const isSimActive = simStepIndex === idx;
                  const isStepCompleted = simStepIndex > idx || simStepIndex === activeWorkflow.nodes.length;

                  return (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-5 rounded-3xl transition-all cursor-pointer space-y-3 relative border ${
                        isSelected || isSimActive
                          ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-600/30 scale-[1.02]'
                          : isStepCompleted
                          ? 'bg-white dark:bg-[#161616] border-emerald-500/40 text-slate-900 dark:text-white shadow-xs'
                          : 'bg-white dark:bg-[#161616] border-slate-200/80 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 hover:border-emerald-400'
                      }`}
                    >
                      {/* Node Header */}
                      <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 rounded-2xl flex items-center justify-center font-bold ${
                          isSelected || isSimActive
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[10px] font-mono font-extrabold ${
                          isSelected || isSimActive ? 'text-white/80' : 'text-slate-400'
                        }`}>
                          STEP {idx + 1}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <div className="font-extrabold text-sm truncate">{node.title}</div>
                        <div className={`text-[11px] truncate mt-0.5 ${
                          isSelected || isSimActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {node.subtitle}
                        </div>
                      </div>

                      {/* Channel Tag */}
                      <div className="pt-2 border-t border-white/20 dark:border-white/10 flex items-center justify-between text-[10px] font-mono">
                        <span className={isSelected || isSimActive ? 'text-white/90' : 'text-emerald-600 dark:text-emerald-400 font-bold'}>
                          {node.channel}
                        </span>
                        {isStepCompleted && (
                          <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Done</span>
                          </span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

        {/* Right Inspector & Node Settings Panel */}
        {selectedNode && (
          <div className="w-full lg:w-80 shrink-0 bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs p-5 flex flex-col justify-between overflow-y-auto space-y-4 text-xs font-sans">
            
            <div className="space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-extrabold text-slate-950 dark:text-white uppercase tracking-wider text-[11px]">
                    Node Inspector
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeWorkflowNode(activeWorkflow.id, selectedNode.id)}
                  className="text-slate-400 hover:text-rose-500 cursor-pointer"
                  title="Delete node from workflow"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Node Title & Description */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Node Title
                  </label>
                  <input
                    type="text"
                    value={selectedNode.title}
                    onChange={(e) => updateWorkflowNode(activeWorkflow.id, selectedNode.id, { title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Execution Subtitle
                  </label>
                  <input
                    type="text"
                    value={selectedNode.subtitle}
                    onChange={(e) => updateWorkflowNode(activeWorkflow.id, selectedNode.id, { subtitle: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                  />
                </div>

                <div className="p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20 dark:border-emerald-800/40 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    Channel / Integration
                  </span>
                  <div className="font-extrabold text-slate-900 dark:text-white">
                    {selectedNode.channel}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Node JSON Config Payload
                  </label>
                  <pre className="p-3 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-[10px] overflow-x-auto leading-relaxed">
                    {JSON.stringify(selectedNode.config, null, 2)}
                  </pre>
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#202020] text-center text-[10px] text-slate-400 font-mono">
              Idempotent Node • Real-time DB Sync
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
