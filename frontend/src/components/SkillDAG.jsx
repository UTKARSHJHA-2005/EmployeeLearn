import ReactFlow, { Background, Controls, MarkerType, Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import { Layers, Zap, Info, Map as MapIcon, ChevronRight, MoreHorizontal, Maximize2 } from "lucide-react";

// Professional Skill Node — clean, modern card design
const SkillNode = ({ id, data, selected }) => (
  <div className={`base-node group transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${selected ? 'ring-2 ring-indigo-400 shadow-xl shadow-indigo-100' : ''}`} style={{
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    minWidth: '200px',
    maxWidth: '240px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)'
  }}>
    {/* Target Handle (Left) */}
    <Handle 
      type="target" 
      position={Position.Left} 
      style={{ width: '8px', height: '8px', background: '#818cf8', border: '2px solid #fff', boxShadow: '0 0 0 1px #c7d2fe' }} 
    />

    {/* Header */}
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100/80 bg-gradient-to-r from-indigo-50/60 to-violet-50/40 rounded-t-[15px]">
      <div className="flex items-center gap-2">
        <div className="p-1 bg-indigo-500 rounded-md text-white shadow-sm">
          <Layers size={12} />
        </div>
        <span className="text-[10px] font-bold text-indigo-600/80 uppercase tracking-wider">Skill</span>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreHorizontal size={12} className="text-slate-300 cursor-pointer hover:text-slate-500" />
      </div>
    </div>

    {/* Body */}
    <div className="px-4 py-3 flex flex-col gap-2.5">
      <div className="text-[13px] font-bold text-slate-800 leading-snug tracking-tight">
        {data.label}
      </div>
      
      {/* Priority Badge */}
      <div className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-50/80 rounded-lg border border-slate-100/60">
         <Zap size={10} className="text-amber-500 fill-amber-400" />
         <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Core Skill</span>
         <div className="ml-auto w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
           <Maximize2 size={8} className="text-emerald-500" />
         </div>
      </div>
    </div>

    {/* Source Handle (Right) */}
    <Handle 
      type="source" 
      position={Position.Right} 
      style={{ width: '8px', height: '8px', background: '#818cf8', border: '2px solid #fff', boxShadow: '0 0 0 1px #c7d2fe' }} 
    />
  </div>
);

const nodeTypes = {
  custom: SkillNode,
};

export default function SkillDAG({ learningPath }) {
  if (!learningPath || !learningPath.nodes || learningPath.nodes.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-12 bg-slate-50/20">
        <div className="relative">
           <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
           <div className="absolute inset-0 flex items-center justify-center font-black text-indigo-600 text-[10px] uppercase tracking-widest">MAP</div>
        </div>
        <p className="mt-8 text-slate-400 font-black text-xs tracking-widest uppercase italic-none">Synthesizing Visual Path...</p>
      </div>
    );
  }

  // ── Topological layout: position nodes left-to-right by dependency depth ──
  const nodeMap = {};
  learningPath.nodes.forEach(n => { nodeMap[String(n.id)] = n; });

  // Build adjacency and in-degree
  const adj = {};     // source → [targets]
  const inDeg = {};   // node → number of incoming edges
  learningPath.nodes.forEach(n => { 
    const id = String(n.id);
    adj[id] = []; 
    inDeg[id] = 0; 
  });
  learningPath.edges.forEach(e => {
    const src = String(e.source), tgt = String(e.target);
    if (adj[src]) adj[src].push(tgt);
    inDeg[tgt] = (inDeg[tgt] || 0) + 1;
  });

  // BFS topological sort → assign depth (column) to each node
  const depth = {};
  const queue = [];
  Object.keys(inDeg).forEach(id => { if (inDeg[id] === 0) { queue.push(id); depth[id] = 0; } });
  let head = 0;
  while (head < queue.length) {
    const cur = queue[head++];
    for (const next of (adj[cur] || [])) {
      depth[next] = Math.max(depth[next] || 0, depth[cur] + 1);
      inDeg[next]--;
      if (inDeg[next] === 0) queue.push(next);
    }
  }

  // Group nodes by depth column
  const columns = {};
  let maxDepth = 0;
  Object.entries(depth).forEach(([id, d]) => {
    if (!columns[d]) columns[d] = [];
    columns[d].push(id);
    maxDepth = Math.max(maxDepth, d);
  });

  // Layout constants
  const COL_WIDTH = 320;
  const ROW_HEIGHT = 200;
  const PADDING_X = 80;
  const PADDING_Y = 60;

  const rfNodes = [];
  for (let col = 0; col <= maxDepth; col++) {
    const nodesInCol = columns[col] || [];
    const colHeight = nodesInCol.length * ROW_HEIGHT;
    const startY = PADDING_Y + (Math.max(...Object.values(columns).map(c => c.length)) * ROW_HEIGHT - colHeight) / 2;
    nodesInCol.forEach((id, row) => {
      rfNodes.push({
        id,
        type: 'custom',
        data: { label: nodeMap[id]?.label || id },
        position: { 
          x: PADDING_X + col * COL_WIDTH, 
          y: startY + row * ROW_HEIGHT 
        },
        draggable: true,
      });
    });
  }

  const rfEdges = learningPath.edges.map((edge) => ({
    id: `edge-${edge.source}-${edge.target}`,
    source: String(edge.source),
    target: String(edge.target),
    animated: true,
    style: { stroke: "#a5b4fc", strokeWidth: 2.5, strokeDasharray: '6 10', opacity: 0.7 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 18,
      height: 18,
      color: "#818cf8",
    },
    label: 'Prerequisite',
    labelStyle: { fill: '#818cf8', fontWeight: 800, fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.15em' },
    labelBgPadding: [8, 4],
    labelBgStyle: { fill: '#f8fafc', fillOpacity: 0.95, rx: 8, stroke: '#e2e8f0', strokeWidth: 0.5 },
  }));

  return (
    <div className="w-full h-full relative group/graph overflow-hidden">
      {/* HUD Info Section for a professional dashboard feel */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none opacity-0 group-hover/graph:opacity-100 transition-opacity duration-700">
         <div className="flex items-center gap-4 px-6 py-3.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10"><MapIcon className="w-5 h-5 text-indigo-400" /></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Graph Navigation</span>
              <span className="text-xs font-bold text-white tracking-tight italic-none">Drag & scroll to explore dependencies</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 ml-2" />
         </div>
      </div>

      {/* Information Helper - Legend */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2.5 pointer-events-none">
         <div className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-100/50 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Crucial Path</span>
         </div>
         <div className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl shadow-lg shadow-slate-100/50 flex items-center gap-3">
            <div className="flex gap-0.5">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Skill Clusters</span>
         </div>
      </div>

      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[20, 20]}
        defaultViewport={{ x: 0, y: 0, zoom: 0.75 }}
        minZoom={0.2}
        maxZoom={3}
      >
        {/* Sleek Dot Background with subtle contrast */}
        <Background color="#cbd5e1" variant="dots" gap={32} size={1.2} />
        
        {/* Custom styled controls - shifted for better aesthetics */}
        <Controls 
          showInteractive={false} 
          position="bottom-left"
          className="!bg-white !border-slate-100 !shadow-2xl !rounded-2xl !p-2 !m-6 scale-110 origin-bottom-left"
        />
      </ReactFlow>
    </div>
  );
}
