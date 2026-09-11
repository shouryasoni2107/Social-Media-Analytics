export type SocialPlatform = 'X' | 'Telegram' | 'Instagram' | 'LinkedIn' | 'Facebook' | 'Reddit' | 'YouTube';

export type UserRole = 'Admin' | 'Analyst' | 'Viewer';

export type SentimentType = 'Positive' | 'Neutral' | 'Negative';

export type EmotionType =
  | 'Supportive'
  | 'Sarcastic'
  | 'Excited'
  | 'Angry'
  | 'Anxious'
  | 'Sad'
  | 'Informational';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  accountName: string;
  handle: string;
  avatarUrl: string;
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  lastSync: string;
  followersCount: number;
  tokenEncrypted: boolean;
  postsCount: number;
}

export interface PostComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  sentiment: SentimentType;
  emotion: EmotionType;
  confidence: number;
  timestamp: string;
}

export interface PostItem {
  id: string;
  platform: SocialPlatform;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  publishedAt: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
    impressions: number;
    engagementRate: number;
  };
  sentiment: SentimentType;
  sentimentScore: number;
  emotion: EmotionType;
  emotionConfidence: number;
  topics: string[];
  commentsList: PostComment[];
}

export interface TrendingTopic {
  id: string;
  name: string;
  mentions: number;
  growth: number;
  sentiment: SentimentType;
  positivePct: number;
  topContributors: {
    handle: string;
    name: string;
    avatar: string;
    influenceScore: number;
  }[];
  timeline: {
    date: string;
    mentions: number;
  }[];
  relatedTopics: string[];
  scoreBreakdown: {
    mentionGrowth: number;
    engagementGrowth: number;
    uniqueAuthors: number;
    velocity: number;
    sentimentChange: number;
    totalScore: number;
  };
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'influencer' | 'user' | 'topic' | 'community';
  influenceScore?: number;
  cluster: number;
  sentiment: SentimentType;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  radius?: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
  type: 'reply' | 'mention' | 'share';
  weight: number;
}

export interface DemographicsData {
  age: { range: string; percentage: number }[];
  gender: { label: string; percentage: number }[];
  location: { country: string; code: string; percentage: number }[];
  interests: { category: string; percentage: number }[];
  activeHoursMatrix: number[][]; // 7 days x 24 hours (0-100 activity index)
  isInferred: boolean;
}

export interface CompetitorData {
  id: string;
  name: string;
  platform: SocialPlatform;
  followers: number;
  engagementRate: number;
  reach: number;
  growth: number;
  postingFreq: string;
  sentimentScore: number;
  isYou?: boolean;
}

export interface AlertRule {
  id: string;
  name: string;
  metric: 'Negative Sentiment' | 'Engagement Rate' | 'Followers' | 'Total Reach' | 'Topic Velocity';
  condition: 'increases_above' | 'decreases_below';
  threshold: number;
  channel: 'in_app' | 'email' | 'both';
  isActive: boolean;
  createdAt: string;
  lastTriggered?: string;
}

export interface RecentAlert {
  id: string;
  title: string;
  message: string;
  severity: 'warning' | 'info' | 'danger';
  timestamp: string;
  isRead: boolean;
  metricName: string;
  changeValue: string;
}

export interface ReportItem {
  id: string;
  title: string;
  period: 'Weekly' | 'Monthly' | 'Quarterly' | 'Custom';
  format: 'PDF' | 'CSV';
  generatedAt: string;
  status: 'ready' | 'generating';
  scheduledDay?: string;
  fileSize: string;
}

export interface FollowerGrowthPoint {
  date: string;
  label: string;
  X: number;
  Instagram: number;
  LinkedIn: number;
  Telegram: number;
  total: number;
}

export interface SentimentSummary {
  positive: number;
  neutral: number;
  negative: number;
  mixed: number;
  emotions: {
    name: EmotionType;
    percentage: number;
    color: string;
  }[];
}

