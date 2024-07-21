import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Games',
};

export default function Game() {
  const games = [{ href: '/game/pattern-tipping', label: 'Pattern-Tipping' }];

  return (
    <div>
      <main>
        <h1>Game</h1>
        <p>This is the Game page.</p>
        <ul>
          {games.map((game, index) => (
            <li key={index}>
              <Link href={game.href}>{game.label}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
