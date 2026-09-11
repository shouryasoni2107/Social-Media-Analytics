import React from 'react';
import { useAnalytics, ActiveTab } from '../../context/AnalyticsContext';
import {
  LayoutDashboard,
  Users2,
  FileText,
  Users,
  TrendingUp,
  BarChart3,
  FileSpreadsheet,
  Bell,
  Layers,
  Settings,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { UserRole } from '../../types';

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unreadAlertsCount,
    userName,
    userRole,
    setUserRole,
    logout,
  } = useAnalytics();

  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ size?: number }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'accounts', label: 'Accounts', icon: Users2 },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'audience', label: 'Audience', icon: Users },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'network', label: 'Network Graph', icon: Layers },
    { id: 'competitors', label: 'Competitors', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlertsCount },
  ];

  const systemItems: { id: ActiveTab; label: string; icon: React.FC<{ size?: number }> }[] = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setRoleDropdownOpen(false);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-logo-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h4v8H3v-8zm7-8h4v16h-4V5zm7 5h4v11h-4V10z" />
          </svg>
        </div>
        <div>
          <div className="brand-title">
            SocialAnalytics
            <span className="mvp-pill">MVP</span>
          </div>
        </div>
      </div>

      <div className="sidebar-nav">
        <div className="nav-section-label">Intelligence Suite</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </button>
          );
        })}

        <div className="nav-section-label" style={{ marginTop: '12px' }}>System & Governance</div>
        {systemItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Logout button */}
        <button
          className="nav-item"
          onClick={logout}
          style={{ color: 'var(--sentiment-negative)', marginTop: '4px' }}
          title="Sign out"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      <div className="sidebar-footer" style={{ position: 'relative' }}>
        {roleDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '12px',
              right: '12px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '6px',
              boxShadow: 'var(--shadow-lg)',
              marginBottom: '8px',
              zIndex: 50,
            }}
          >
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', padding: '6px 8px', fontWeight: 600 }}>
              SWITCH RBAC ROLE
            </div>
            {(['Admin', 'Analyst', 'Viewer'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleChange(r)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '7px 10px',
                  background: userRole === r ? 'var(--primary-light)' : 'transparent',
                  color: userRole === r ? 'var(--primary)' : 'var(--text-primary)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  fontWeight: userRole === r ? 600 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{r}</span>
                {userRole === r && <span style={{ fontSize: '0.75rem' }}>✓</span>}
              </button>
            ))}
          </div>
        )}

        <div
          className="user-profile-card"
          onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
          style={{ cursor: 'pointer' }}
          title="Click to switch user role"
        >
          <div className="user-avatar">
            {userName.charAt(0)}
          </div>
          <div className="user-info">
            <div className="user-name">{userName}</div>
            <div className="user-role-badge">
              <span>{userRole}</span>
              <ChevronDown size={12} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

