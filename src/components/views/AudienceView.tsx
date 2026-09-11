import React, { useState } from 'react';
import { demographicsData } from '../../data/mockData';
import {
  Users,
  Globe,
  Clock,
  Briefcase,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export const AudienceView: React.FC = () => {
  const [dataMode, setDataMode] = useState<'Inferred' | 'Observed'>('Inferred');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Audience Intelligence</h1>
          <p>
            Anonymized demographic patterns, geographic reach, and optimal active-hours heatmaps.
          </p>
        </div>

        {/* Inferred vs Observed Toggle as required by Section 7 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '4px',
            border: '1px solid var(--border-color)',
          }}
        >
          <button
            onClick={() => setDataMode('Inferred')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: dataMode === 'Inferred' ? 'var(--primary)' : 'transparent',
              color: dataMode === 'Inferred' ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>AI-Inferred Estimates</span>
          </button>
          <button
            onClick={() => setDataMode('Observed')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: dataMode === 'Observed' ? 'var(--primary)' : 'transparent',
              color: dataMode === 'Observed' ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span>Observed Platform Signals</span>
          </button>
        </div>
      </div>

      {/* Compliance / Privacy Constraint Banner (Section 7) */}
      <div
        style={{
          padding: '14px 20px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <ShieldCheck size={20} color="var(--accent-emerald)" />
        <div style={{ flex: 1, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Privacy Assurance: </strong>
          Demographic intelligence presents aggregate cohort distributions. Inferred data is calculated using probabilistic semantic priors and public linguistic indicators, never stored or presented as individual PII facts.
        </div>
      </div>

      {/* Demographics 3-Card Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '24px',
        }}
      >
        {/* Age Brackets */}
        <div className="analytics-card">
          <div className="card-title-row">
            <div>
              <h3>
                <Users size={18} color="var(--primary)" />
                Age Distribution
              </h3>
              <div className="card-subtitle">Anonymized audience brackets</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            {demographicsData.age.map((item) => (
              <div key={item.range}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.range} years</span>
                  <strong style={{ color: 'var(--primary)' }}>{item.percentage}%</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${item.percentage * 2}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Regions */}
        <div className="analytics-card">
          <div className="card-title-row">
            <div>
              <h3>
                <Globe size={18} color="var(--accent-cyan)" />
                Top Geographies
              </h3>
              <div className="card-subtitle">Aggregated country penetration</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
            {demographicsData.location.map((loc) => (
              <div key={loc.country} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    {loc.code}
                  </span>
                  <span style={{ fontSize: '0.84rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {loc.country}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '80px', height: '6px', backgroundColor: 'var(--bg-surface)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${(loc.percentage / 40) * 100}%`, height: '100%', backgroundColor: 'var(--accent-cyan)' }} />
                  </div>
                  <strong style={{ fontSize: '0.84rem', color: 'var(--text-primary)', width: '32px', textAlign: 'right' }}>
                    {loc.percentage}%
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Interests */}
        <div className="analytics-card">
          <div className="card-title-row">
            <div>
              <h3>
                <Briefcase size={18} color="var(--accent-purple)" />
                Audience Interests
              </h3>
              <div className="card-subtitle">Conversation topic affinity</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
            {demographicsData.interests.map((int) => (
              <div key={int.category}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{int.category}</span>
                  <strong style={{ color: 'var(--accent-purple)' }}>{int.percentage}%</strong>
                </div>
                <div style={{ height: '8px', backgroundColor: 'var(--bg-surface)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${int.percentage * 2}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #a855f7, #8b5cf6)',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active-Hours Heatmap Matrix */}
      <div className="analytics-card">
        <div className="card-title-row">
          <div>
            <h3>
              <Clock size={18} color="var(--primary)" />
              Optimal Active Hours & Engagement Heatmap
            </h3>
            <div className="card-subtitle">
              User interaction density across 24-hour UTC timeline (Darker = peak activity)
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>Low</span>
            <div style={{ display: 'flex', gap: '3px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--bg-surface)', borderRadius: '2px' }} />
              <div style={{ width: '12px', height: '12px', backgroundColor: '#93c5fd', borderRadius: '2px' }} />
              <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '2px' }} />
              <div style={{ width: '12px', height: '12px', backgroundColor: '#1d4ed8', borderRadius: '2px' }} />
            </div>
            <span>Peak</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
          <div style={{ minWidth: '700px' }}>
            {/* Hour labels 0 - 23 */}
            <div style={{ display: 'flex', marginLeft: '50px', marginBottom: '6px' }}>
              {Array.from({ length: 24 }).map((_, h) => (
                <div
                  key={h}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {h % 3 === 0 ? `${h}h` : ''}
                </div>
              ))}
            </div>

            {/* Heatmap Grid */}
            {demographicsData.activeHoursMatrix.map((row, dayIdx) => (
              <div key={dayIdx} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                <span
                  style={{
                    width: '45px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {days[dayIdx]}
                </span>
                <div style={{ flex: 1, display: 'flex', gap: '3px' }}>
                  {row.map((score, hIdx) => {
                    const bgColor =
                      score > 85
                        ? '#1d4ed8'
                        : score > 60
                        ? '#3b82f6'
                        : score > 30
                        ? '#93c5fd'
                        : score > 10
                        ? 'rgba(147, 197, 253, 0.3)'
                        : 'var(--bg-surface)';

                    return (
                      <div
                        key={hIdx}
                        title={`${days[dayIdx]} at ${hIdx}:00 UTC — Activity Index: ${score}`}
                        style={{
                          flex: 1,
                          height: '24px',
                          backgroundColor: bgColor,
                          borderRadius: '3px',
                          cursor: 'pointer',
                          transition: 'var(--transition)',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

