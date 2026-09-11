import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  Bell,
  Plus,
  AlertTriangle,
  Mail,
  Zap,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';

export const AlertsView: React.FC = () => {
  const {
    alertRules,
    toggleAlertRule,
    setCreateAlertModalOpen,
    recentAlerts,
    markAlertAsRead,
  } = useAnalytics();

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Real-time Alert Rules & Notification Engine</h1>
          <p>
            Configure autonomous trigger thresholds for sudden sentiment shifts, engagement drops, and viral topic spikes.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setCreateAlertModalOpen(true)}
        >
          <Plus size={16} />
          <span>New Alert Rule</span>
        </button>
      </div>

      {/* Rules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {alertRules.map((rule) => (
          <div
            key={rule.id}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(245, 158, 11, 0.12)',
                      color: 'var(--accent-amber)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Zap size={16} />
                  </div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                    {rule.name}
                  </strong>
                </div>

                <button
                  onClick={() => toggleAlertRule(rule.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: rule.isActive ? 'var(--primary)' : 'var(--text-muted)',
                  }}
                  title={rule.isActive ? 'Deactivate rule' : 'Activate rule'}
                >
                  {rule.isActive ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>

              <div
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '14px',
                  lineHeight: 1.5,
                }}
              >
                <strong>Condition: </strong>
                IF <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{rule.metric}</span>{' '}
                {rule.condition === 'increases_above' ? 'increases by >' : 'drops by >'}{' '}
                <strong>{rule.threshold}%</strong> THEN trigger alert.
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Mail size={12} />
                <span>Channels: {rule.channel === 'both' ? 'In-App + Email' : 'In-App'}</span>
              </div>
              <span>{rule.lastTriggered ? `Last fired: ${rule.lastTriggered}` : 'Never fired'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Triggered Alerts Log */}
      <div className="analytics-card">
        <div className="card-title-row">
          <div>
            <h3>
              <AlertTriangle size={18} color="var(--accent-amber)" />
              Recent Triggered Alerts Log
            </h3>
            <div className="card-subtitle">Chronological telemetry audit trail</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {recentAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => markAlertAsRead(alert.id)}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: alert.isRead ? 'var(--bg-surface)' : 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: alert.severity === 'warning' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(59, 130, 246, 0.12)',
                    color: alert.severity === 'warning' ? 'var(--accent-rose)' : 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AlertTriangle size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {alert.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {alert.message}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: alert.changeValue.includes('+') ? 'var(--accent-rose)' : 'var(--accent-emerald)',
                  }}
                >
                  {alert.changeValue}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {alert.timestamp}
                </span>
                {alert.isRead ? (
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Read</span>
                ) : (
                  <span className="badge badge-positive" style={{ fontSize: '0.65rem' }}>
                    New
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

