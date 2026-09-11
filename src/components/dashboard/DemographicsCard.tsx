import React, { useState } from 'react';
import { demographicsData } from '../../data/mockData';
import { Users, Info } from 'lucide-react';

export const DemographicsCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Age' | 'Gender' | 'Location' | 'Interests'>('Age');

  const maxPct = 45;

  return (
    <div className="analytics-card">
      <div className="card-title-row">
        <div>
          <h3>
            <Users size={18} color="var(--primary)" />
            Audience Demographics
          </h3>
          <div className="card-subtitle">Anonymized cohort distribution</div>
        </div>

        <span
          className="badge"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
            fontSize: '0.68rem',
            gap: '4px',
          }}
          title="Aggregated & anonymized, non-PII privacy compliant"
        >
          <Info size={11} />
          AI-Inferred
        </span>
      </div>

      <div className="tab-pills">
        {(['Age', 'Gender', 'Location', 'Interests'] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-pill ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Age' && (
        <div className="bar-chart-vertical">
          {demographicsData.age.map((item) => {
            const heightPct = (item.percentage / maxPct) * 100;
            return (
              <div key={item.range} className="bar-col">
                <span className="bar-pct">{item.percentage}%</span>
                <div
                  className="bar-pill"
                  style={{ height: `${heightPct}%` }}
                  title={`${item.range}: ${item.percentage}%`}
                />
                <span className="bar-label">{item.range}</span>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'Gender' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0' }}>
          {demographicsData.gender.map((item) => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                <strong style={{ color: 'var(--text-primary)' }}>{item.percentage}%</strong>
              </div>
              <div style={{ height: '8px', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${item.percentage}%`,
                    height: '100%',
                    backgroundColor: item.label === 'Male' ? '#3b82f6' : item.label === 'Female' ? '#ec4899' : '#8b5cf6',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Location' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '8px 0' }}>
          {demographicsData.location.slice(0, 4).map((item) => (
            <div key={item.country} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{item.country} ({item.code})</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '80px', height: '6px', backgroundColor: 'var(--bg-surface)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${(item.percentage / 40) * 100}%`, height: '100%', backgroundColor: 'var(--primary)' }} />
                </div>
                <strong style={{ width: '28px', textAlign: 'right', color: 'var(--text-primary)' }}>{item.percentage}%</strong>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Interests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '8px 0' }}>
          {demographicsData.interests.map((item) => (
            <div key={item.category} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{item.category}</span>
              <strong style={{ color: 'var(--text-primary)' }}>{item.percentage}%</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

