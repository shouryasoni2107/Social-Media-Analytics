import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  ShieldCheck,
  RefreshCw,
  Plus,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Layers,
  Lock,
} from 'lucide-react';
import { SocialPlatform } from '../../types';

export const AccountsView: React.FC = () => {
  const {
    accounts,
    disconnectAccount,
    triggerSync,
    isSyncing,
    setConnectModalOpen,
  } = useAnalytics();

  const getPlatformIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'X':
        return <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>𝕏</span>;
      case 'Telegram':
        return <span style={{ fontSize: '1.2rem' }}>✈️</span>;
      case 'Instagram':
        return <span style={{ fontSize: '1.2rem' }}>📷</span>;
      case 'LinkedIn':
        return <span style={{ fontSize: '1.2rem' }}>💼</span>;
      case 'Facebook':
        return <span style={{ fontSize: '1.2rem' }}>🌐</span>;
      default:
        return <span style={{ fontSize: '1.2rem' }}>📱</span>;
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Social Account Integration</h1>
          <p>
            Connect and synchronize authorized multi-platform streams via OAuth 2.0 provider adapters.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn-outline"
            onClick={() => triggerSync()}
            disabled={isSyncing}
          >
            <RefreshCw size={15} className={isSyncing ? 'animate-spin' : ''} />
            <span>{isSyncing ? 'Syncing...' : 'Sync All Streams'}</span>
          </button>
          <button
            className="btn-primary"
            onClick={() => setConnectModalOpen(true)}
          >
            <Plus size={16} />
            <span>Connect Platform</span>
          </button>
        </div>
      </div>

      {/* Security Banner */}
      <div
        style={{
          padding: '16px 20px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            color: 'var(--accent-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lock size={20} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Enterprise OAuth 2.0 Security & Encryption at Rest
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Access and refresh tokens are encrypted using AES-256-GCM. Audience intelligence complies with public platform developer policies.
          </div>
        </div>
        <span
          className="badge"
          style={{
            backgroundColor: 'var(--sentiment-pos-bg)',
            color: 'var(--sentiment-pos-text)',
            border: '1px solid var(--sentiment-pos-border)',
          }}
        >
          <ShieldCheck size={14} />
          AES-256 Verified
        </span>
      </div>

      {/* Accounts List Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        {accounts.map((acc) => {
          const isConnected = acc.status === 'connected';

          return (
            <div
              key={acc.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'var(--transition)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getPlatformIcon(acc.platform)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{acc.accountName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{acc.handle}</div>
                    </div>
                  </div>

                  {isConnected ? (
                    <span className="badge badge-positive">
                      <CheckCircle2 size={12} />
                      Connected
                    </span>
                  ) : (
                    <span className="badge badge-neutral">
                      <AlertCircle size={12} />
                      Disconnected
                    </span>
                  )}
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    margin: '14px 0',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Audience Size</span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                      {(acc.followersCount / 1000).toFixed(1)}K
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block' }}>Posts Ingested</span>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                      {acc.postsCount}
                    </strong>
                  </div>
                  <div style={{ gridColumn: 'span 2', paddingTop: '6px', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Last Sync: </span>
                    <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{acc.lastSync}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                {isConnected ? (
                  <>
                    <button
                      className="btn-outline"
                      style={{ flex: 1, padding: '7px', fontSize: '0.78rem', justifyContent: 'center' }}
                      onClick={() => triggerSync(acc.id)}
                      disabled={isSyncing}
                    >
                      <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
                      <span>Sync</span>
                    </button>
                    <button
                      style={{
                        padding: '7px 12px',
                        fontSize: '0.78rem',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--accent-rose)',
                        cursor: 'pointer',
                      }}
                      onClick={() => disconnectAccount(acc.id)}
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '0.82rem' }}
                    onClick={() => setConnectModalOpen(true)}
                  >
                    <span>Authorize OAuth</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ingestion Architecture Card */}
      <div
        className="analytics-card"
        style={{
          border: '1px dashed var(--border-color)',
          backgroundColor: 'transparent',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Layers size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.05rem' }}>Platform Adapter Architecture Principle</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '850px' }}>
          In accordance with the MVP specification, each social platform communicates through dedicated Provider Adapters (X, Telegram, Instagram, etc.) into a <strong>Common Data Model</strong>. Raw posts, replies, and reactions are normalized before being queued in Redis / BullMQ for async NLP sentiment classification.
        </p>
      </div>
    </div>
  );
};

