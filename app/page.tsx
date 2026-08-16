import fs from 'fs';
import path from 'path';
import Header from './components/Header';
import CoverSection from './components/CoverSection';
import Ticker from './components/Ticker';
import StatsSection from './components/StatsSection';
import LookbookSection, { LookbookVideo } from './components/LookbookSection';
import StylistSection from './components/StylistSection';
import ClosingSection from './components/ClosingSection';
import Footer from './components/Footer';
import { getYouTubeChannelStats, getTopShorts } from './actions/youtube';

function getVideos(): LookbookVideo[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'videos.json');
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error reading videos.json:', error);
  }
  return [];
}

export const revalidate = 3600; // Revalidate page every hour

export default async function Home() {
  const [initialStats, topVideos] = await Promise.all([
    getYouTubeChannelStats(),
    getTopShorts(4),
  ]);
  const videos = getVideos();

  return (
    <main>
      <Header />
      <CoverSection topVideos={topVideos} />
      <Ticker />
      <StatsSection initialStats={initialStats} />
      <LookbookSection videos={videos} />
      <StylistSection />
      <ClosingSection />
      <Footer />
    </main>
  );
}
