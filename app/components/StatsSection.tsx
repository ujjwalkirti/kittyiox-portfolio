'use client';

import { useState, useTransition } from 'react';
import { getYouTubeChannelStats, YouTubeChannelStats } from '@/app/actions/youtube';

interface StatsSectionProps {
  initialStats: YouTubeChannelStats;
}

export default function StatsSection({ initialStats }: StatsSectionProps) {
  const [stats, setStats] = useState<YouTubeChannelStats>(initialStats);
  const [isPending, startTransition] = useTransition();
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  const handleRefresh = () => {
    startTransition(async () => {
      try {
        const fresh = await getYouTubeChannelStats();
        setStats(fresh);
      } catch (err) {
        console.error('Error refreshing YouTube stats:', err);
      }
    });
  };

  return (
    <section className="stats-section">
      <div className="wrap">
        <div className="stats-header-bar">
          <div className="stats-headline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
            </svg>
            Channel Analytics
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className={`live-badge ${stats.isLive ? 'live-badge--connected' : ''}`}
              title={stats.isLive ? 'Connected to YouTube API' : stats.errorMessage || 'Demo portfolio data'}
            >
              <span className="live-dot" />
              {stats.isLive ? 'Live YouTube API' : 'Portfolio Data'}
            </span>

            <button
              onClick={handleRefresh}
              disabled={isPending}
              className="refresh-btn"
              title="Fetch latest stats using server action"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  animation: isPending ? 'spin 1s linear infinite' : 'none',
                }}
              >
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
              {isPending ? 'Syncing...' : 'Sync'}
            </button>

            {!stats.isLive && (
              <button
                onClick={() => setShowConfigGuide(!showConfigGuide)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--kl-pink-ink)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: '2px 6px',
                }}
              >
                {showConfigGuide ? 'Hide Info' : 'API Setup'}
              </button>
            )}
          </div>
        </div>

        {showConfigGuide && !stats.isLive && (
          <div
            style={{
              background: 'var(--kl-surface)',
              border: '1px solid var(--kl-line)',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '20px',
              fontSize: '12.5px',
              lineHeight: '1.5',
              color: 'var(--kl-muted)',
            }}
          >
            <strong style={{ color: 'var(--kl-text)' }}>💡 Connect Live YouTube Stats:</strong>
            <p style={{ margin: '4px 0 0' }}>
              Add your Google Cloud YouTube Data API Key to <code>.env.local</code> as{' '}
              <code style={{ color: 'var(--kl-pink-ink)', background: 'var(--kl-blush)', padding: '2px 6px', borderRadius: '4px' }}>
                YOUTUBE_API_KEY=your_key_here
              </code>
              . The Server Function will instantly pull live subscriber count, total channel views, and video counts.
            </p>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat">
            <div className="stat-value">{stats.subscriberCount}</div>
            <div className="stat-label">YouTube Subscribers</div>
            <div className="stat-sub">
              {stats.isLive && stats.rawSubscriberCount > 0
                ? `${stats.rawSubscriberCount.toLocaleString()} total`
                : 'Live channel metric'}
            </div>
          </div>
          <div className="stat">
            <div className="stat-value">{stats.viewCount}</div>
            <div className="stat-label">Total Channel Views</div>
            <div className="stat-sub">
              {stats.isLive && stats.rawViewCount > 0
                ? `${stats.rawViewCount.toLocaleString()} views`
                : 'Live channel metric'}
            </div>
          </div>
          <div className="stat">
            <div className="stat-value">DTI</div>
            <div className="stat-label">Fashion Styling</div>
            <div className="stat-sub">@kittyiox on Roblox</div>
          </div>
          <div className="stat">
            <div className="stat-value">{stats.videoCount}</div>
            <div className="stat-label">Lookbooks Filmed</div>
            <div className="stat-sub">
              {stats.isLive && stats.rawVideoCount > 0
                ? `${stats.rawVideoCount} uploads`
                : 'Weekly YouTube drops'}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
