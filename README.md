# kittyiox — Roblox DTI Styling Portfolio

Next.js App Router portfolio for Roblox creator **kittyiox**, featuring live YouTube Data API integration, dark mode with header toggle, and editorial video lookbook display.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure YouTube Data API v3
Create or update [`.env.local`](file:///D:/personal-projects/kitty's%20portfolio/.env.local) with your YouTube Data API Key:

```env
# Google Cloud YouTube Data API v3 Key
YOUTUBE_API_KEY=your_actual_youtube_api_key_here

# Channel Handle or Channel ID
YOUTUBE_CHANNEL_HANDLE=kittyiox

# Optional Roblox Followers count
NEXT_PUBLIC_ROBLOX_FOLLOWERS=340K
```

> **Note:** If `YOUTUBE_API_KEY` is not provided, the application gracefully displays fallback portfolio stats without breaking.

### 3. Run Locally
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Architecture & Features

- **Next.js App Router**: Built on Next.js 15 with Server Components and Client Components.
- **Server Function / Server Action**: Located in [`app/actions/youtube.ts`](file:///D:/personal-projects/kitty's%20portfolio/app/actions/youtube.ts) for secure server-side fetching of live YouTube subscriber count, channel views, and video counts.
- **Client Synchronization**: [`app/components/StatsSection.tsx`](file:///D:/personal-projects/kitty's%20portfolio/app/components/StatsSection.tsx) displays live statistics with an on-demand sync button.
- **Dark Mode System**: Zero-flash theme system with persistent header toggle (`Light` / `Dark`) and OS color scheme detection.
- **Vanilla CSS**: Custom tokens and smooth transitions in [`app/globals.css`](file:///D:/personal-projects/kitty's%20portfolio/app/globals.css).
