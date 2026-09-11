import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  Hash,
  ArrowUpRight,
  Calculator,
  ExternalLink,
} from 'lucide-react';

export const TrendsView: React.FC = () => {
  const { topics, setSelectedTopic } = useAnalytics();

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Trend & Topic Intelligence</h1>
          <p>
            Autonomous detection of emerging narratives, growth velocity, and community sentiment shifts.
          </p>
        </div>
      </div>

      {/* Trend Score Algorithm Explainer (Section 8) */}
      <div
        style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Calculator size={22} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Rising Trend Velocity Algorithm
            </span>
            <span className="badge badge-positive">MVP Spec v1.0</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
            Every narrative is evaluated using multi-factor dimensional weighting:
          </p>
          <div
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              color: 'var(--primary)',
              fontWeight: 600,
              display: 'inline-block',
            }}
          >
            Trend Score = Mention Growth + Engagement Growth + Unique Authors + Velocity + Sentiment Change
          </div>
        </div>
      </div>

      {/* Topics Table */}
      <div className="analytics-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Topic / Narrative</th>
                <th>Total Mentions</th>
                <th>Growth Velocity</th>
                <th>Audience Sentiment</th>
                <th>Algorithmic Score</th>
                <th>Top Contributor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => (
                <tr
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  style={{ cursor: 'pointer' }}
                  title="Click to drill down into conversation timeline and influencers"
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--primary-light)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Hash size={16} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                          {topic.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {topic.relatedTopics.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {topic.mentions.toLocaleString()}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                      <ArrowUpRight size={15} />
                      <span>+{topic.growth}%</span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        topic.sentiment === 'Positive'
                          ? 'badge-positive'
                          : topic.sentiment === 'Negative'
                          ? 'badge-negative'
                          : 'badge-neutral'
                      }`}
                    >
                      {topic.positivePct}% Positive
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--bg-surface)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${(topic.scoreBreakdown.totalScore / 500) * 100}%`,
                            height: '100%',
                            backgroundColor: 'var(--primary)',
                          }}
                        />
                      </div>
                      <strong style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                        {topic.scoreBreakdown.totalScore}
                      </strong>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <img
                        src={topic.topContributors[0]?.avatar}
                        alt="Avatar"
                        style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {topic.topContributors[0]?.handle}
                      </span>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn-outline"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTopic(topic);
                      }}
                    >
                      <span>Drilldown</span>
                      <ExternalLink size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

