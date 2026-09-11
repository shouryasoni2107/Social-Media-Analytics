import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { X, ShieldCheck, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SocialPlatform } from '../../types';

export const ConnectAccountModal: React.FC = () => {
  const { connectModalOpen, setConnectModalOpen, connectAccount } = useAnalytics();

  const [step, setStep] = useState<1 | 2>(1);
  const [platform, setPlatform] = useState<SocialPlatform>('X');
  const [handle, setHandle] = useState('');
  const [accountName, setAccountName] = useState('');

  if (!connectModalOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      if (!handle.trim()) return;
      connectAccount(platform, handle, accountName || `${platform} Account`);
      setStep(1);
      setHandle('');
      setAccountName('');
    }
  };

  const handleClose = () => {
    setConnectModalOpen(false);
    setStep(1);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Connect Social Account</h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Step {step} of 2 — {step === 1 ? 'Select Platform Provider' : 'OAuth 2.0 Authorization Consent'}
            </div>
          </div>
          <button className="modal-close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {step === 1 ? (
          <div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Choose a platform to connect. Priority accounts (X & Telegram) support real-time post streams and sentiment ingestion.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {[
                { id: 'X', name: 'X (Twitter)', icon: '𝕏', desc: 'Read tweets, replies & engagement', badge: 'Essential' },
                { id: 'Telegram', name: 'Telegram', icon: '✈️', desc: 'Channel messages & discussions', badge: 'Essential' },
                { id: 'Instagram', name: 'Instagram', icon: '📷', desc: 'Media comments & follower reach', badge: 'Tier 2' },
                { id: 'LinkedIn', name: 'LinkedIn', icon: '💼', desc: 'Company page reactions & posts', badge: 'Tier 2' },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() => setPlatform(item.id as SocialPlatform)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: platform === item.id ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: platform === item.id ? 'var(--primary-light)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                      <strong style={{ fontSize: '0.9rem' }}>{item.name}</strong>
                    </div>
                    <span className="badge badge-positive" style={{ fontSize: '0.62rem' }}>
                      {item.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn-outline" onClick={handleClose}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleNext}>
                <span>Continue to Authorization</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                marginBottom: '20px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <Lock size={18} color="var(--accent-emerald)" style={{ marginTop: '2px' }} />
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text-primary)' }}>OAuth 2.0 Scope Requested: </strong>
                Read-only public feed access, subscriber metrics, and timestamped comment streams. Your OAuth refresh tokens will be encrypted using AES-256-GCM at rest.
              </div>
            </div>

            <div className="form-group">
              <label>Account Handle / Username</label>
              <input
                type="text"
                className="form-control"
                placeholder={platform === 'X' ? '@yourbrand' : '@channel_name'}
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Display Name (Optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Brand Marketing HQ"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
              <button className="btn-outline" onClick={() => setStep(1)}>
                Back
              </button>
              <button
                className="btn-primary"
                onClick={handleNext}
                disabled={!handle.trim()}
              >
                <CheckCircle2 size={16} />
                <span>Authorize & Connect</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

