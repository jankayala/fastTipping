import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Examples',
};

export default function Example() {
  const examples = [
    { href: '/example/keyboard-listener', label: 'Keyboard-Listener' },
  ];
  return (
    <div>
      <main>
        <h1>Example</h1>
        <p>This is the Example page.</p>
        <ul>
          {examples.map((example, index) => (
            <li key={index}>
              <Link href={example.href}>{example.label}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
