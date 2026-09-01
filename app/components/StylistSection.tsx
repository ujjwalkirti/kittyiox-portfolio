export default function StylistSection() {
  const tags = ['Y2K', 'Old Money', 'Coquette', 'Avant-Garde', 'Villain Era'];

  return (
    <section id="about">
      <div className="wrap about-grid">
        <div className="stylist-photo">
          <div className="stylist-photo-ring" />
          <img
            src="/stylist.jpeg"
            alt="kittyiox's Roblox avatar, a close-up styling shot"
            className="stylist-img"
          />
          <div className="stylist-badge">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: 'var(--kl-pink)' }}
            >
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 6.8 3.8L12 12l-6.8-3.9L12 4.3ZM5 9.2l6 3.4v7L5 16.2V9.2Zm14 0v7l-6 3.4v-7l6-3.4Z" />
            </svg>
            @kittyiox on Roblox · DTI Lookbooks
          </div>
        </div>

        <div>
          <div className="about-eyebrow">The Stylist</div>
          <h2 className="about-quote">
            &quot;Roblox fashion is still fashion — I just style it in a lobby.&quot;
          </h2>
          <p className="about-copy">
            I&apos;m kittyiox, a Roblox creator who basically lives in Dress to Impress.
            Every random prompt becomes a full editorial moment — thrifted-core, quiet
            luxury, villain arc, all of it, styled like it&apos;s walking a real runway.
          </p>
          <p className="about-copy">
            Outfit breakdowns, scoring reactions and prompt battles all land on YouTube
            first — that&apos;s where the whole closet lives.
          </p>
          <div className="tag-row">
            {tags.map((tag) => (
              <span key={tag} className="pink-tag">
                {tag}
              </span>
            ))}
          </div>
          <a
            href="https://www.youtube.com/@kittyiox?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="cta cta-solid"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
            </svg>
            <span>Join the community</span>
          </a>
        </div>
      </div>
    </section>
  );
}
