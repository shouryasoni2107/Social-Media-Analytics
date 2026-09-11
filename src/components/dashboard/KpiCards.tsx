import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { Users, Heart, BarChart3, Eye, ArrowUpRight } from 'lucide-react';

export const KpiCards: React.FC = () => {
  const { kpis } = useAnalytics();

  const cards = [
    {
      label: 'Total Followers',
      value: kpis.totalFollowers.value,
      change: kpis.totalFollowers.change,
      isPositive: kpis.totalFollowers.isPositive,
      icon: Users,
      iconBg: 'rgba(59, 130, 246, 0.12)',
      iconColor: '#3b82f6',
    },
    {
      label: 'Engagement Rate',
      value: kpis.engagementRate.value,
      change: kpis.engagementRate.change,
      isPositive: kpis.engagementRate.isPositive,
      icon: Heart,
      iconBg: 'rgba(236, 72, 153, 0.12)',
      iconColor: '#ec4899',
    },
    {
      label: 'Total Reach',
      value: kpis.totalReach.value,
      change: kpis.totalReach.change,
      isPositive: kpis.totalReach.isPositive,
      icon: BarChart3,
      iconBg: 'rgba(16, 185, 129, 0.12)',
      iconColor: '#10b981',
    },
    {
      label: 'Total Impressions',
      value: kpis.totalImpressions.value,
      change: kpis.totalImpressions.change,
      isPositive: kpis.totalImpressions.isPositive,
      icon: Eye,
      iconBg: 'rgba(99, 102, 241, 0.12)',
      iconColor: '#6366f1',
    },
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div key={idx} className="kpi-card">
            <div className="kpi-header">
              <span className="kpi-label">{card.label}</span>
              <div
                className="kpi-icon-wrapper"
                style={{ backgroundColor: card.iconBg, color: card.iconColor }}
              >
                <Icon size={19} />
              </div>
            </div>
            <div className="kpi-value">{card.value}</div>
            <div className="kpi-trend positive">
              <ArrowUpRight size={15} />
              <span>{card.change}</span>
              <span className="kpi-trend-subtext">vs last period</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

