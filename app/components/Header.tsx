'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="site-header" className={isScrolled ? 'is-scrolled' : ''}>
      <div className="wrap header-inner">
        <Link href="#cover" className="brand">
          <svg width="22" height="16" viewBox="0 0 44 32" fill="none" style={{ flex: 'none' }}>
            <path
              d="M20 16 4 6c-2.4-1.5-4 .2-3.6 3L2 20c.4 2.8 2.4 4 4.6 2.6L20 16Z"
              fill="var(--kl-pink)"
            />
            <path
              d="M24 16 40 6c2.4-1.5 4 .2 3.6 3L42 20c-.4 2.8-2.4 4-4.6 2.6L24 16Z"
              fill="var(--kl-pink)"
            />
            <circle cx="22" cy="16" r="5" fill="var(--kl-red)" />
          </svg>
          <span className="brand-name">kittyiox</span>
          <span className="brand-tag">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: 'var(--kl-pink)' }}
            >
              <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 6.8 3.8L12 12l-6.8-3.9L12 4.3ZM5 9.2l6 3.4v7L5 16.2V9.2Zm14 0v7l-6 3.4v-7l6-3.4Z" />
            </svg>
            Roblox · DTI
          </span>
        </Link>
        <nav className="nav-links">
          <a href="#lookbook">Lookbook</a>
          <a href="#about">The Stylist</a>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a
            href="https://www.youtube.com/@kittyiox?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="cta cta-header"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flex: 'none' }}>
              <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
            </svg>
            <span>Subscribe</span>
          </a>
        </div>
      </div>
    </header>
  );
}
