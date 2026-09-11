import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { FileText, ArrowRight } from 'lucide-react';
import { PostItem } from '../../types';

export const TopPostsTable: React.FC = () => {
  const { posts, setPostDetailPost, setActiveTab } = useAnalytics();

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'X':
        return <span className="platform-badge" style={{ color: '#3b82f6' }}>𝕏 X</span>;
      case 'Instagram':
        return <span className="platform-badge" style={{ color: '#ec4899' }}>📷 Insta</span>;
      case 'LinkedIn':
        return <span className="platform-badge" style={{ color: '#0ea5e9' }}>💼 In</span>;
      case 'Telegram':
        return <span className="platform-badge" style={{ color: '#10b981' }}>✈️ Tg</span>;
      default:
        return <span className="platform-badge">{platform}</span>;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
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
    <div className="analytics-card" style={{ gridColumn: 'span 1' }}>
      <div className="card-title-row">
        <div>
          <h3>
            <FileText size={18} color="var(--primary)" />
            Top Performing Posts
          </h3>
          <div className="card-subtitle">Highest engagement and reach content</div>
        </div>

        <button
          onClick={() => setActiveTab('content')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          <span>View all</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Post</th>
              <th>Platform</th>
              <th>Engagement</th>
              <th>Reach</th>
              <th>Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {posts.slice(0, 4).map((post) => (
              <tr
                key={post.id}
                onClick={() => setPostDetailPost(post)}
                style={{ cursor: 'pointer' }}
                title="Click to inspect post metrics and comments breakdown"
              >
                <td>
                  <div className="post-title-cell">
                    {post.content}
                  </div>
                </td>
                <td>{getPlatformBadge(post.platform)}</td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {(post.metrics.likes / 1000).toFixed(1)}K
                </td>
                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {(post.metrics.reach / 1000).toFixed(0)}K
                </td>
                <td>{getSentimentBadge(post.sentiment)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

