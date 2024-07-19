import Head from 'next/head';

export default function Game() {
  return (
    <div>
      <Head>
        <title>Game</title>
        <meta name="description" content="Some Game samples" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Game</h1>
        <p>This is the Game page.</p>
      </main>
    </div>
  );
}
