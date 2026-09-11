import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  Search,
  Calendar,
  Bell,
  Sun,
  Moon,
  Plus,
  RefreshCw,
  Check,
  AlertTriangle,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    theme,
    toggleTheme,
    dateRange,
    setDateRange,
    searchQuery,
    setSearchQuery,
    unreadAlertsCount,
    recentAlerts,
    markAlertAsRead,
    setConnectModalOpen,
    triggerSync,
    isSyncing,
    setActiveTab,
  } = useAnalytics();

  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const dateOptions = [
    'Aug 1, 2025 – Aug 31, 2025',
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'Year to Date (2025)',
  ];

  return (
    <header className="header">
      <div className="header-search">
        <Search className="header-search-icon" size={16} />
        <input
          type="text"
          placeholder="Search topics, posts, influencers, accounts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="header-actions">
        {/* Real-time Sync Action */}
        <button
          className="btn-outline"
          onClick={() => triggerSync()}
          disabled={isSyncing}
          title="Run continuous data collection pipeline"
          style={{ height: '38px', padding: '0 12px' }}
        >
          <RefreshCw size={15} className={isSyncing ? 'animate-spin' : ''} />
          <span>{isSyncing ? 'Syncing...' : 'Sync Streams'}</span>
        </button>

        {/* Date Range Selector */}
        <div style={{ position: 'relative' }}>
          <div
            className="date-range-badge"
            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
          >
            <Calendar size={14} />
            <span>{dateRange}</span>
          </div>

          {dateDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                minWidth: '220px',
                zIndex: 60,
              }}
            >
              {dateOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setDateRange(opt);
                    setDateDropdownOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    background: dateRange === opt ? 'var(--primary-light)' : 'transparent',
                    color: dateRange === opt ? 'var(--primary)' : 'var(--text-primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{opt}</span>
                  {dateRange === opt && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            title="Recent intelligence alerts"
          >
            <Bell size={18} />
            {unreadAlertsCount > 0 && <span className="badge-dot" />}
          </button>

          {notificationsOpen && (
            <div
              style={{
                position: 'absolute',
                top: '110%',
                right: 0,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                width: '320px',
                zIndex: 60,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>Recent Alerts</span>
                <button
                  onClick={() => {
                    setActiveTab('alerts');
                    setNotificationsOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  View All
                </button>
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => markAlertAsRead(alert.id)}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                      backgroundColor: alert.isRead ? 'transparent' : 'var(--bg-card-hover)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <AlertTriangle
                        size={14}
                        color={alert.severity === 'warning' ? 'var(--accent-amber)' : 'var(--primary)'}
                      />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{alert.title}</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      {alert.message}
                    </p>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {alert.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle (Light / Dark) */}
        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Connect Account CTA */}
        <button
          className="btn-primary"
          onClick={() => setConnectModalOpen(true)}
        >
          <Plus size={16} />
          <span>Connect Account</span>
        </button>
      </div>
    </header>
  );
};

