"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  Loader2, 
  Terminal, 
  Globe, 
  Cpu, 
  Mail, 
  Check, 
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface WorkflowData {
  id: string;
  name: string;
  dagJson: string;
  isActive: boolean;
  logs: {
    id: string;
    status: string;
    executedAt: string;
  }[];
}

const mockWorkflow: WorkflowData = {
  id: "mock-sync",
  name: "Global Node Cache Sync",
  dagJson: JSON.stringify({
    nodes: [
      { id: "trigger", type: "webhook", label: "Webhook Trigger", description: "GET /v1/deploy-hook" },
      { id: "sync-node", type: "http", label: "Edge Sync Node", description: "POST /cache/invalidate" },
      { id: "notify", type: "email", label: "Email Alert", description: "devops@zeoraz.com" }
    ],
    connections: [
      { source: "trigger", target: "sync-node" },
      { source: "sync-node", target: "notify" }
    ]
  }),
  isActive: true,
  logs: []
};

export const ProductTeaser = () => {
  const [activeTab, setActiveTab] = useState<"analytics" | "automations" | "access">("analytics");
  const [workflows, setWorkflows] = useState<WorkflowData[]>([]);
  const [metrics, setMetrics] = useState({
    totalRequests: "12,425",
    successRate: "99.8%",
    avgLatency: "4.82ms",
  });

  // Visual Task Orchestration States
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowData | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executingNodeId, setExecutingNodeId] = useState<string | null>(null);
  const [nodeStatuses, setNodeStatuses] = useState<Record<string, "idle" | "running" | "success" | "failed">>({});
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch("/api/workflows");
        if (response.ok) {
          const data = await response.json();
          if (data.workflows && data.workflows.length > 0) {
            setWorkflows(data.workflows);
            if (!selectedWorkflow) {
              setSelectedWorkflow(data.workflows[0]);
            }
          } else {
            setWorkflows([mockWorkflow]);
            if (!selectedWorkflow) {
              setSelectedWorkflow(mockWorkflow);
            }
          }
          if (data.metrics) {
            setMetrics({
              totalRequests: Number(data.metrics.totalRequests).toLocaleString(),
              successRate: `${data.metrics.successRate}%`,
              avgLatency: data.metrics.avgLatency,
            });
          }
        }
      } catch (error) {
        console.error("Failed fetching live workflows dashboard data:", error);
      }
    };

    fetchSessionData();
    const interval = setInterval(fetchSessionData, 8000);
    return () => clearInterval(interval);
  }, [selectedWorkflow]);

  // Scroll terminal logs to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [executionLogs]);

  const getWorkflowNodes = (flow: WorkflowData | null) => {
    if (!flow) return [];
    try {
      const parsed = JSON.parse(flow.dagJson);
      return parsed.nodes || [];
    } catch {
      return [];
    }
  };

  const triggerWorkflowPipeline = async () => {
    if (isExecuting || !selectedWorkflow) return;
    setIsExecuting(true);
    setExecutionLogs([
      "[SYSTEM] Initializing task orchestrator pool...",
      "[SYSTEM] Routing request to optimal V8 worker cluster (AP-SOUTH-1)...",
      "[SYSTEM] Establishing secure context sandbox..."
    ]);
    
    const nodes = getWorkflowNodes(selectedWorkflow);
    const initialStatuses: Record<string, "idle" | "running" | "success" | "failed"> = {};
    nodes.forEach((node: any) => {
      initialStatuses[node.id] = "idle";
    });
    setNodeStatuses(initialStatuses);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      setExecutingNodeId(node.id);
      setNodeStatuses(prev => ({ ...prev, [node.id]: "running" }));
      setExecutionLogs(prev => [...prev, `[RUNNING] Active Node: "${node.label || node.id}"`]);
      
      // Simulating realistic pipeline delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setNodeStatuses(prev => ({ ...prev, [node.id]: "success" }));
      setExecutionLogs(prev => [
        ...prev, 
        `[SUCCESS] Node "${node.label || node.id}" output status: 200 OK.`,
        `[METRIC] Node latency: ${(Math.random() * 3 + 1).toFixed(2)}ms.`
      ]);
    }
    
    setExecutingNodeId(null);
    setIsExecuting(false);
    setExecutionLogs(prev => [...prev, "[SYSTEM] Pipeline executed completely. Worker isolates shutdown clean."]);
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "webhook":
      case "trigger":
        return Globe;
      case "http":
      case "sync-node":
        return Cpu;
      case "email":
      case "notify":
        return Mail;
      default:
        return Zap;
    }
  };

  const getNodeStatusStyle = (status: "idle" | "running" | "success" | "failed") => {
    switch (status) {
      case "running":
        return "border-violet-primary/80 bg-slate-950 glow-violet shadow-violet-primary/20 animate-pulse";
      case "success":
        return "border-emerald-500/80 bg-emerald-950/20 glow-emerald shadow-emerald-500/20";
      case "failed":
        return "border-blue-500/80 bg-blue-950/20 glow-rose shadow-blue-500/20";
      default:
        return "border-slate-800 bg-slate-900/40 hover:border-slate-700";
    }
  };

  const tabs = [
    { id: "analytics", label: "Analytics Dashboard", icon: BarChart3 },
    { id: "automations", label: "Workflows", icon: Zap },
    { id: "access", label: "Access Controls", icon: Users },
  ] as const;

  const currentNodes = getWorkflowNodes(selectedWorkflow);

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-grid-pattern">
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-cyan-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-violet-primary/5 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent"
            >
              Interactive Product Control
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed"
            >
              Get a sneak peek at the upcoming Zeoraz console. Real-time metrics, node latency trackers, 
              and intuitive workflow models.
            </motion.p>
          </div>

          {/* Desktop Tab Selector */}
          <div className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800 backdrop-blur-sm self-start">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-violet-primary to-cyan-primary rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dashboard Mockup Display */}
        <div className="relative rounded-3xl glassmorphism p-3 sm:p-6 shadow-2xl shadow-black/80 glow-cyan">
          <div className="relative min-h-[400px] rounded-2xl bg-slate-950/80 border border-slate-900 p-6 overflow-hidden">
            
            {/* Top header navigation inside mockup */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-900 pb-6 mb-8 gap-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-sm font-semibold text-slate-300">Live Workspace Status</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  AP-SOUTH-1
                </span>
                <span className="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  v1.4.9-patch3
                </span>
              </div>
            </div>

            {/* Simulated Contents with AnimatePresence */}
            <AnimatePresence mode="wait">
              {activeTab === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {/* Left Column Stats */}
                  <div className="md:col-span-1 space-y-6">
                    <div className="glassmorphism-card p-6 rounded-2xl">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Response Time</p>
                      <h4 className="text-3xl font-extrabold text-white">{metrics.avgLatency}</h4>
                      <p className="text-xs text-emerald-400 mt-2 font-medium">↓ 1.2% versus yesterday</p>
                    </div>
                    <div className="glassmorphism-card p-6 rounded-2xl">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">API Requests</p>
                      <h4 className="text-3xl font-extrabold text-white">{metrics.totalRequests}</h4>
                      <p className="text-xs text-emerald-400 mt-2 font-medium">↑ {metrics.successRate} Success</p>
                    </div>
                  </div>

                  {/* Visual Chart Mockup */}
                  <div className="md:col-span-2 glassmorphism-card p-6 rounded-2xl flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-base font-bold text-slate-200">Load Factor Profile</h4>
                      <span className="text-xs font-bold text-cyan-primary">Real-time</span>
                    </div>
                    {/* Simulated chart bars */}
                    <div className="flex items-end justify-between h-[150px] gap-2 pt-4">
                      {[35, 60, 45, 75, 90, 65, 80, 50, 70, 85, 95, 100, 80, 60].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${val}%` }}
                            transition={{ duration: 0.8, delay: idx * 0.03 }}
                            className={`w-full rounded-t-sm ${
                              idx % 2 === 0 ? "bg-violet-primary/70" : "bg-cyan-primary/70"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-4 border-t border-slate-900 pt-4">
                      <span>00:00</span>
                      <span>06:00</span>
                      <span>12:00</span>
                      <span>18:00</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "automations" && (
                <motion.div
                  key="automations"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  {/* Left Column - Workflow selection list */}
                  <div className="lg:col-span-1 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Available Workflows</h4>
                    {workflows.map((flow) => (
                      <div
                        key={flow.id}
                        onClick={() => setSelectedWorkflow(flow)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                          selectedWorkflow?.id === flow.id
                            ? "bg-violet-primary/10 border-violet-primary/50 text-white"
                            : "bg-slate-900/30 border-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`h-4 w-4 ${selectedWorkflow?.id === flow.id ? "text-cyan-primary" : "text-slate-500"}`} />
                          <span className="text-sm font-semibold truncate max-w-[150px]">{flow.name}</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950 border border-slate-900">
                          {flow.isActive ? "Active" : "Idle"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Right Column - Visual DAG Executor */}
                  <div className="lg:col-span-2 flex flex-col justify-between rounded-2xl bg-slate-900/20 border border-slate-850 p-6">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-sm font-bold text-white">Visual DAG Orchestrator</h4>
                          <p className="text-[11px] text-slate-500">Sequentially trace node workloads on the grid</p>
                        </div>
                        <Button 
                          onClick={triggerWorkflowPipeline} 
                          disabled={isExecuting}
                          className="flex items-center gap-1.5 px-4 py-2 text-xs"
                        >
                          {isExecuting ? (
                            <>
                              <Loader2 className="h-3 w-3 animate-spin" />
                              <span>Running...</span>
                            </>
                          ) : (
                            <>
                              <Play className="h-3 w-3 fill-current" />
                              <span>Trigger Pipeline</span>
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Visual Task Cards Flow */}
                      <div className="relative flex flex-col md:flex-row items-center justify-around gap-6 md:gap-2 bg-slate-950/60 p-6 rounded-2xl border border-slate-900 mb-6 overflow-x-auto min-h-[160px]">
                        {currentNodes.map((node: any, idx: number) => {
                          const NodeIcon = getNodeIcon(node.type || "");
                          const status = nodeStatuses[node.id] || "idle";
                          return (
                            <React.Fragment key={node.id}>
                              {/* Modern Task Card */}
                              <div
                                className={`relative flex flex-col items-center justify-between p-4 rounded-xl border text-center transition-all duration-500 w-[150px] min-h-[100px] ${getNodeStatusStyle(status)}`}
                              >
                                {/* Glowing status dot */}
                                <div className="absolute top-2 right-2 flex items-center justify-center">
                                  {status === "running" && (
                                    <span className="h-2 w-2 rounded-full bg-violet-primary animate-ping" />
                                  )}
                                  {status === "success" && (
                                    <Check className="h-3 w-3 text-emerald-400" />
                                  )}
                                  {status === "failed" && (
                                    <AlertCircle className="h-3 w-3 text-blue-400" />
                                  )}
                                  {status === "idle" && (
                                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                                  )}
                                </div>

                                <div className={`p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 mb-2 ${
                                  status === "running" ? "text-violet-primary border-violet-primary/20" : ""
                                }`}>
                                  <NodeIcon className="h-4 w-4" />
                                </div>
                                <div className="w-full">
                                  <div className="text-xs font-bold text-white truncate">{node.label || node.id}</div>
                                  <div className="text-[9px] text-slate-500 truncate mt-0.5">{node.description || node.type}</div>
                                </div>
                              </div>

                              {/* Arrow connector between cards */}
                              {idx < currentNodes.length - 1 && (
                                <div className="flex items-center justify-center transform rotate-90 md:rotate-0 my-1 md:my-0">
                                  <svg
                                    className={`h-6 w-6 transition-all duration-500 ${
                                      status === "success" 
                                        ? "text-emerald-500" 
                                        : status === "running"
                                          ? "text-violet-primary animate-pulse"
                                          : "text-slate-700"
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                  </svg>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>

                    {/* Simulation logs drawer */}
                    <div className="rounded-xl border border-slate-850 bg-slate-950 p-4 font-mono text-[10px]">
                      <div className="flex items-center gap-2 text-slate-400 border-b border-slate-900 pb-2 mb-2 font-bold uppercase tracking-wider">
                        <Terminal className="h-3 w-3" />
                        <span>Execution Pipeline Terminal Logs</span>
                      </div>
                      <div className="space-y-1 h-[70px] overflow-y-auto custom-scrollbar select-text">
                        {executionLogs.length > 0 ? (
                          executionLogs.map((log, idx) => (
                            <div key={idx} className={
                              log.startsWith("[SYSTEM]") ? "text-slate-500" :
                              log.startsWith("[SUCCESS]") ? "text-emerald-400" :
                              log.startsWith("[METRIC]") ? "text-cyan-400" : "text-violet-400"
                            }>
                              {log}
                            </div>
                          ))
                        ) : (
                          <div className="text-slate-650">Ready to trace. Click "Trigger Pipeline" to launch.</div>
                        )}
                        <div ref={terminalEndRef} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "access" && (
                <motion.div
                  key="access"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="glassmorphism-card p-6 rounded-2xl">
                    <h4 className="text-base font-bold text-white mb-4">Role Definitions</h4>
                    <div className="space-y-3">
                      {["Administrator", "Developer API Key", "Read-Only Viewer"].map((role, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/30 border border-slate-800">
                          <span className="text-sm font-semibold text-slate-300">{role}</span>
                          <span className="text-xs font-semibold text-cyan-primary">Verified</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glassmorphism-card p-6 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white mb-2">IAM & Multi-factor Policies</h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        Authorize, rotate keys, and secure sensitive webhook integrations through biometric tokens.
                      </p>
                    </div>
                    <Button variant="secondary" className="w-full flex items-center justify-center gap-2 py-2">
                      Configure Policies <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
