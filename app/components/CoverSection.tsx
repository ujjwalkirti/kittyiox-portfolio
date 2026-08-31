import Image from 'next/image';
import { TopVideo } from '../actions/youtube';

interface CoverSectionProps {
  topVideos: TopVideo[];
}

export default function CoverSection({ topVideos }: CoverSectionProps) {
  const left = topVideos.slice(0, 2);
  const right = topVideos.slice(2, 4);

  return (
    <section id="cover" className="wrap">
      <div className="cover-glow" />

      <div className="cover-eyebrow">
        <span>Issue 42 · Weekly lookbooks</span>
        <span className="accent">Dress to Impress</span>
      </div>

      <div className="cover-title">
        <div className="cover-title-row">
          <svg width="30" height="22" viewBox="0 0 44 32" fill="none" style={{ flex: 'none' }}>
            <path
              d="M20 16 4 6c-2.4-1.5-4 .2-3.6 3L2 20c.4 2.8 2.4 4 4.6 2.6L20 16Z"
              fill="var(--kl-bow-wing)"
            />
            <path
              d="M24 16 40 6c2.4-1.5 4 .2-3.6 3L42 20c-.4 2.8-2.4 4-4.6 2.6L24 16Z"
              fill="var(--kl-bow-wing)"
            />
            <circle cx="22" cy="16" r="5" fill="var(--kl-bow-center)" />
          </svg>
          <h1>kittyiox</h1>
        </div>
        <p>Roblox fashion · styled weekly on YouTube</p>
      </div>

      <div className="cover-grid">
        <div className="cover-col left">
          {left.map((video, idx) => (
            <a
              key={video.url + idx}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cover-col-link"
            >
              <div className="cover-num">{String(idx + 1).padStart(2, '0')}</div>
              <div className="cover-line-title">{video.title}</div>
              <div className="cover-line-sub">{video.description}</div>
            </a>
          ))}
        </div>

        <div className="cover-portrait">
          <div className="cover-portrait-ring" />
          <div className="cover-portrait-frame">
            <Image
              src="/hero.jpeg"
              alt="kittyiox's Roblox avatar in a full-body Dress to Impress look"
              className="cover-portrait-img"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              priority
            />
            <div className="cover-portrait-fade" />
          </div>
          <div className="cover-score-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 6.8 3.8L12 12l-6.8-3.9L12 4.3ZM5 9.2l6 3.4v7L5 16.2V9.2Zm14 0v7l-6 3.4v-7l6-3.4Z" />
            </svg>
            Avg. DTI score 98
          </div>
          <a
            href="https://www.youtube.com/@kittyiox"
            target="_blank"
            rel="noopener noreferrer"
            className="cta cta-sticker"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flex: 'none' }}>
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
            </svg>
            <span>Watch the latest lookbook</span>
          </a>
        </div>

        <div className="cover-col right">
          {right.map((video, idx) => (
            <a
              key={video.url + idx}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cover-col-link"
            >
              <div className="cover-num">{String(idx + 3).padStart(2, '0')}</div>
              <div className="cover-line-title">{video.title}</div>
              <div className="cover-line-sub">{video.description}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
