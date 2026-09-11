import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { KpiCards } from '../dashboard/KpiCards';
import { FollowerGrowthChart } from '../dashboard/FollowerGrowthChart';
import { SentimentDonut } from '../dashboard/SentimentDonut';
import { TrendingTopicsCard } from '../dashboard/TrendingTopicsCard';
import { TopPostsTable } from '../dashboard/TopPostsTable';
import { DemographicsCard } from '../dashboard/DemographicsCard';
import { CompetitorCard } from '../dashboard/CompetitorCard';
import { RecentAlertsCard } from '../dashboard/RecentAlertsCard';
import { Plus } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { setConnectModalOpen } = useAnalytics();

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Dashboard</h1>
          <p>Overview of your social media performance across all platforms.</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setConnectModalOpen(true)}
        >
          <Plus size={16} />
          <span>Connect Account</span>
        </button>
      </div>

      {/* 4 KPI Metrics */}
      <KpiCards />

      {/* Top 3-Card Analytics Row */}
      <div className="dashboard-main-grid">
        <FollowerGrowthChart />
        <SentimentDonut />
        <TrendingTopicsCard />
      </div>

      {/* Bottom 3-Card Breakdown Row */}
      <div className="dashboard-bottom-grid">
        <TopPostsTable />
        <DemographicsCard />
        <CompetitorCard />
      </div>

      {/* Alerts Highlight Bar */}
      <RecentAlertsCard />
    </div>
  );
};

