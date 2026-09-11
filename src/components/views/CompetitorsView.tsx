import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  BarChart3,
  Plus,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const CompetitorsView: React.FC = () => {
  const { competitors, setAddCompetitorModalOpen } = useAnalytics();

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Competitor Benchmarking</h1>
          <p>
            Track and compare follower reach, engagement rate, growth velocity, and posting cadence.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setAddCompetitorModalOpen(true)}
        >
          <Plus size={16} />
          <span>Add Competitor</span>
        </button>
      </div>

      {/* Benchmarking Comparison Matrix Table */}
      <div className="analytics-card" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Brand / Competitor</th>
                <th>Platform</th>
                <th>Followers</th>
                <th>Engagement Rate</th>
                <th>Estimated Reach</th>
                <th>Posting Cadence</th>
                <th>Growth Velocity</th>
                <th>Sentiment Score</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((comp) => (
                <tr
                  key={comp.id}
                  style={{
                    backgroundColor: comp.isYou ? 'var(--primary-light)' : undefined,
                  }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong
                        style={{
                          fontSize: '0.92rem',
                          color: comp.isYou ? 'var(--primary)' : 'var(--text-primary)',
                        }}
                      >
                        {comp.name}
                      </strong>
                      {comp.isYou && (
                        <span className="badge badge-positive" style={{ fontSize: '0.65rem' }}>
                          YOUR BRAND
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="platform-badge">{comp.platform}</span>
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {(comp.followers / 1000).toFixed(0)}K
                  </td>
                  <td style={{ fontWeight: 700, color: comp.isYou ? 'var(--primary)' : 'var(--text-primary)' }}>
                    {comp.engagementRate}%
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    {(comp.reach / 1000).toFixed(0)}K
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {comp.postingFreq}
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    +{comp.growth}%
                  </td>
                  <td>
                    <span className="badge badge-positive">
                      {(comp.sentimentScore * 100).toFixed(0)}% Pos
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <div className="analytics-card">
          <div className="card-title-row">
            <h3>Engagement Rate Comparison</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
            {competitors.map((comp) => (
              <div key={comp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: comp.isYou ? 'var(--primary)' : 'var(--text-primary)' }}>
                    {comp.name}
                  </span>
                  <strong>{comp.engagementRate}%</strong>
                </div>
                <div style={{ height: '10px', backgroundColor: 'var(--bg-surface)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${(comp.engagementRate / 6) * 100}%`,
                      height: '100%',
                      backgroundColor: comp.isYou ? 'var(--primary)' : '#94a3b8',
                      borderRadius: '5px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <div className="card-title-row">
            <h3>Audience Scale (Followers)</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
            {competitors.map((comp) => (
              <div key={comp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: comp.isYou ? 'var(--primary)' : 'var(--text-primary)' }}>
                    {comp.name}
                  </span>
                  <strong>{(comp.followers / 1000).toFixed(0)}K</strong>
                </div>
                <div style={{ height: '10px', backgroundColor: 'var(--bg-surface)', borderRadius: '5px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${(comp.followers / 450000) * 100}%`,
                      height: '100%',
                      backgroundColor: comp.isYou ? 'var(--primary)' : '#60a5fa',
                      borderRadius: '5px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

