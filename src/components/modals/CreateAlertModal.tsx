import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { X, Bell, Check } from 'lucide-react';
import { AlertRule } from '../../types';

export const CreateAlertModal: React.FC = () => {
  const { createAlertModalOpen, setCreateAlertModalOpen, addAlertRule } = useAnalytics();

  const [name, setName] = useState('');
  const [metric, setMetric] = useState<AlertRule['metric']>('Negative Sentiment');
  const [condition, setCondition] = useState<AlertRule['condition']>('increases_above');
  const [threshold, setThreshold] = useState('20');
  const [channel, setChannel] = useState<AlertRule['channel']>('both');

  if (!createAlertModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addAlertRule({
      name,
      metric,
      condition,
      threshold: parseFloat(threshold) || 20,
      channel,
      isActive: true,
    });

    setName('');
  };

  return (
    <div className="modal-overlay" onClick={() => setCreateAlertModalOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Create Intelligence Alert Rule</h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Configure autonomous telemetry triggers (Spec Section 13)
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setCreateAlertModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Rule Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Critical Negative Sentiment Surge"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Trigger Metric</label>
            <select
              className="form-control"
              value={metric}
              onChange={(e) => setMetric(e.target.value as AlertRule['metric'])}
            >
              <option value="Negative Sentiment">Negative Sentiment</option>
              <option value="Engagement Rate">Engagement Rate</option>
              <option value="Followers">Follower Growth</option>
              <option value="Total Reach">Total Reach</option>
              <option value="Topic Velocity">Topic Velocity</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Condition</label>
              <select
                className="form-control"
                value={condition}
                onChange={(e) => setCondition(e.target.value as AlertRule['condition'])}
              >
                <option value="increases_above">Increases Above (&gt;)</option>
                <option value="decreases_below">Decreases Below (&lt;)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Threshold Percentage (%)</label>
              <input
                type="number"
                className="form-control"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notification Channel</label>
            <select
              className="form-control"
              value={channel}
              onChange={(e) => setChannel(e.target.value as AlertRule['channel'])}
            >
              <option value="both">In-App Notification + Email</option>
              <option value="in_app">In-App Notification Only</option>
              <option value="email">Email Only</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              className="btn-outline"
              onClick={() => setCreateAlertModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Check size={16} />
              <span>Activate Alert Rule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

