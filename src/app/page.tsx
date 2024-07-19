import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      <main>
        <h1>Home</h1>
        <p>This is the Home page.</p>
      </main>
    </>
  );
}
