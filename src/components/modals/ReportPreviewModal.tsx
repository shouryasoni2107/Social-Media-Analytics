import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  X,
  Printer,
  Download,
  FileCheck,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const ReportPreviewModal: React.FC = () => {
  const {
    reportPreviewModalOpen,
    setReportPreviewModalOpen,
    selectedReportForPreview,
    kpis,
    topics,
    competitors,
  } = useAnalytics();

  if (!reportPreviewModalOpen || !selectedReportForPreview) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={() => setReportPreviewModalOpen(false)}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '820px', padding: '32px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCheck size={24} color="var(--primary)" />
            <div>
              <h2 style={{ fontSize: '1.25rem' }}>{selectedReportForPreview.title}</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Executive Intelligence PDF • Generated on {selectedReportForPreview.generatedAt}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="btn-outline" onClick={handlePrint} style={{ padding: '6px 12px' }}>
              <Printer size={15} />
              <span>Print / Save as PDF</span>
            </button>
            <button className="modal-close-btn" onClick={() => setReportPreviewModalOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Document Preview Content */}
        <div
          id="printable-report"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Executive Header */}
          <div style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                  Social Audience Intelligence Report
                </h1>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Reporting Cadence: {selectedReportForPreview.period} • Prepared by Sanjana (Analyst)
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-positive" style={{ fontSize: '0.72rem' }}>
                  AI Certified Data
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', color: 'var(--primary)' }}>
              1. Executive Summary
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              During this reporting cycle, aggregated community scale reached <strong>{kpis.totalFollowers.value}</strong> followers (+12.5% MoM), driven predominantly by high-velocity conversations in <strong>#AI</strong> (+320% growth) and <strong>#ClimateAction</strong> (+210%). Overall audience sentiment stabilized at <strong>68% Positive</strong>, with sarcasm and critical pricing discourse effectively isolated within Cluster #3.
            </p>
          </div>

          {/* Section 2: Core KPI Performance */}
          <div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '10px', color: 'var(--primary)' }}>
              2. KPI Performance Snapshot
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {[
                { label: 'Followers', val: kpis.totalFollowers.value, chg: kpis.totalFollowers.change },
                { label: 'Engagement', val: kpis.engagementRate.value, chg: kpis.engagementRate.change },
                { label: 'Total Reach', val: kpis.totalReach.value, chg: kpis.totalReach.change },
                { label: 'Impressions', val: kpis.totalImpressions.value, chg: kpis.totalImpressions.change },
              ].map((k) => (
                <div
                  key={k.label}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{k.label}</span>
                  <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{k.val}</div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    {k.chg}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Trending Topics */}
          <div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', color: 'var(--primary)' }}>
              3. Top Emerging Topics & Growth Velocity
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {topics.slice(0, 3).map((t) => (
                <div
                  key={t.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: 'var(--bg-card)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{t.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{t.mentions.toLocaleString()} mentions</span>
                  <strong style={{ color: 'var(--accent-emerald)' }}>+{t.growth}% growth</strong>
                  <span className="badge badge-positive" style={{ fontSize: '0.65rem' }}>
                    {t.positivePct}% Positive
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Competitor Benchmark */}
          <div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '8px', color: 'var(--primary)' }}>
              4. Competitor Benchmarking Matrix
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {competitors.slice(0, 3).map((comp) => (
                <div
                  key={comp.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: comp.isYou ? 'var(--primary-light)' : 'var(--bg-card)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{comp.name}</span>
                  <span>{(comp.followers / 1000).toFixed(0)}K followers</span>
                  <span><strong>{comp.engagementRate}%</strong> Eng. Rate</span>
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>+{comp.growth}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

