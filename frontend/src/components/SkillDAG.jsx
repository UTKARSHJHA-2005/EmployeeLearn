import { useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'

// Auto-layout nodes in a simple left-to-right layered arrangement
function layoutNodes(rawNodes, rawEdges) {
  // Build adjacency for topological sort
  const inDegree = {}
  const adj = {}
  rawNodes.forEach((n) => { inDegree[n.id] = 0; adj[n.id] = [] })
  rawEdges.forEach((e) => { adj[e.source].push(e.target); inDegree[e.target]++ })

  const layers = []
  let queue = rawNodes.filter((n) => inDegree[n.id] === 0).map((n) => n.id)
  const visited = new Set()

  while (queue.length) {
    layers.push([...queue])
    const next = []
    queue.forEach((id) => {
      visited.add(id)
      adj[id].forEach((t) => {
        inDegree[t]--
        if (inDegree[t] === 0 && !visited.has(t)) next.push(t)
      })
    })
    queue = next
  }

  const positioned = {}
  layers.forEach((layer, xi) => {
    layer.forEach((id, yi) => {
      positioned[id] = { x: xi * 220, y: yi * 90 }
    })
  })

  return rawNodes.map((n) => ({
    id: n.id,
    data: { label: n.label },
    position: positioned[n.id] || { x: 0, y: 0 },
    style: {
      background: n.completed ? '#1e3a5f' : '#1f2937',
      border: '1px solid #4f46e5',
      borderRadius: 8,
      color: '#e5e7eb',
      fontSize: 12,
      padding: '8px 12px',
    },
  }))
}

export default function SkillDAG({ nodes: rawNodes = [], edges: rawEdges = [] }) {
  const styledEdges = rawEdges.map((e) => ({
    ...e,
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
    style: { stroke: '#6366f1' },
    animated: true,
  }))

  const [nodes, , onNodesChange] = useNodesState(layoutNodes(rawNodes, rawEdges))
  const [edges, , onEdgesChange] = useEdgesState(styledEdges)

  return (
    <div style={{ height: 380 }} className="rounded-lg overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#374151" gap={20} />
        <Controls />
        <MiniMap nodeColor="#4f46e5" maskColor="rgba(0,0,0,0.6)" />
      </ReactFlow>
    </div>
  )
}
