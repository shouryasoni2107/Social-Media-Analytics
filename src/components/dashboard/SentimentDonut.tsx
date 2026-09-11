import React, { useState } from 'react';
import { sentimentSummaryData } from '../../data/mockData';
import { Sparkles, BrainCircuit } from 'lucide-react';

export const SentimentDonut: React.FC = () => {
  const [activeSlice, setActiveSlice] = useState<string | null>(null);

  const segments = [
    { label: 'Positive', value: sentimentSummaryData.positive, color: '#10b981' },
    { label: 'Neutral', value: sentimentSummaryData.neutral, color: '#94a3b8' },
    { label: 'Negative', value: sentimentSummaryData.negative, color: '#f43f5e' },
    { label: 'Mixed', value: sentimentSummaryData.mixed, color: '#8b5cf6' },
  ];

  // SVG Donut calculation
  const radius = 62;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div className="analytics-card">
      <div className="card-title-row">
        <div>
          <h3>
            <Sparkles size={18} color="var(--accent-amber)" />
            Sentiment Analysis
          </h3>
          <div className="card-subtitle">AI multi-emotion NLP classification</div>
        </div>

        <span
          className="badge"
          style={{
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: '0.72rem',
            gap: '4px',
          }}
          title="Model confidence score across 4,200 sampled comments"
        >
          <BrainCircuit size={13} />
          94.2% Conf
        </span>
      </div>

      <div className="donut-wrapper">
        <svg viewBox="0 0 160 160" className="donut-svg">
          {segments.map((seg) => {
            const strokeDasharray = `${(seg.value / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((cumulativePercent / 100) * circumference);
            cumulativePercent += seg.value;

            const isHovered = activeSlice === seg.label;

            return (
              <circle
                key={seg.label}
                cx="80"
                cy="80"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  opacity: activeSlice && !isHovered ? 0.45 : 1,
                }}
                onMouseEnter={() => setActiveSlice(seg.label)}
                onMouseLeave={() => setActiveSlice(null)}
              />
            );
          })}
        </svg>

        <div className="donut-center-label">
          <div className="donut-center-pct">
            {activeSlice
              ? `${segments.find((s) => s.label === activeSlice)?.value}%`
              : `${sentimentSummaryData.positive}%`}
          </div>
          <div
            className="donut-center-text"
            style={{
              color:
                activeSlice === 'Negative'
                  ? 'var(--accent-rose)'
                  : activeSlice === 'Neutral'
                  ? 'var(--text-secondary)'
                  : 'var(--accent-emerald)',
            }}
          >
            {activeSlice || 'Positive'}
          </div>
        </div>
      </div>

      <div className="sentiment-legend-grid">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="sentiment-legend-item"
            onMouseEnter={() => setActiveSlice(seg.label)}
            onMouseLeave={() => setActiveSlice(null)}
            style={{ cursor: 'pointer' }}
          >
            <div className="sentiment-legend-label">
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: seg.color,
                }}
              />
              <span>{seg.label}</span>
            </div>
            <span className="sentiment-legend-val">{seg.value}%</span>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Nuanced Emotion Signals
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {sentimentSummaryData.emotions.slice(0, 4).map((emo) => (
            <span
              key={emo.name}
              style={{
                fontSize: '0.72rem',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: emo.color }} />
              <span>{emo.name}</span>
              <strong style={{ color: 'var(--text-primary)' }}>{emo.percentage}%</strong>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

