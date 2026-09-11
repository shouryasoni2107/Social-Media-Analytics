import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  Lock,
  UserCheck,
  LogOut,
  User,
  Mail,
  Camera,
  Save,
  CheckCircle2,
  Layers,
  Database,
  Server,
  Cpu,
  Terminal,
  FolderGit2,
  Share2,
  ArrowRight,
  Code2,
  Settings,
  Shield,
  Wrench,
} from 'lucide-react';
import type { UserRole } from '../../types';

type SettingsTab = 'general' | 'developer' | 'rbac' | 'security';

export const SettingsView: React.FC = () => {
  const { userRole, userName, setUserRole, setUserName, setUserEmail, userEmail, logout, addToast } = useAnalytics();
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTab>('general');

  // Edit profile state
  const [editName, setEditName] = useState(userName);
  const [editEmail, setEditEmail] = useState(userEmail);
  const [profileSaved, setProfileSaved] = useState(false);

  // Developer sub-tab
  const [devTab, setDevTab] = useState<'Architecture' | 'ERD' | 'Monorepo' | 'QuickStart'>('Architecture');

  const handleSaveProfile = () => {
    if (!editName.trim()) return;
    setUserName(editName.trim());
    setUserEmail(editEmail.trim());
    setProfileSaved(true);
    addToast('success', 'Profile Updated', `User information updated successfully.`);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const settingsTabs: { id: SettingsTab; label: string; icon: React.FC<{ size?: number }> }[] = [
    { id: 'general', label: 'General', icon: User },
    { id: 'developer', label: 'Developer', icon: Wrench },
    { id: 'rbac', label: 'Access Control', icon: Shield },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Settings & System Governance</h1>
          <p>
            Manage your profile, explore system architecture, configure access control, and review security settings.
          </p>
        </div>
        <button
          className="btn-outline"
          onClick={logout}
          style={{
            color: 'var(--sentiment-negative)',
            borderColor: 'var(--sentiment-negative)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          title="Logout and end session"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="tab-pills" style={{ marginBottom: '24px' }}>
        {settingsTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-pill ${activeSettingsTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveSettingsTab(tab.id)}
              style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── General / Profile Editing ── */}
      {activeSettingsTab === 'general' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="analytics-card" style={{ gridColumn: '1 / -1' }}>
            <div className="card-title-row">
              <h3>
                <User size={18} color="var(--primary)" />
                Edit Profile Information
              </h3>
              {profileSaved && (
                <span className="badge badge-positive" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> Saved
                </span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'start', padding: '8px 0' }}>
              {/* Avatar */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--accent-purple))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '2rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    boxShadow: '0 4px 16px rgba(37, 99, 235, 0.25)',
                  }}
                >
                  {editName.charAt(0).toUpperCase()}
                </div>
                <button
                  className="btn-outline"
                  style={{ fontSize: '0.7rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Camera size={12} /> Change
                </button>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Display Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 10px 10px 34px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-surface)',
                        fontSize: '0.86rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 10px 10px 34px',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        backgroundColor: 'var(--bg-surface)',
                        fontSize: '0.86rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Current Role
                  </label>
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-surface)',
                      fontSize: '0.86rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {userRole} — <span style={{ fontSize: '0.76rem' }}>Managed in Access Control tab</span>
                  </div>
                </div>

                <button
                  className="btn-primary"
                  onClick={handleSaveProfile}
                  style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={15} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Developer / System Architecture ── */}
      {activeSettingsTab === 'developer' && (
        <div>
          <div className="tab-pills" style={{ marginBottom: '20px' }}>
            {(['Architecture', 'ERD', 'Monorepo', 'QuickStart'] as const).map((tab) => (
              <button
                key={tab}
                className={`tab-pill ${devTab === tab ? 'active' : ''}`}
                onClick={() => setDevTab(tab)}
                style={{ padding: '6px 14px' }}
              >
                {tab}
              </button>
            ))}
          </div>

          {devTab === 'Architecture' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="analytics-card">
                <div className="card-title-row">
                  <h3>
                    <Layers size={18} color="var(--primary)" />
                    System Architecture Topology
                  </h3>
                  <span className="badge badge-positive">Production-Ready Micro-Services</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '20px 0' }}>
                  {/* Frontend */}
                  <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Code2 size={18} color="var(--primary)" />
                      <strong style={{ fontSize: '0.92rem' }}>Frontend</strong>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>React + TypeScript + Vite</span>
                    <div style={{ backgroundColor: 'var(--bg-card)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.82rem', textAlign: 'center', fontWeight: 600 }}>
                      Web App (Dashboard)
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>TanStack, Lucide, Canvas</div>
                    </div>
                  </div>

                  {/* Backend */}
                  <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Server size={18} color="var(--accent-emerald)" />
                      <strong style={{ fontSize: '0.92rem' }}>Backend</strong>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Node.js + Express</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {['REST API (Controllers, Services)', 'Auth Service (JWT + RBAC)', 'Background Jobs (Bull + Redis)', 'AI/ML NLP, Trends & Network'].map((item) => (
                        <div key={item} style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', fontWeight: 600 }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Storage */}
                  <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Database size={18} color="var(--accent-cyan)" />
                      <strong style={{ fontSize: '0.92rem' }}>Database & Storage</strong>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Persistence Layer</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        { name: 'PostgreSQL', desc: 'Time-series indexed data' },
                        { name: 'Redis', desc: 'BullMQ Queue & Cache' },
                        { name: 'File Storage', desc: 'PDF & CSV Export Store' },
                      ].map((s) => (
                        <div key={s.name} style={{ padding: '8px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                          <strong>{s.name}</strong>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* External APIs */}
                  <div style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Share2 size={18} color="var(--accent-purple)" />
                      <strong style={{ fontSize: '0.92rem' }}>External APIs</strong>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>OAuth Provider Ingestion</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        { name: '𝕏 X (Twitter)', tier: 'Essential' },
                        { name: '✈️ Telegram', tier: 'Essential' },
                        { name: '📷 Instagram', tier: 'Tier 2' },
                        { name: '🌐 Facebook', tier: 'Tier 2' },
                      ].map((api) => (
                        <div key={api.name} style={{ padding: '6px 10px', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{api.name}</span>
                          <span className={`badge ${api.tier === 'Essential' ? 'badge-positive' : 'badge-neutral'}`} style={{ fontSize: '0.62rem' }}>{api.tier}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pipeline */}
              <div className="analytics-card">
                <div className="card-title-row">
                  <h3>
                    <Cpu size={18} color="var(--accent-amber)" />
                    Continuous Data Collection & AI Pipeline (Redis + BullMQ)
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', padding: '16px 0' }}>
                  {[
                    { label: 'Social Platform APIs', sub: 'X, Telegram Webhooks' },
                    { label: 'Provider Adapters', sub: 'Normalizing Payload' },
                    { label: 'BullMQ Queue', sub: 'Redis Priority Pipeline' },
                    { label: 'Background Worker', sub: 'PostgreSQL Ingestion' },
                    { label: 'AI NLP Pipeline', sub: 'Sentiment & Emotion Scoring' },
                    { label: 'Analytics DB', sub: 'Time-series Aggregation' },
                  ].map((step, idx) => (
                    <React.Fragment key={step.label}>
                      <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', textAlign: 'center', minWidth: '130px' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>{step.label}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>{step.sub}</div>
                      </div>
                      {idx < 5 && <ArrowRight size={14} color="var(--primary)" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          )}

          {devTab === 'ERD' && (
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                {[
                  { table: 'users', fields: ['id (PK, uuid)', 'name (text)', 'email (unique)', 'password_hash (bcrypt)', 'role (enum: Admin/Analyst/Viewer)', 'created_at (timestamp)'] },
                  { table: 'social_accounts', fields: ['id (PK, uuid)', 'user_id (FK -> users.id)', 'platform (varchar)', 'platform_user_id (varchar)', 'access_token (encrypted)', 'refresh_token (encrypted)', 'created_at (timestamp)'] },
                  { table: 'posts', fields: ['id (PK, uuid)', 'account_id (FK -> social_accounts.id)', 'platform_post_id (varchar)', 'content (text)', 'created_at (timestamp)', 'metrics_json (jsonb)'] },
                  { table: 'analytics_metrics', fields: ['id (PK, uuid)', 'post_id (FK -> posts.id)', 'metric_type (varchar)', 'value (numeric)', 'timestamp (indexed)'] },
                  { table: 'competitors', fields: ['id (PK, uuid)', 'user_id (FK -> users.id)', 'name (varchar)', 'platform (varchar)', 'profile_url (text)', 'followers (int)'] },
                  { table: 'alerts', fields: ['id (PK, uuid)', 'user_id (FK -> users.id)', 'condition (text)', 'threshold (numeric)', 'is_active (boolean)'] },
                  { table: 'reports', fields: ['id (PK, uuid)', 'user_id (FK -> users.id)', 'type (varchar: PDF/CSV)', 'schedule (varchar)', 'last_run_at (timestamp)'] },
                ].map((ent) => (
                  <div key={ent.table} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <div style={{ backgroundColor: 'var(--bg-card-hover)', padding: '8px 12px', fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)', borderBottom: '1px solid var(--border-color)' }}>
                      {ent.table}
                    </div>
                    <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {ent.fields.map((f) => (
                        <div key={f} style={{ fontSize: '0.74rem', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{f}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {devTab === 'Monorepo' && (
            <div className="analytics-card">
              <div className="card-title-row">
                <h3>
                  <FolderGit2 size={18} color="var(--primary)" />
                  Project Structure (Monorepo)
                </h3>
              </div>
              <pre style={{ backgroundColor: 'var(--bg-surface)', padding: '18px 22px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
{`social-media-analytics/
├── frontend/             # React + TypeScript + Vite Dashboard
├── backend/              # Node.js + Express REST API Server
├── shared/               # Shared TypeScript types and validators (Zod)
├── docker/               # Docker configuration and compose profiles
├── docs/                 # API docs, architecture diagrams, Swagger
├── scripts/              # DB migrations and synthetic seed data
├── .github/              # CI/CD workflows and automated test suites
├── README.md             # Comprehensive engineering setup guide
├── .env.example          # Environment secrets template
└── docker-compose.yml    # Full stack local orchestration (Postgres, Redis, Express, Vite)`}
              </pre>
            </div>
          )}

          {devTab === 'QuickStart' && (
            <div className="analytics-card">
              <div className="card-title-row">
                <h3>
                  <Terminal size={18} color="var(--primary)" />
                  Quick Start (Local Development)
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { step: 1, title: 'Clone the repository', cmd: 'git clone https://github.com/social-analytics/social-media-analytics.git\ncd social-media-analytics' },
                  { step: 2, title: 'Configure environment variables', cmd: 'cp .env.example .env # update with OAuth secrets and DB strings' },
                  { step: 3, title: 'Start with Docker Compose', cmd: 'docker-compose up --build' },
                  { step: 4, title: 'Run PostgreSQL database migrations', cmd: 'docker-compose exec backend npm run migrate' },
                  { step: 5, title: 'Access the intelligence platform', cmd: 'Frontend: http://localhost:3000 | Backend API: http://localhost:5000/api' },
                ].map((s) => (
                  <div key={s.step} style={{ display: 'flex', gap: '14px', backgroundColor: 'var(--bg-surface)', padding: '14px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                      {s.step}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.86rem', marginBottom: '6px' }}>{s.title}</div>
                      <pre style={{ backgroundColor: 'var(--bg-card)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--primary)', border: '1px solid var(--border-color)' }}>
                        {s.cmd}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── RBAC (Access Control) ── */}
      {activeSettingsTab === 'rbac' && (
        <div className="analytics-card">
          <div className="card-title-row">
            <h3>
              <UserCheck size={18} color="var(--primary)" />
              Role-Based Access Control (RBAC)
            </h3>
            <span className="badge badge-positive">Active: {userRole}</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Current logged in session: <strong>{userName}</strong> ({userRole}).
          </p>

          <table className="data-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Permissions Scope</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(['Admin', 'Analyst', 'Viewer'] as UserRole[]).map((r) => (
                <tr key={r}>
                  <td><strong>{r}</strong></td>
                  <td style={{ fontSize: '0.8rem' }}>
                    {r === 'Admin'
                      ? 'Full system access, integrations, team provisioning'
                      : r === 'Analyst'
                      ? 'Analytics, connect accounts, generate reports, configure alerts'
                      : 'Read-only intelligence dashboard & export viewing'}
                  </td>
                  <td>
                    {userRole === r ? (
                      <span className="badge badge-positive">Active</span>
                    ) : (
                      <button
                        className="btn-outline"
                        style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                        onClick={() => setUserRole(r)}
                      >
                        Switch
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Security & Token Vault ── */}
      {activeSettingsTab === 'security' && (
        <div className="analytics-card">
          <div className="card-title-row">
            <h3>
              <Lock size={18} color="var(--accent-emerald)" />
              OAuth Vault & Secrets Management
            </h3>
            <span className="badge badge-positive">AES-256-GCM</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'OAuth Refresh Token Rotation', desc: 'Auto-rotates expiring platform tokens every 30 days', badge: 'Active' },
              { title: 'Time-Series Indexing (12+ Months)', desc: 'Partitioned PostgreSQL indexing on account_id + timestamp', badge: 'Optimized' },
              { title: 'NLP Inference Model Endpoint', desc: 'Standard Transformer Emotion & Sentiment Pipeline (v2.4)', badge: 'Online (12ms)' },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.85rem' }}>{item.title}</strong>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
                <span className="badge badge-positive">{item.badge}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

