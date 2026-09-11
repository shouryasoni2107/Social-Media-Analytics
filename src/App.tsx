import React, { useState } from 'react';
import { AnalyticsProvider, useAnalytics } from './context/AnalyticsContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// Views
import { DashboardView } from './components/views/DashboardView';
import { AccountsView } from './components/views/AccountsView';
import { ContentView } from './components/views/ContentView';
import { AudienceView } from './components/views/AudienceView';
import { TrendsView } from './components/views/TrendsView';
import { NetworkView } from './components/views/NetworkView';
import { CompetitorsView } from './components/views/CompetitorsView';
import { ReportsView } from './components/views/ReportsView';
import { AlertsView } from './components/views/AlertsView';
import { SettingsView } from './components/views/SettingsView';

// Modals
import { ConnectAccountModal } from './components/modals/ConnectAccountModal';
import { TopicDetailModal } from './components/modals/TopicDetailModal';
import { PostDetailModal } from './components/modals/PostDetailModal';
import { AddCompetitorModal } from './components/modals/AddCompetitorModal';
import { CreateAlertModal } from './components/modals/CreateAlertModal';
import { ReportPreviewModal } from './components/modals/ReportPreviewModal';
import { SyncPipelineModal } from './components/modals/SyncPipelineModal';
import { ToastContainer } from './components/ui/ToastContainer';

import {
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  Lock,
  Eye,
  Mail,
  User,
} from 'lucide-react';

/* ── Login Screen ── */
const LoginScreen: React.FC = () => {
  const { login } = useAnalytics();
  const [name, setName] = useState('Sanjana');
  const [email, setEmail] = useState('sanjana@socialanalytics.ai');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(name, email);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background orbs */}
      <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', top: '-100px', right: '-100px', animation: 'pulse 4s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)', bottom: '-80px', left: '-80px', animation: 'pulse 5s ease-in-out infinite 1s' }} />

      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(30, 41, 59, 0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: '40px 36px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(37,99,235,0.3)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M3 13h4v8H3v-8zm7-8h4v16h-4V5zm7 5h4v11h-4V10z" />
            </svg>
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>
              SocialAnalytics
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', fontWeight: 500 }}>
              AI-Powered Intelligence Platform
            </div>
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', marginBottom: '28px', lineHeight: 1.5 }}>
          Sign in to access your sentiment analysis dashboard, trend intelligence, and audience insights.
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <User size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
              <input
                type="text"
                placeholder="Display Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 38px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.2)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Mail size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 38px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.2)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Lock size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.35)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 38px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  fontSize: '0.88rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.2)'; }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                <Eye size={16} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(37,99,235,0.3)',
              transition: 'transform 0.15s, box-shadow 0.15s',
              fontFamily: 'Outfit, Inter, sans-serif',
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.target as HTMLButtonElement).style.boxShadow = '0 6px 24px rgba(37,99,235,0.4)'; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.transform = 'translateY(0)'; (e.target as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(37,99,235,0.3)'; }}
          >
            Sign In to Dashboard
          </button>
        </form>

        {/* Features */}
        <div
          style={{
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}
        >
          {[
            { icon: TrendingUp, text: 'Real-time Sentiment' },
            { icon: Users, text: 'Audience Intelligence' },
            { icon: BarChart3, text: 'Competitor Benchmarks' },
            { icon: Zap, text: 'AI-Powered Alerts' },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={13} color="rgba(37,99,235,0.8)" />
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontWeight: 500 }}>{f.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ── Main Layout ── */
const MainLayout: React.FC = () => {
  const { activeTab, isLoggedIn } = useAnalytics();

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'accounts':
        return <AccountsView />;
      case 'content':
        return <ContentView />;
      case 'audience':
        return <AudienceView />;
      case 'trends':
        return <TrendsView />;
      case 'network':
        return <NetworkView />;
      case 'competitors':
        return <CompetitorsView />;
      case 'reports':
        return <ReportsView />;
      case 'alerts':
        return <AlertsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main>{renderActiveView()}</main>
      </div>

      {/* Global Modals & Notifications */}
      <ConnectAccountModal />
      <TopicDetailModal />
      <PostDetailModal />
      <AddCompetitorModal />
      <CreateAlertModal />
      <ReportPreviewModal />
      <SyncPipelineModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AnalyticsProvider>
      <MainLayout />
    </AnalyticsProvider>
  );
}

export default App;

