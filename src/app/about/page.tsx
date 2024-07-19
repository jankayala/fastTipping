import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
};

export default function About() {
  return (
    <div>
      <main>
        <h1>About Us</h1>
        <p>This is the About page.</p>
      </main>
    </div>
  );
}
