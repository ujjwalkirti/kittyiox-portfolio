'use client';

import { useState } from 'react';

export interface LookbookVideo {
  title: string;
  url: string;
  tag: string;
  score?: string;
  duration?: string;
  views?: string;
  badge?: string;
  placeholder?: string;
}

interface LookbookSectionProps {
  videos: LookbookVideo[];
}

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const m = String(url).match(
    /(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

function VideoThumbnail({ video, alt }: { video: LookbookVideo; alt: string }) {
  const id = getYouTubeId(video.url);
  const [imgError, setImgError] = useState(false);
  const [qualityIndex, setQualityIndex] = useState(0);

  const qualities = ['hqdefault', 'mqdefault', 'default'];

  if (!id || imgError) {
    return (
      <div className="img-slot img-slot--rect" style={{ width: '100%', height: '100%' }}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span>{video.placeholder || 'Drop a video thumbnail'}</span>
      </div>
    );
  }

  const src = `https://img.youtube.com/vi/${id}/${qualities[qualityIndex]}.jpg`;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="thumb-img"
      onError={() => {
        if (qualityIndex < qualities.length - 1) {
          setQualityIndex((prev) => prev + 1);
        } else {
          setImgError(true);
        }
      }}
    />
  );
}

export default function LookbookSection({ videos }: LookbookSectionProps) {
  if (!videos || videos.length === 0) return null;

  const featured = videos[0];
  const rest = videos.slice(1);

  return (
    <section id="lookbook" className="wrap">
      <div className="lookbook-head">
        <div>
          <div className="lookbook-eyebrow">The Video Lookbook</div>
          <h2>
            Every fit, every round
            <br />— on YouTube.
          </h2>
        </div>
        <a
          href="https://www.youtube.com/@kittyiox/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="see-all"
        >
          See all videos →
        </a>
      </div>

      {/* Featured Video */}
      {featured && (
        <a
          href={featured.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="card featured-card"
        >
          <div className="featured-media">
            <VideoThumbnail video={featured} alt={featured.title} />
            <div className="media-fade" />
            <span className="play-badge play-badge-lg">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: '4px' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="pill-red">▶ {featured.badge || 'New this week'}</span>
            {featured.score && <span className="pill-score">DTI Score {featured.score}</span>}
            <div className="featured-overlay">
              <div className="featured-tag">
                {featured.tag}
                {featured.duration ? ` · ${featured.duration}` : ''}
              </div>
              <div className="featured-title">{featured.title}</div>
              {featured.views && <div className="featured-views">{featured.views}</div>}
            </div>
          </div>
        </a>
      )}

      {/* Grid Videos */}
      <div className="grid">
        {rest.map((video, idx) => (
          <a
            key={idx}
            href={video.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="card"
          >
            <div className="grid-media">
              <VideoThumbnail video={video} alt={video.title} />
              <span className="play-badge play-badge-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: '3px' }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="pill-red pill-red-sm">▶ YouTube</span>
              {video.score && <span className="pill-score pill-score-sm">Score {video.score}</span>}
              {video.duration && <span className="pill-duration">{video.duration}</span>}
            </div>
            <div className="grid-body">
              <div className="grid-tag">{video.tag}</div>
              <div className="grid-title">{video.title}</div>
              {video.views && <div className="grid-views">{video.views}</div>}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
