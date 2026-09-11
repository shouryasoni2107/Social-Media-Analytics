import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  FileText,
  Download,
  Calendar,
  Clock,
  Eye,
  CheckCircle2,
  Mail,
  Plus,
} from 'lucide-react';
import { ReportItem } from '../../types';

export const ReportsView: React.FC = () => {
  const {
    reports,
    generateReport,
    downloadCsvReport,
    setSelectedReportForPreview,
    setReportPreviewModalOpen,
    addToast,
  } = useAnalytics();

  const [scheduleActive, setScheduleActive] = useState(true);

  const handlePreview = (report: ReportItem) => {
    setSelectedReportForPreview(report);
    setReportPreviewModalOpen(true);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Automated Reporting & Intelligence Exports</h1>
          <p>
            Generate stakeholder-ready PDF summaries, export raw time-series CSVs, and configure recurring delivery schedules.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-outline" onClick={downloadCsvReport}>
            <Download size={15} />
            <span>Export Raw CSV</span>
          </button>
          <button
            className="btn-primary"
            onClick={() => generateReport('Weekly', 'PDF')}
          >
            <Plus size={16} />
            <span>Generate PDF Report</span>
          </button>
        </div>
      </div>

      {/* Automated Scheduling Card (Section 14) */}
      <div
        style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Mail size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Weekly Automated Stakeholder Dispatch
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Every Monday at 9:00 AM UTC → Auto-compile executive intelligence PDF → Email to marketing stakeholders.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              setScheduleActive(!scheduleActive);
              addToast('info', 'Schedule Updated', scheduleActive ? 'Automated dispatch paused' : 'Automated dispatch resumed (Every Monday 9:00 AM)');
            }}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: scheduleActive ? 'var(--sentiment-pos-bg)' : 'var(--bg-surface)',
              color: scheduleActive ? 'var(--sentiment-pos-text)' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <CheckCircle2 size={14} />
            <span>{scheduleActive ? 'Automated Dispatch Active' : 'Dispatch Paused'}</span>
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="analytics-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '35%' }}>Report Document</th>
                <th>Cadence</th>
                <th>Format</th>
                <th>Generated Timestamp</th>
                <th>File Size</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((rep) => (
                <tr key={rep.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: rep.format === 'PDF' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                          color: rep.format === 'PDF' ? '#ef4444' : '#10b981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.72rem',
                        }}
                      >
                        {rep.format}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                          {rep.title}
                        </div>
                        {rep.scheduledDay && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            Recurring: {rep.scheduledDay}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="platform-badge">{rep.period}</span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.78rem' }}>{rep.format}</strong>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {rep.generatedAt}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {rep.fileSize}
                  </td>
                  <td>
                    <span className="badge badge-positive">Ready</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {rep.format === 'PDF' ? (
                        <button
                          className="btn-outline"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          onClick={() => handlePreview(rep)}
                        >
                          <Eye size={13} />
                          <span>Preview PDF</span>
                        </button>
                      ) : (
                        <button
                          className="btn-outline"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          onClick={downloadCsvReport}
                        >
                          <Download size={13} />
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

