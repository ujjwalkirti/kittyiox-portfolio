export default function ClosingSection() {
  return (
    <section className="closing">
      <div className="closing-glow" />
      <div className="closing-inner">
        <svg width="40" height="29" viewBox="0 0 44 32" fill="none">
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
        <div className="closing-eyebrow">New lookbook every Friday</div>
        <h2>Don&apos;t miss the next drop.</h2>
        <p>Catch every outfit breakdown, scoring reaction, and prompt battle. Come style the next round with me.</p>
        <a
          href="https://www.youtube.com/@kittyiox?sub_confirmation=1"
          target="_blank"
          rel="noopener noreferrer"
          className="cta cta-big"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flex: 'none' }}>
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
          </svg>
          <span>Subscribe on YouTube</span>
        </a>
      </div>
    </section>
  );
}
