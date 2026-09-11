import React, { useState } from 'react';
import { followerGrowthData } from '../../data/mockData';
import { TrendingUp, ChevronDown } from 'lucide-react';

export const FollowerGrowthChart: React.FC = () => {
  const [activeRange, setActiveRange] = useState('Last 30 days');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const platforms = [
    { key: 'X', label: 'X (Twitter)', color: '#3b82f6' },
    { key: 'Instagram', label: 'Instagram', color: '#f43f5e' },
    { key: 'LinkedIn', label: 'LinkedIn', color: '#0ea5e9' },
    { key: 'Telegram', label: 'Telegram', color: '#10b981' },
  ] as const;

  // Chart coordinate math
  const width = 620;
  const height = 210;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingTop - paddingBottom;

  const minVal = 0;
  const maxVal = 150000;

  const getX = (idx: number) =>
    paddingLeft + (idx / (followerGrowthData.length - 1)) * innerWidth;

  const getY = (val: number) =>
    paddingTop + innerHeight - ((val - minVal) / (maxVal - minVal)) * innerHeight;

  // Generate smooth SVG paths
  const createPath = (key: 'X' | 'Instagram' | 'LinkedIn' | 'Telegram') => {
    return followerGrowthData.reduce((acc, pt, idx) => {
      const x = getX(idx);
      const y = getY(pt[key]);
      if (idx === 0) return `M ${x} ${y}`;

      const prevX = getX(idx - 1);
      const prevY = getY(followerGrowthData[idx - 1][key]);
      const cpX1 = prevX + (x - prevX) / 2;
      const cpX2 = cpX1;
      return `${acc} C ${cpX1} ${prevY}, ${cpX2} ${y}, ${x} ${y}`;
    }, '');
  };

  const yTicks = [0, 50000, 100000, 150000];

  return (
    <div className="analytics-card" style={{ gridColumn: 'span 1' }}>
      <div className="card-title-row">
        <div>
          <h3>
            <TrendingUp size={18} color="var(--primary)" />
            Follower Growth
          </h3>
          <div className="card-subtitle">Aggregated multi-platform community trends</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            style={{
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>{activeRange}</span>
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      <div className="chart-container" style={{ position: 'relative' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="chart-svg"
          preserveAspectRatio="none"
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Grid lines & Y labels */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="var(--border-subtle)"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--text-muted)"
                  fontFamily="var(--font-sans)"
                >
                  {tick >= 1000 ? `${tick / 1000}K` : tick}
                </text>
              </g>
            );
          })}

          {/* X Axis labels */}
          {followerGrowthData.map((pt, idx) => {
            const x = getX(idx);
            return (
              <text
                key={idx}
                x={x}
                y={height - 8}
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-muted)"
                fontFamily="var(--font-sans)"
              >
                {pt.label}
              </text>
            );
          })}

          {/* Platform Curves */}
          {platforms.map((p) => (
            <path
              key={p.key}
              d={createPath(p.key)}
              fill="none"
              stroke={p.color}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}

          {/* Interactive Hover Vertical Line and Points */}
          {followerGrowthData.map((pt, idx) => {
            const x = getX(idx);
            const isHovered = hoverIndex === idx;
            return (
              <g
                key={idx}
                onMouseEnter={() => setHoverIndex(idx)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={x - 20}
                  y={paddingTop}
                  width="40"
                  height={innerHeight}
                  fill="transparent"
                />
                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingTop}
                    x2={x}
                    y2={paddingTop + innerHeight}
                    stroke="var(--text-muted)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}
                {platforms.map((p) => {
                  const y = getY(pt[p.key]);
                  return (
                    <circle
                      key={p.key}
                      cx={x}
                      cy={y}
                      r={isHovered ? 5 : 3.5}
                      fill={p.color}
                      stroke="var(--bg-card)"
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoverIndex !== null && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: `${(getX(hoverIndex) / width) * 100}%`,
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-lg)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 12px',
              pointerEvents: 'none',
              zIndex: 20,
              fontSize: '0.75rem',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
              {followerGrowthData[hoverIndex].label}, 2025
            </div>
            {platforms.map((p) => (
              <div
                key={p.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'space-between',
                  minWidth: '130px',
                  marginBottom: '2px',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: p.color }} />
                  {p.key}:
                </span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {(followerGrowthData[hoverIndex][p.key] / 1000).toFixed(1)}K
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="chart-legend">
        {platforms.map((p) => (
          <div key={p.key} className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: p.color }} />
            <span>{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

