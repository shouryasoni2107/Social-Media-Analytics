import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  X,
  Hash,
  ArrowUpRight,
  Sparkles,
  Users,
  Clock,
  Share2,
} from 'lucide-react';

export const TopicDetailModal: React.FC = () => {
  const { selectedTopic, setSelectedTopic } = useAnalytics();

  if (!selectedTopic) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedTopic(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Hash size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem' }}>Topic: {selectedTopic.name}</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Algorithmic Topic & Narrative Intelligence Drilldown
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setSelectedTopic(null)}>
            <X size={20} />
          </button>
        </div>

        {/* 3 Core Metric Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Mentions</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {selectedTopic.mentions.toLocaleString()}
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Growth Velocity</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center' }}>
              <ArrowUpRight size={20} />
              +{selectedTopic.growth}%
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Audience Sentiment</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)' }}>
              {selectedTopic.positivePct}% Pos
            </div>
          </div>
        </div>

        {/* Timeline Chart (Spec Section 16 Step 6) */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={15} color="var(--primary)" />
            Conversation Timeline (Mention Volume Over Time)
          </div>

          <div
            style={{
              height: '110px',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '18px',
            }}
          >
            {selectedTopic.timeline.map((pt, idx) => {
              const maxMentions = Math.max(...selectedTopic.timeline.map((t) => t.mentions));
              const heightPct = (pt.mentions / maxMentions) * 100;
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                    {pt.mentions > 999 ? `${(pt.mentions / 1000).toFixed(1)}K` : pt.mentions}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      height: `${heightPct}%`,
                      backgroundColor: 'var(--primary)',
                      borderRadius: '3px 3px 0 0',
                    }}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{pt.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Contributors (Spec Section 16 Step 6) */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={15} color="var(--accent-amber)" />
            Top Key Contributors & Drivers
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedTopic.topContributors.map((c, i) => (
              <div
                key={c.handle}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {i + 1}.
                  </span>
                  <img
                    src={c.avatar}
                    alt={c.name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <strong style={{ fontSize: '0.85rem' }}>{c.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
                      {c.handle}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Influence Score: {c.influenceScore}/100
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Topics */}
        <div>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, marginBottom: '8px' }}>
            Related Emerging Topics
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {selectedTopic.relatedTopics.map((rel) => (
              <span
                key={rel}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                }}
              >
                {rel}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

