import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { AlertTriangle, ArrowRight, Zap } from 'lucide-react';

export const RecentAlertsCard: React.FC = () => {
  const { recentAlerts, setActiveTab } = useAnalytics();

  return (
    <div
      style={{
        marginTop: '20px',
        padding: '16px 20px',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            color: 'var(--accent-amber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Zap size={18} />
        </div>
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Active Intelligence Alerts
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Sudden metric deviations detected across social channels
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {recentAlerts.slice(0, 2).map((alert) => (
          <div
            key={alert.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              fontSize: '0.8rem',
            }}
          >
            <AlertTriangle size={14} color="var(--accent-amber)" />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{alert.metricName}</span>
            <span
              style={{
                fontWeight: 700,
                color: alert.changeValue.includes('+') ? 'var(--accent-rose)' : 'var(--accent-emerald)',
              }}
            >
              {alert.changeValue}
            </span>
          </div>
        ))}

        <button
          onClick={() => setActiveTab('alerts')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <span>Manage Alert Rules</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

