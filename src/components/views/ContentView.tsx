import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  FileText,
  Filter,
  Download,
  Search,
  ArrowUpDown,
  MessageSquare,
  Share2,
  Heart,
  Eye,
} from 'lucide-react';
import { SocialPlatform, SentimentType } from '../../types';

export const ContentView: React.FC = () => {
  const { posts, setPostDetailPost, downloadCsvReport } = useAnalytics();

  const [platformFilter, setPlatformFilter] = useState<string>('All');
  const [sentimentFilter, setSentimentFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('engagement');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (platformFilter !== 'All' && post.platform !== platformFilter) return false;
    if (sentimentFilter !== 'All' && post.sentiment !== sentimentFilter) return false;
    if (
      searchFilter &&
      !post.content.toLowerCase().includes(searchFilter.toLowerCase()) &&
      !post.topics.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'engagement':
        return b.metrics.engagementRate - a.metrics.engagementRate;
      case 'reach':
        return b.metrics.reach - a.metrics.reach;
      case 'comments':
        return b.metrics.comments - a.metrics.comments;
      case 'shares':
        return b.metrics.shares - a.metrics.shares;
      case 'likes':
        return b.metrics.likes - a.metrics.likes;
      case 'sentiment':
        return b.sentimentScore - a.sentimentScore;
      default:
        return 0;
    }
  });

  const getPlatformBadge = (platform: SocialPlatform) => {
    switch (platform) {
      case 'X':
        return <span className="platform-badge" style={{ color: '#3b82f6' }}>𝕏 X</span>;
      case 'Instagram':
        return <span className="platform-badge" style={{ color: '#ec4899' }}>📷 Instagram</span>;
      case 'LinkedIn':
        return <span className="platform-badge" style={{ color: '#0ea5e9' }}>💼 LinkedIn</span>;
      case 'Telegram':
        return <span className="platform-badge" style={{ color: '#10b981' }}>✈️ Telegram</span>;
      default:
        return <span className="platform-badge">{platform}</span>;
    }
  };

  const getSentimentBadge = (sentiment: SentimentType) => {
    switch (sentiment) {
      case 'Positive':
        return <span className="badge badge-positive">Positive</span>;
      case 'Negative':
        return <span className="badge badge-negative">Negative</span>;
      default:
        return <span className="badge badge-neutral">Neutral</span>;
    }
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div className="page-header-text">
          <h1>Content Performance</h1>
          <p>
            Filter, sort, and inspect engagement metrics, reach, and AI emotion classification across posts.
          </p>
        </div>

        <button className="btn-outline" onClick={downloadCsvReport}>
          <Download size={15} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Sorting Toolbar */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search content or #hashtag..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 12px 6px 30px',
                fontSize: '0.82rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>PLATFORM:</span>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="All">All Platforms</option>
              <option value="X">X (Twitter)</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Telegram">Telegram</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>SENTIMENT:</span>
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-primary)',
              }}
            >
              <option value="All">All Sentiments</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpDown size={14} color="var(--text-muted)" />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>SORT BY:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '6px 10px',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
            }}
          >
            <option value="engagement">Highest Engagement Rate</option>
            <option value="reach">Highest Total Reach</option>
            <option value="comments">Most Comments</option>
            <option value="shares">Most Shares</option>
            <option value="likes">Most Likes</option>
            <option value="sentiment">Highest Sentiment Score</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div
        className="analytics-card"
        style={{ padding: '0', overflow: 'hidden' }}
      >
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '38%' }}>Post Message & Hashtags</th>
                <th>Platform</th>
                <th>Published</th>
                <th>Likes</th>
                <th>Comments</th>
                <th>Shares</th>
                <th>Reach</th>
                <th>Eng. Rate</th>
                <th>Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {sortedPosts.map((post) => (
                <tr
                  key={post.id}
                  onClick={() => setPostDetailPost(post)}
                  style={{ cursor: 'pointer' }}
                  title="Click to view full thread, comments, and emotion analysis"
                >
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span
                        style={{
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.content}
                      </span>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {post.topics.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontSize: '0.68rem',
                              color: 'var(--primary)',
                              backgroundColor: 'var(--primary-light)',
                              padding: '1px 6px',
                              borderRadius: 'var(--radius-sm)',
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td>{getPlatformBadge(post.platform)}</td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {post.publishedAt}
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    {(post.metrics.likes / 1000).toFixed(1)}K
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    {post.metrics.comments}
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    {(post.metrics.shares / 1000).toFixed(1)}K
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {(post.metrics.reach / 1000).toFixed(0)}K
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {post.metrics.engagementRate}%
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {getSentimentBadge(post.sentiment)}
                      <span
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        ({post.emotion})
                      </span>
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

