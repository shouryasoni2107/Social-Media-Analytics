import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { X, Check } from 'lucide-react';
import { SocialPlatform } from '../../types';

export const AddCompetitorModal: React.FC = () => {
  const { addCompetitorModalOpen, setAddCompetitorModalOpen, addCompetitor } = useAnalytics();

  const [name, setName] = useState('');
  const [platform, setPlatform] = useState<SocialPlatform>('X');
  const [followers, setFollowers] = useState('280000');
  const [engagementRate, setEngagementRate] = useState('3.8');
  const [reach, setReach] = useState('850000');
  const [postingFreq, setPostingFreq] = useState('4.5 posts/day');

  if (!addCompetitorModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCompetitor({
      name,
      platform,
      followers: parseInt(followers, 10) || 100000,
      engagementRate: parseFloat(engagementRate) || 3.5,
      reach: parseInt(reach, 10) || 500000,
      postingFreq,
      growth: Math.floor(Math.random() * 15) + 5,
      sentimentScore: 0.75,
    });

    setName('');
  };

  return (
    <div className="modal-overlay" onClick={() => setAddCompetitorModalOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.25rem' }}>Add Competitor for Benchmarking</h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Manual competitor entry (Spec Section 12)
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setAddCompetitorModalOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Competitor Brand Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. BrandWatch Insights"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Primary Social Platform</label>
            <select
              className="form-control"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as SocialPlatform)}
            >
              <option value="X">X (Twitter)</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Telegram">Telegram</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Followers Count</label>
              <input
                type="number"
                className="form-control"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Engagement Rate (%)</label>
              <input
                type="number"
                step="0.1"
                className="form-control"
                value={engagementRate}
                onChange={(e) => setEngagementRate(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Estimated Monthly Reach</label>
              <input
                type="number"
                className="form-control"
                value={reach}
                onChange={(e) => setReach(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Posting Cadence</label>
              <input
                type="text"
                className="form-control"
                value={postingFreq}
                onChange={(e) => setPostingFreq(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              className="btn-outline"
              onClick={() => setAddCompetitorModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Check size={16} />
              <span>Save Competitor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

