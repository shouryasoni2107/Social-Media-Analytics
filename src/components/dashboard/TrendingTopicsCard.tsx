import React from 'react';
import { useAnalytics } from '../../context/AnalyticsContext';
import { Hash, ArrowUpRight } from 'lucide-react';
import { TrendingTopic } from '../../types';

export const TrendingTopicsCard: React.FC = () => {
  const { topics, setSelectedTopic } = useAnalytics();

  return (
    <div className="analytics-card">
      <div className="card-title-row">
        <div>
          <h3>
            <Hash size={18} color="var(--primary)" />
            Trending Topics
          </h3>
          <div className="card-subtitle">Velocity & growth algorithms</div>
        </div>
      </div>

      <div className="topics-list">
        {topics.map((topic, idx) => {
          return (
            <div
              key={topic.id}
              className="topic-row"
              onClick={() => setSelectedTopic(topic)}
              title="Click to inspect topic narrative, contributors, and timeline"
            >
              <div className="topic-left">
                <span className="topic-rank">{idx + 1}</span>
                <div>
                  <div className="topic-name">{topic.name}</div>
                  <div className="topic-mentions">
                    {(topic.mentions / 1000).toFixed(1)}K mentions
                  </div>
                </div>
              </div>

              <div className="topic-growth">
                <ArrowUpRight size={14} />
                <span>+{topic.growth}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

