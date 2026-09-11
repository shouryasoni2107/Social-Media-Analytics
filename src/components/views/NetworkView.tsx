import React, { useEffect, useRef, useState } from 'react';
import { networkNodesData, networkEdgesData } from '../../data/mockData';
import { NetworkNode } from '../../types';
import {
  Share2,
  Filter,
  Info,
  Maximize2,
  Sparkles,
  Users,
  Layers,
  AlertTriangle,
} from 'lucide-react';

export const NetworkView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [activeCluster, setActiveCluster] = useState<number | 'all'>('all');
  const [draggedNode, setDraggedNode] = useState<NetworkNode | null>(null);

  // Nodes with physics coordinates
  const nodesRef = useRef<(NetworkNode & { x: number; y: number; vx: number; vy: number; radius: number })[]>([]);

  useEffect(() => {
    // Initialize node positions in a circle/spread
    const width = 800;
    const height = 500;
    nodesRef.current = networkNodesData.map((node, i) => {
      const angle = (i / networkNodesData.length) * 2 * Math.PI;
      const dist = 120 + (node.cluster * 50) + (Math.random() * 40);
      return {
        ...node,
        x: width / 2 + Math.cos(angle) * dist,
        y: height / 2 + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        radius: node.radius || 16,
      };
    });
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const simulate = () => {
      const nodes = nodesRef.current;
      const edges = networkEdgesData;

      // Center gravity
      nodes.forEach((node) => {
        const dx = width / 2 - node.x;
        const dy = height / 2 - node.y;
        node.vx += dx * 0.0006;
        node.vy += dy * 0.0006;
      });

      // Node repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = n1.radius + n2.radius + 35;

          if (dist < minDist) {
            const force = (minDist - dist) / dist;
            const fx = dx * force * 0.04;
            const fy = dy * force * 0.04;
            n1.vx -= fx;
            n1.vy -= fy;
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }

      // Edge spring pull
      edges.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);
        if (!source || !target) return;

        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const desiredDist = 110;
        const force = (dist - desiredDist) * 0.003;

        source.vx += (dx / dist) * force;
        source.vy += (dy / dist) * force;
        target.vx -= (dx / dist) * force;
        target.vy -= (dy / dist) * force;
      });

      // Update positions with damping
      nodes.forEach((node) => {
        if (node === draggedNode) return;
        node.vx *= 0.88;
        node.vy *= 0.88;
        node.x += node.vx;
        node.y += node.vy;

        // Keep inside canvas bounds
        const pad = node.radius + 10;
        node.x = Math.max(pad, Math.min(width - pad, node.x));
        node.y = Math.max(pad, Math.min(height - pad, node.y));
      });

      // Draw clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw Edges
      edges.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);
        if (!source || !target) return;

        const isFiltered =
          activeCluster !== 'all' &&
          source.cluster !== activeCluster &&
          target.cluster !== activeCluster;

        const isHighlighted =
          selectedNode &&
          (source.id === selectedNode.id || target.id === selectedNode.id);

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        if (isHighlighted) {
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2.5;
        } else if (isFiltered) {
          ctx.strokeStyle = 'rgba(150, 150, 150, 0.08)';
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle =
            edge.type === 'reply'
              ? 'rgba(99, 102, 241, 0.25)'
              : edge.type === 'mention'
              ? 'rgba(59, 130, 246, 0.3)'
              : 'rgba(16, 185, 129, 0.3)';
          ctx.lineWidth = Math.min(edge.weight * 1.2, 3);
        }
        ctx.stroke();
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const isFiltered = activeCluster !== 'all' && node.cluster !== activeCluster;
        const isSelected = selectedNode?.id === node.id;

        ctx.save();
        ctx.globalAlpha = isFiltered ? 0.2 : 1.0;

        // Outer glow
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6, 0, 2 * Math.PI);
          ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
          ctx.fill();
        }

        // Node Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);

        if (node.type === 'topic') {
          ctx.fillStyle = node.sentiment === 'Negative' ? '#ef4444' : '#6366f1';
        } else if (node.type === 'influencer') {
          ctx.fillStyle = node.cluster === 3 ? '#f43f5e' : node.cluster === 2 ? '#8b5cf6' : '#2563eb';
        } else {
          ctx.fillStyle = node.cluster === 3 ? '#fb7185' : '#38bdf8';
        }
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node label
        ctx.font = '11px Inter, sans-serif';
        ctx.fillStyle = isSelected ? '#3b82f6' : 'var(--text-primary)';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + node.radius + 14);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(simulate);
    };

    simulate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedNode, activeCluster, draggedNode]);

  // Mouse interaction handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;

    const clicked = nodesRef.current.find((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= node.radius + 4;
    });

    if (clicked) {
      setDraggedNode(clicked);
      setSelectedNode(clicked);
    } else {
      setSelectedNode(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!draggedNode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    draggedNode.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    draggedNode.y = ((e.clientY - rect.top) / rect.height) * canvas.height;
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Link & Network Intelligence</h1>
          <p>
            Interactive graph topology revealing influential users, topic hubs, and sentiment spread between clusters.
          </p>
        </div>

        {/* Cluster Filtering Controls */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className={`tab-pill ${activeCluster === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCluster('all')}
            style={{ padding: '6px 14px' }}
          >
            All Clusters
          </button>
          <button
            className={`tab-pill ${activeCluster === 1 ? 'active' : ''}`}
            onClick={() => setActiveCluster(1)}
            style={{ padding: '6px 14px' }}
          >
            Cluster 1: Tech & AI Advocates
          </button>
          <button
            className={`tab-pill ${activeCluster === 2 ? 'active' : ''}`}
            onClick={() => setActiveCluster(2)}
            style={{ padding: '6px 14px' }}
          >
            Cluster 2: Marketing & Growth
          </button>
          <button
            className={`tab-pill ${activeCluster === 3 ? 'active' : ''}`}
            onClick={() => setActiveCluster(3)}
            style={{
              padding: '6px 14px',
              color: activeCluster === 3 ? '#fff' : 'var(--accent-rose)',
              backgroundColor: activeCluster === 3 ? 'var(--accent-rose)' : undefined,
            }}
          >
            ⚠ Cluster 3: Negative Sentiment Driver
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2.4fr 1fr', gap: '20px' }}>
        {/* Interactive Canvas Graph */}
        <div
          className="analytics-card"
          style={{
            padding: '16px',
            position: 'relative',
            backgroundColor: 'var(--bg-card)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '20px',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-card)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
              }}
            >
              💡 Drag nodes to simulate physics • Click node to inspect details
            </span>
          </div>

          <canvas
            ref={canvasRef}
            width={820}
            height={520}
            style={{
              width: '100%',
              height: '520px',
              display: 'block',
              cursor: draggedNode ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '12px',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ display: 'flex', gap: '14px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb' }} />
                Influencers (High Degree)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
                Topic Nodes
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
                Critical Sentiment Voices
              </span>
            </div>
            <span>24 Active Nodes • 42 Relational Edges</span>
          </div>
        </div>

        {/* Node Inspection & Top Influencer Rankings Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Selected Node Details */}
          <div className="analytics-card">
            <div className="card-title-row">
              <h3>
                <Info size={18} color="var(--primary)" />
                Node Inspection
              </h3>
            </div>

            {selectedNode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--primary-light)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                    }}
                  >
                    {selectedNode.label.charAt(1).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {selectedNode.label}
                    </div>
                    <span className="badge badge-positive" style={{ fontSize: '0.68rem', textTransform: 'capitalize' }}>
                      Type: {selectedNode.type}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    backgroundColor: 'var(--bg-surface)',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Centrality / Score</span>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>
                      {selectedNode.influenceScore ? `${selectedNode.influenceScore}/100` : 'N/A'}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Cluster</span>
                    <strong style={{ color: 'var(--primary)' }}>
                      Cluster #{selectedNode.cluster}
                    </strong>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Sentiment Association</span>
                    <span
                      className={`badge ${
                        selectedNode.sentiment === 'Positive'
                          ? 'badge-positive'
                          : selectedNode.sentiment === 'Negative'
                          ? 'badge-negative'
                          : 'badge-neutral'
                      }`}
                    >
                      {selectedNode.sentiment}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                Select or click any node in the graph to view centrality scores, cluster propagation, and interaction counts.
              </div>
            )}
          </div>

          {/* Top Influential Users List (Spec Section 9 & 10) */}
          <div className="analytics-card" style={{ flex: 1 }}>
            <div className="card-title-row">
              <h3>
                <Sparkles size={18} color="var(--accent-amber)" />
                Top Influencers
              </h3>
              <span className="badge badge-positive">Centrality Ranked</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {networkNodesData
                .filter((n) => n.type === 'influencer')
                .sort((a, b) => (b.influenceScore || 0) - (a.influenceScore || 0))
                .slice(0, 5)
                .map((inf, idx) => (
                  <div
                    key={inf.id}
                    onClick={() => setSelectedNode(inf)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        #{idx + 1}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                        {inf.label}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Influence</span>
                      <strong
                        style={{
                          fontSize: '0.84rem',
                          color: inf.cluster === 3 ? 'var(--accent-rose)' : 'var(--primary)',
                        }}
                      >
                        {inf.influenceScore}
                      </strong>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

