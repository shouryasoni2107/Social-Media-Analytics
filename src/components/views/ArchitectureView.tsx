import React, { useState } from 'react';
import {
  Layers,
  Database,
  Server,
  Cpu,
  Terminal,
  FolderGit2,
  CheckCircle2,
  Share2,
  Lock,
  ArrowRight,
  Code2,
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Architecture' | 'ERD' | 'Monorepo' | 'QuickStart'>('Architecture');

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>System Architecture & Engineering Specification</h1>
          <p>
            End-to-end technical blueprints, PostgreSQL ERD schema, BullMQ data pipeline, and monorepo structure.
          </p>
        </div>

        <div className="tab-pills" style={{ marginBottom: 0 }}>
          {(['Architecture', 'ERD', 'Monorepo', 'QuickStart'] as const).map((tab) => (
            <button
              key={tab}
              className={`tab-pill ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              style={{ padding: '6px 14px' }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'Architecture' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top Architecture Flow */}
          <div className="analytics-card">
            <div className="card-title-row">
              <h3>
                <Layers size={18} color="var(--primary)" />
                System Architecture Topology
              </h3>
              <span className="badge badge-positive">Production-Ready Micro-Services</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px',
                padding: '20px 0',
              }}
            >
              {/* Frontend Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Code2 size={18} color="var(--primary)" />
                  <strong style={{ fontSize: '0.92rem' }}>Frontend</strong>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>React + TypeScript + Vite</span>
                <div
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.82rem',
                    textAlign: 'center',
                    fontWeight: 600,
                  }}
                >
                  Web App (Dashboard)
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    TanStack, Lucide, Canvas
                  </div>
                </div>
              </div>

              {/* Backend Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Server size={18} color="var(--accent-emerald)" />
                  <strong style={{ fontSize: '0.92rem' }}>Backend</strong>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Node.js + Express</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 600 }}>
                    REST API (Controllers, Services)
                  </div>
                  <div style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 600 }}>
                    Auth Service (JWT + RBAC)
                  </div>
                  <div style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 600 }}>
                    Background Jobs (Bull + Redis)
                  </div>
                  <div style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 600 }}>
                    AI/ML NLP, Trends & Network
                  </div>
                </div>
              </div>

              {/* Storage Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={18} color="var(--accent-cyan)" />
                  <strong style={{ fontSize: '0.92rem' }}>Database & Storage</strong>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Persistence Layer</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                    <strong>PostgreSQL</strong>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Time-series indexed data</div>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                    <strong>Redis</strong>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>BullMQ Queue & Cache</div>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                    <strong>File Storage</strong>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>PDF & CSV Export Store</div>
                  </div>
                </div>
              </div>

              {/* External APIs Card */}
              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Share2 size={18} color="var(--accent-purple)" />
                  <strong style={{ fontSize: '0.92rem' }}>External APIs</strong>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OAuth Provider Ingestion</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>𝕏 X (Twitter)</span>
                    <span className="badge badge-positive" style={{ fontSize: '0.62rem' }}>Essential</span>
                  </div>
                  <div style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>✈️ Telegram</span>
                    <span className="badge badge-positive" style={{ fontSize: '0.62rem' }}>Essential</span>
                  </div>
                  <div style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>📷 Instagram</span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.62rem' }}>Tier 2</span>
                  </div>
                  <div style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>🌐 Facebook</span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.62rem' }}>Tier 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continuous Ingestion Queue Pipeline Flow */}
          <div className="analytics-card">
            <div className="card-title-row">
              <h3>
                <Cpu size={18} color="var(--accent-amber)" />
                Continuous Data Collection & AI Pipeline (Redis + BullMQ)
              </h3>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '8px',
                padding: '16px 0',
              }}
            >
              {[
                { label: 'Social Platform APIs', sub: 'X, Telegram Webhooks' },
                { label: 'Provider Adapters', sub: 'Normalizing Payload' },
                { label: 'BullMQ Queue', sub: 'Redis Priority Pipeline' },
                { label: 'Background Worker', sub: 'PostgreSQL Ingestion' },
                { label: 'AI NLP Pipeline', sub: 'Sentiment & Emotion Scoring' },
                { label: 'Analytics DB', sub: 'Time-series Aggregation' },
              ].map((step, idx) => (
                <React.Fragment key={step.label}>
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      textAlign: 'center',
                      minWidth: '130px',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                      {step.label}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {step.sub}
                    </div>
                  </div>
                  {idx < 5 && <ArrowRight size={14} color="var(--primary)" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ERD' && (
        <div className="analytics-card">
          <div className="card-title-row">
            <h3>
              <Database size={18} color="var(--primary)" />
              Database Schema (Simplified ERD)
            </h3>
            <span className="badge badge-positive">PostgreSQL 16 Engine</span>
          </div>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Multi-tenant entity relationship schema with time-series indexing on <code>account_id + metric_type + timestamp</code> for high-velocity analytics queries.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {[
              {
                table: 'users',
                fields: ['id (PK, uuid)', 'name (text)', 'email (unique)', 'password_hash (bcrypt)', 'role (enum: Admin/Analyst/Viewer)', 'created_at (timestamp)'],
              },
              {
                table: 'social_accounts',
                fields: ['id (PK, uuid)', 'user_id (FK -> users.id)', 'platform (varchar)', 'platform_user_id (varchar)', 'access_token (encrypted)', 'refresh_token (encrypted)', 'created_at (timestamp)'],
              },
              {
                table: 'posts',
                fields: ['id (PK, uuid)', 'account_id (FK -> social_accounts.id)', 'platform_post_id (varchar)', 'content (text)', 'created_at (timestamp)', 'metrics_json (jsonb)'],
              },
              {
                table: 'analytics_metrics',
                fields: ['id (PK, uuid)', 'post_id (FK -> posts.id)', 'metric_type (varchar)', 'value (numeric)', 'timestamp (indexed)'],
              },
              {
                table: 'competitors',
                fields: ['id (PK, uuid)', 'user_id (FK -> users.id)', 'name (varchar)', 'platform (varchar)', 'profile_url (text)', 'followers (int)'],
              },
              {
                table: 'alerts',
                fields: ['id (PK, uuid)', 'user_id (FK -> users.id)', 'condition (text)', 'threshold (numeric)', 'is_active (boolean)'],
              },
              {
                table: 'reports',
                fields: ['id (PK, uuid)', 'user_id (FK -> users.id)', 'type (varchar: PDF/CSV)', 'schedule (varchar)', 'last_run_at (timestamp)'],
              },
            ].map((ent) => (
              <div
                key={ent.table}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--bg-card-hover)',
                    padding: '8px 12px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--primary)',
                    borderBottom: '1px solid var(--border-color)',
                  }}
                >
                  {ent.table}
                </div>
                <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {ent.fields.map((f) => (
                    <div key={f} style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Monorepo' && (
        <div className="analytics-card">
          <div className="card-title-row">
            <h3>
              <FolderGit2 size={18} color="var(--primary)" />
              Project Structure (Monorepo)
            </h3>
          </div>

          <pre
            style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '18px 22px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontFamily: 'monospace',
              fontSize: '0.84rem',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
            }}
          >{`social-media-analytics/
├── frontend/             # React + TypeScript + Vite Dashboard
├── backend/              # Node.js + Express REST API Server
├── shared/               # Shared TypeScript types and validators (Zod)
├── docker/               # Docker configuration and compose profiles
├── docs/                 # API docs, architecture diagrams, Swagger
├── scripts/              # DB migrations and synthetic seed data
├── .github/              # CI/CD workflows and automated test suites
├── README.md             # Comprehensive engineering setup guide
├── .env.example          # Environment secrets template
└── docker-compose.yml    # Full stack local orchestration (Postgres, Redis, Express, Vite)`}</pre>
        </div>
      )}

      {activeTab === 'QuickStart' && (
        <div className="analytics-card">
          <div className="card-title-row">
            <h3>
              <Terminal size={18} color="var(--primary)" />
              Quick Start (Local Development)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                step: 1,
                title: 'Clone the repository',
                cmd: 'git clone https://github.com/social-analytics/social-media-analytics.git\ncd social-media-analytics',
              },
              {
                step: 2,
                title: 'Configure environment variables',
                cmd: 'cp .env.example .env # update with OAuth secrets and DB strings',
              },
              {
                step: 3,
                title: 'Start with Docker Compose',
                cmd: 'docker-compose up --build',
              },
              {
                step: 4,
                title: 'Run PostgreSQL database migrations',
                cmd: 'docker-compose exec backend npm run migrate',
              },
              {
                step: 5,
                title: 'Access the intelligence platform',
                cmd: 'Frontend: http://localhost:3000 | Backend API: http://localhost:5000/api',
              },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  display: 'flex',
                  gap: '14px',
                  backgroundColor: 'var(--bg-surface)',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    flexShrink: 0,
                  }}
                >
                  {s.step}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.86rem', marginBottom: '6px' }}>
                    {s.title}
                  </div>
                  <pre
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      color: 'var(--primary)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    {s.cmd}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

