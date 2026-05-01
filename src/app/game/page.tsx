import { Metadata } from 'next';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GamingIcon from '@mui/icons-material/SportsEsports';

export const metadata: Metadata = {
  title: 'Games',
};

export default function Game() {
  const games = [
    {
      href: '/game/pattern-tipping',
      label: 'Pattern Tipping',
      description: 'Memorize arrow patterns and reproduce them as quickly as possible',
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          Games
        </h1>
        <p className="page-subtitle">Choose a game to start playing</p>
      </div>

      <div className="list-grid">
        {games.map((game, index) => (
          <Link key={index} href={game.href} className="list-item">
            <div className="list-item-icon">
              <GamingIcon style={{ fontSize: 32, color: '#818cf8' }} />
            </div>
            <div className="list-item-content">
              <h3 className="list-item-title">
                {game.label}
              </h3>
              <p className="list-item-description">
                {game.description}
              </p>
            </div>
            <ArrowForwardIcon className="list-item-arrow" />
          </Link>
        ))}
      </div>
    </div>
  );
}
