import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Games',
};

export default function Game() {
  return (
    <div>
      <main>
        <h1>Game</h1>
        <p>This is the Game page.</p>
      </main>
    </div>
  );
}
