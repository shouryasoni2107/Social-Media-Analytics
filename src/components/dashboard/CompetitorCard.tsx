import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { BarChart2, Plus, ChevronDown } from 'lucide-react';

export const CompetitorCard: React.FC = () => {
  const { competitors, setAddCompetitorModalOpen } = useAnalytics();
  const [metric, setMetric] = useState<'Engagement' | 'Followers' | 'Growth'>('Engagement');
  const [metricDropdownOpen, setMetricDropdownOpen] = useState(false);

  const getVal = (comp: typeof competitors[0]) => {
    switch (metric) {
      case 'Engagement':
        return comp.engagementRate;
      case 'Followers':
        return comp.followers / 1000;
      case 'Growth':
        return comp.growth;
    }
  };

  const getUnit = (val: number) => {
    switch (metric) {
      case 'Engagement':
        return `${val.toFixed(1)}%`;
      case 'Followers':
        return `${val.toFixed(0)}K`;
      case 'Growth':
        return `+${val.toFixed(1)}%`;
    }
  };

  const maxVal = Math.max(...competitors.map(getVal), 1);

  return (
    <div className="analytics-card">
      <div className="card-title-row">
        <div>
          <h3>
            <BarChart2 size={18} color="var(--primary)" />
            Competitor Comparison
          </h3>
          <div className="card-subtitle">Manual benchmark tracking</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', position: 'relative' }}>
          <button
            onClick={() => setMetricDropdownOpen(!metricDropdownOpen)}
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
            <span>{metric}</span>
            <ChevronDown size={12} />
          </button>

          {metricDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-lg)',
                padding: '4px',
                zIndex: 20,
              }}
            >
              {(['Engagement', 'Followers', 'Growth'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMetric(m);
                    setMetricDropdownOpen(false);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '6px 12px',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.75rem',
                    color: metric === m ? 'var(--primary)' : 'var(--text-primary)',
                    fontWeight: metric === m ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setAddCompetitorModalOpen(true)}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
            title="Add competitor manually"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="comp-bar-container">
        {competitors.slice(0, 4).map((comp) => {
          const val = getVal(comp);
          const heightPct = (val / maxVal) * 100;
          const shortName = comp.isYou
            ? 'You'
            : comp.name.includes('Competitor A')
            ? 'Comp A'
            : comp.name.includes('Competitor B')
            ? 'Comp B'
            : 'Comp C';

          return (
            <div key={comp.id} className="comp-bar-col">
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {getUnit(val)}
              </span>
              <div
                className={`comp-bar-pill ${comp.isYou ? 'you' : 'other'}`}
                style={{ height: `${heightPct}%` }}
                title={`${comp.name}: ${getUnit(val)}`}
              />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {shortName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

