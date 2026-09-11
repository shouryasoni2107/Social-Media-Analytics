import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  SocialPlatform,
  UserRole,
  SocialAccount,
  PostItem,
  TrendingTopic,
  CompetitorData,
  AlertRule,
  RecentAlert,
  ReportItem,
  SentimentType,
  EmotionType,
  PostComment,
} from '../types';
import {
  socialAccountsData,
  postsData,
  trendingTopicsData,
  competitorsData,
  alertRulesData,
  recentAlertsData,
  reportsData,
  initialKpis,
} from '../data/mockData';
import confetti from 'canvas-confetti';

export type ActiveTab =
  | 'dashboard'
  | 'accounts'
  | 'content'
  | 'audience'
  | 'trends'
  | 'network'
  | 'competitors'
  | 'reports'
  | 'alerts'
  | 'settings';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
}

interface AnalyticsContextType {
  // Navigation & User
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  isLoggedIn: boolean;
  logout: () => void;
  login: (name: string, email: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlatform: 'All' | SocialPlatform;
  setSelectedPlatform: (p: 'All' | SocialPlatform) => void;

  // Data & State
  kpis: typeof initialKpis;
  accounts: SocialAccount[];
  connectAccount: (platform: SocialPlatform, handle: string, name: string) => void;
  disconnectAccount: (id: string) => void;
  triggerSync: (id?: string) => void;
  isSyncing: boolean;
  syncStep: number;

  posts: PostItem[];
  addPostComment: (postId: string, commentText: string) => void;

  topics: TrendingTopic[];
  selectedTopic: TrendingTopic | null;
  setSelectedTopic: (topic: TrendingTopic | null) => void;

  competitors: CompetitorData[];
  addCompetitor: (competitor: Omit<CompetitorData, 'id'>) => void;

  alertRules: AlertRule[];
  addAlertRule: (rule: Omit<AlertRule, 'id' | 'createdAt'>) => void;
  toggleAlertRule: (id: string) => void;

  recentAlerts: RecentAlert[];
  markAlertAsRead: (id: string) => void;
  unreadAlertsCount: number;

  reports: ReportItem[];
  generateReport: (period: ReportItem['period'], format: ReportItem['format'], title?: string) => void;
  downloadCsvReport: () => void;

  // Modals
  connectModalOpen: boolean;
  setConnectModalOpen: (open: boolean) => void;
  postDetailPost: PostItem | null;
  setPostDetailPost: (post: PostItem | null) => void;
  addCompetitorModalOpen: boolean;
  setAddCompetitorModalOpen: (open: boolean) => void;
  createAlertModalOpen: boolean;
  setCreateAlertModalOpen: (open: boolean) => void;
  reportPreviewModalOpen: boolean;
  setReportPreviewModalOpen: (open: boolean) => void;
  selectedReportForPreview: ReportItem | null;
  setSelectedReportForPreview: (rep: ReportItem | null) => void;
  syncModalOpen: boolean;
  setSyncModalOpen: (open: boolean) => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, description: string) => void;
  removeToast: (id: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('Analyst');
  const [userName, setUserName] = useState<string>('Sanjana');
  const [userEmail, setUserEmail] = useState<string>('sanjana@socialanalytics.ai');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [dateRange, setDateRange] = useState<string>('Aug 1, 2025 – Aug 31, 2025');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<'All' | SocialPlatform>('All');

  const [kpis] = useState(initialKpis);
  const [accounts, setAccounts] = useState<SocialAccount[]>(socialAccountsData);
  const [posts, setPosts] = useState<PostItem[]>(postsData);
  const [topics] = useState<TrendingTopic[]>(trendingTopicsData);
  const [selectedTopic, setSelectedTopic] = useState<TrendingTopic | null>(null);
  const [competitors, setCompetitors] = useState<CompetitorData[]>(competitorsData);
  const [alertRules, setAlertRules] = useState<AlertRule[]>(alertRulesData);
  const [recentAlerts, setRecentAlerts] = useState<RecentAlert[]>(recentAlertsData);
  const [reports, setReports] = useState<ReportItem[]>(reportsData);

  // Modals state
  const [connectModalOpen, setConnectModalOpen] = useState<boolean>(false);
  const [postDetailPost, setPostDetailPost] = useState<PostItem | null>(null);
  const [addCompetitorModalOpen, setAddCompetitorModalOpen] = useState<boolean>(false);
  const [createAlertModalOpen, setCreateAlertModalOpen] = useState<boolean>(false);
  const [reportPreviewModalOpen, setReportPreviewModalOpen] = useState<boolean>(false);
  const [selectedReportForPreview, setSelectedReportForPreview] = useState<ReportItem | null>(null);
  const [syncModalOpen, setSyncModalOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStep, setSyncStep] = useState<number>(0);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, description: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  useEffect(() => {
    // initialize theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Social account connection
  const connectAccount = (platform: SocialPlatform, handle: string, name: string) => {
    const newAccount: SocialAccount = {
      id: `acc-${Date.now()}`,
      platform,
      accountName: name || `${platform} Profile`,
      handle: handle.startsWith('@') ? handle : `@${handle}`,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop',
      status: 'connected',
      lastSync: 'Just now',
      followersCount: Math.floor(Math.random() * 40000) + 10000,
      tokenEncrypted: true,
      postsCount: Math.floor(Math.random() * 200) + 50,
    };
    setAccounts((prev) => [newAccount, ...prev.filter((a) => a.platform !== platform)]);
    setConnectModalOpen(false);
    addToast('success', 'Platform Connected', `Successfully linked and encrypted OAuth token for ${platform} (${handle})`);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
  };

  const disconnectAccount = (id: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, status: 'disconnected', lastSync: 'Never' } : acc
      )
    );
    addToast('info', 'Account Disconnected', 'OAuth authorization revoked and session invalidated.');
  };

  // Live Data Ingestion Simulation
  const triggerSync = (id?: string) => {
    setIsSyncing(true);
    setSyncStep(1);
    setSyncModalOpen(true);

    const steps = [
      { step: 1, delay: 900, msg: 'Querying Social Platform APIs (X & Telegram endpoints)...' },
      { step: 2, delay: 1800, msg: 'Provider Adapters normalizing payloads to Common Data Model...' },
      { step: 3, delay: 2700, msg: 'Pushing ingestion jobs to Redis / BullMQ priority queue...' },
      { step: 4, delay: 3600, msg: 'Background Workers validating & upserting to PostgreSQL...' },
      { step: 5, delay: 4500, msg: 'NLP Pipeline running sentiment, emotion & topic inference...' },
      { step: 6, delay: 5400, msg: 'Aggregating time-series metrics into Analytics Database...' },
    ];

    steps.forEach(({ step, delay }) => {
      setTimeout(() => {
        setSyncStep(step);
      }, delay);
    });

    setTimeout(() => {
      setIsSyncing(false);
      setAccounts((prev) =>
        prev.map((acc) =>
          !id || acc.id === id ? { ...acc, status: 'connected', lastSync: 'Just now' } : acc
        )
      );
      addToast('success', 'Data Sync Complete', 'All social streams, sentiment scores, and network clusters refreshed.');
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    }, 6200);
  };

  const addPostComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    const isSarcastic = commentText.toLowerCase().includes('amazing') || commentText.toLowerCase().includes('🙃');
    const isNegative = isSarcastic || commentText.toLowerCase().includes('bad') || commentText.toLowerCase().includes('worse');
    const sentiment: SentimentType = isNegative ? 'Negative' : 'Positive';
    const emotion: EmotionType = isSarcastic ? 'Sarcastic' : isNegative ? 'Angry' : 'Supportive';

    const newComment: PostComment = {
      id: `c-${Date.now()}`,
      author: '@viewer_analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop',
      text: commentText,
      sentiment,
      emotion,
      confidence: 0.88,
      timestamp: 'Just now',
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            metrics: { ...p.metrics, comments: p.metrics.comments + 1 },
            commentsList: [newComment, ...p.commentsList],
          };
        }
        return p;
      })
    );

    if (postDetailPost && postDetailPost.id === postId) {
      setPostDetailPost((prev) =>
        prev ? { ...prev, commentsList: [newComment, ...prev.commentsList] } : null
      );
    }

    addToast('success', 'Comment Analyzed', `AI scored sentiment: ${sentiment} (${emotion})`);
  };

  const addCompetitor = (competitor: Omit<CompetitorData, 'id'>) => {
    const newComp: CompetitorData = {
      ...competitor,
      id: `comp-${Date.now()}`,
    };
    setCompetitors((prev) => [...prev, newComp]);
    setAddCompetitorModalOpen(false);
    addToast('success', 'Competitor Added', `Tracking ${competitor.name} benchmarking metrics.`);
  };

  const addAlertRule = (rule: Omit<AlertRule, 'id' | 'createdAt'>) => {
    const newRule: AlertRule = {
      ...rule,
      id: `rule-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAlertRules((prev) => [newRule, ...prev]);
    setCreateAlertModalOpen(false);
    addToast('success', 'Alert Rule Activated', `Configured trigger for ${rule.metric}`);
  };

  const toggleAlertRule = (id: string) => {
    setAlertRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  const markAlertAsRead = (id: string) => {
    setRecentAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  };

  const unreadAlertsCount = recentAlerts.filter((a) => !a.isRead).length;

  const generateReport = (period: ReportItem['period'], format: ReportItem['format'], title?: string) => {
    const newReport: ReportItem = {
      id: `rep-${Date.now()}`,
      title: title || `${period} Social Audience Intelligence & KPI Report`,
      period,
      format,
      generatedAt: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      status: 'ready',
      fileSize: format === 'PDF' ? '4.2 MB' : '850 KB',
    };
    setReports((prev) => [newReport, ...prev]);
    addToast('success', 'Report Generated', `${newReport.title} is now ready to download.`);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
  };

  const downloadCsvReport = () => {
    const headers = ['Post ID', 'Platform', 'Content', 'Likes', 'Comments', 'Shares', 'Reach', 'Sentiment', 'Emotion'];
    const rows = posts.map((p) => [
      p.id,
      p.platform,
      `"${p.content.replace(/"/g, '""')}"`,
      p.metrics.likes,
      p.metrics.comments,
      p.metrics.shares,
      p.metrics.reach,
      p.sentiment,
      p.emotion,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SocialAnalytics_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('success', 'Export Downloaded', 'CSV raw post and sentiment data downloaded successfully.');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  const login = (name: string, email: string) => {
    setUserName(name || 'Sanjana');
    setUserEmail(email || 'sanjana@socialanalytics.ai');
    setIsLoggedIn(true);
    addToast('success', 'Welcome Back', `Logged in as ${name || 'Sanjana'}`);
  };

  return (
    <AnalyticsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        userRole,
        setUserRole,
        setUserName,
        userEmail,
        setUserEmail,
        isLoggedIn,
        logout,
        login,
        userName,

        theme,
        toggleTheme,
        dateRange,
        setDateRange,
        searchQuery,
        setSearchQuery,
        selectedPlatform,
        setSelectedPlatform,
        kpis,
        accounts,
        connectAccount,
        disconnectAccount,
        triggerSync,
        isSyncing,
        syncStep,
        posts,
        addPostComment,
        topics,
        selectedTopic,
        setSelectedTopic,
        competitors,
        addCompetitor,
        alertRules,
        addAlertRule,
        toggleAlertRule,
        recentAlerts,
        markAlertAsRead,
        unreadAlertsCount,
        reports,
        generateReport,
        downloadCsvReport,
        connectModalOpen,
        setConnectModalOpen,
        postDetailPost,
        setPostDetailPost,
        addCompetitorModalOpen,
        setAddCompetitorModalOpen,
        createAlertModalOpen,
        setCreateAlertModalOpen,
        reportPreviewModalOpen,
        setReportPreviewModalOpen,
        selectedReportForPreview,
        setSelectedReportForPreview,
        syncModalOpen,
        setSyncModalOpen,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

