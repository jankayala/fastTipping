import { Metadata } from 'next';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GamingIcon from '@mui/icons-material/SportsEsports';
import CodeIcon from '@mui/icons-material/Code';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <section className="hero-section">
      <div className="hero-bg" />
      <h1 className="hero-title">
        FastTipping
      </h1>
      <p className="hero-subtitle">
        Test your reflexes and memory with pattern-based games. How fast can you match the sequence?
      </p>
      <div className="hero-grid">
        <Link href="/game/pattern-tipping" className="feature-card">
          <div className="feature-card-icon">
            <GamingIcon style={{ fontSize: 32, color: '#818cf8' }} />
          </div>
          <h3 className="feature-card-title">
            Pattern Tipping
          </h3>
          <p className="feature-card-description">
            Memorize arrow patterns and reproduce them as quickly as possible
          </p>
          <ArrowForwardIcon className="feature-card-arrow" />
        </Link>
        <Link href="/example/keyboard-listener" className="feature-card">
          <div className="feature-card-icon">
            <CodeIcon style={{ fontSize: 32, color: '#818cf8' }} />
          </div>
          <h3 className="feature-card-title">
            Keyboard Demo
          </h3>
          <p className="feature-card-description">
            Interactive keyboard navigation with animated blocks
          </p>
          <ArrowForwardIcon className="feature-card-arrow" />
        </Link>
      </div>
    </section>
  );
}
