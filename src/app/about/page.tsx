import { Metadata } from 'next';
import InfoIcon from '@mui/icons-material/Info';

export const metadata: Metadata = {
  title: 'About Us',
};

export default function About() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          About FastTipping
        </h1>
        <p className="page-subtitle">
          A browser-based reaction game built with Next.js and MUI
        </p>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <div className="content-card-icon">
            <InfoIcon style={{ color: '#818cf8', fontSize: 24 }} />
          </div>
          <h2 className="content-card-title">
            What is FastTipping?
          </h2>
        </div>
        <p className="content-card-text">
          FastTipping is a collection of browser-based games designed to test your reflexes,
          memory, and pattern recognition skills. The flagship game, Pattern Tipping, challenges
          players to memorize and reproduce arrow key sequences as quickly as possible.
        </p>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <div className="content-card-icon">
            <InfoIcon style={{ color: '#818cf8', fontSize: 24 }} />
          </div>
          <h2 className="content-card-title">
            Features
          </h2>
        </div>
        <ul className="feature-list">
          {['Millisecond-precision timing', 'Configurable pattern lengths (5, 20, 50, 100)', 'Multiple difficulty levels', 'Persistent leaderboards', 'Responsive, minimal UI design'].map((feature, index) => (
            <li key={index} className="feature-list-item">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <div className="content-card-icon">
            <InfoIcon style={{ color: '#818cf8', fontSize: 24 }} />
          </div>
          <h2 className="content-card-title">
            Tech Stack
          </h2>
        </div>
        <p className="content-card-text">
          Built with Next.js 16, React 19, TypeScript, and Material-UI components styled with
          Emotion. The application features server-side rendering, client-side interactivity,
          and localStorage for persistent data.
        </p>
      </div>
    </div>
  );
}
