import React, { useState } from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import {
  X,
  Heart,
  MessageSquare,
  Share2,
  Eye,
  BrainCircuit,
  Send,
  Sparkles,
} from 'lucide-react';

export const PostDetailModal: React.FC = () => {
  const { postDetailPost, setPostDetailPost, addPostComment } = useAnalytics();
  const [commentInput, setCommentInput] = useState('');

  if (!postDetailPost) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addPostComment(postDetailPost.id, commentInput);
    setCommentInput('');
  };

  return (
    <div className="modal-overlay" onClick={() => setPostDetailPost(null)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={postDetailPost.author.avatar}
              alt="Author"
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{postDetailPost.author.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {postDetailPost.author.handle} • {postDetailPost.publishedAt}
              </div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={() => setPostDetailPost(null)}>
            <X size={20} />
          </button>
        </div>

        {/* Post Text */}
        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-primary)',
            lineHeight: 1.6,
            marginBottom: '16px',
          }}
        >
          {postDetailPost.content}
        </p>

        {/* AI Sentiment & Emotion Intelligence Card */}
        <div
          style={{
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BrainCircuit size={18} color="var(--primary)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>AI Inference:</span>
            <span
              className={`badge ${
                postDetailPost.sentiment === 'Positive'
                  ? 'badge-positive'
                  : postDetailPost.sentiment === 'Negative'
                  ? 'badge-negative'
                  : 'badge-neutral'
              }`}
            >
              {postDetailPost.sentiment}
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              Emotion: {postDetailPost.emotion}
            </span>
          </div>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Confidence: <strong>{(postDetailPost.emotionConfidence * 100).toFixed(0)}%</strong>
          </div>
        </div>

        {/* Post Metrics Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            padding: '12px 0',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '16px',
            textAlign: 'center',
            fontSize: '0.8rem',
          }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Likes</span>
            <strong>{postDetailPost.metrics.likes.toLocaleString()}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Comments</span>
            <strong>{postDetailPost.metrics.comments}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Shares</span>
            <strong>{postDetailPost.metrics.shares.toLocaleString()}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)', display: 'block' }}>Reach</span>
            <strong>{postDetailPost.metrics.reach.toLocaleString()}</strong>
          </div>
        </div>

        {/* Comment Stream with Sentiment Analysis */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '0.84rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MessageSquare size={14} color="var(--primary)" />
            Audience Comments & Sentiment Stream ({postDetailPost.commentsList.length})
          </div>

          <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {postDetailPost.commentsList.map((comm) => (
              <div
                key={comm.id}
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{comm.author}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      className={`badge ${
                        comm.sentiment === 'Positive'
                          ? 'badge-positive'
                          : comm.sentiment === 'Negative'
                          ? 'badge-negative'
                          : 'badge-neutral'
                      }`}
                      style={{ fontSize: '0.62rem' }}
                    >
                      {comm.sentiment}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {comm.emotion} ({(comm.confidence * 100).toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  {comm.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Test Sentiment Simulation Input */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Simulate a reply (e.g. 'Amazing. Another update that makes everything worse 🙃')..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0 16px', flexShrink: 0 }}>
            <Send size={15} />
            <span>Analyze</span>
          </button>
        </form>
      </div>
    </div>
  );
};

