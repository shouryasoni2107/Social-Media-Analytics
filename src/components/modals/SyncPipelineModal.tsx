import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  X,
  RefreshCw,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Server,
} from 'lucide-react';

export const SyncPipelineModal: React.FC = () => {
  const { syncModalOpen, setSyncModalOpen, isSyncing, syncStep } = useAnalytics();

  if (!syncModalOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Querying Social Platform APIs',
      desc: 'Retrieving fresh posts, replies, and mentions from X and Telegram endpoints',
      icon: Server,
    },
    {
      num: 2,
      title: 'Normalizing via Provider Adapters',
      desc: 'Converting platform-specific payloads to the unified Common Data Model',
      icon: Layers,
    },
    {
      num: 3,
      title: 'Enqueuing to Redis / BullMQ Queue',
      desc: 'Dispatched to high-throughput priority worker queues for async batching',
      icon: Cpu,
    },
    {
      num: 4,
      title: 'Background Worker PostgreSQL Validation',
      desc: 'Deduplicating message IDs, encrypting tokens, and persisting time-series entities',
      icon: Database,
    },
    {
      num: 5,
      title: 'AI Sentiment & Emotion Inference',
      desc: 'Transformer NLP scoring sentiment (pos/neg/neu), sarcasm, and topic clusters',
      icon: Sparkles,
    },
    {
      num: 6,
      title: 'Aggregating Analytics Database Records',
      desc: 'Updating time-series rollups, degree centralities, and metric trends',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="modal-overlay" onClick={() => !isSyncing && setSyncModalOpen(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem' }}>Continuous Ingestion Pipeline</h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isSyncing ? 'Synchronizing live social streams...' : 'Pipeline execution completed successfully'}
              </div>
            </div>
          </div>

          {!isSyncing && (
            <button className="modal-close-btn" onClick={() => setSyncModalOpen(false)}>
              <X size={20} />
            </button>
          )}
        </div>

        <div className="stepper-container">
          {steps.map((s) => {
            const isCompleted = syncStep > s.num || (!isSyncing && syncStep >= 6);
            const isActive = isSyncing && syncStep === s.num;
            const Icon = s.icon;

            return (
              <div
                key={s.num}
                className={`stepper-step ${isCompleted ? 'completed' : isActive ? 'active' : ''}`}
              >
                <div className="step-num">
                  {isCompleted ? <CheckCircle2 size={16} /> : s.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '0.86rem',
                      color: isCompleted
                        ? 'var(--accent-emerald)'
                        : isActive
                        ? 'var(--primary)'
                        : 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <Icon size={14} />
                    <span>{s.title}</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!isSyncing && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button className="btn-primary" onClick={() => setSyncModalOpen(false)}>
              <span>Done</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

