import Head from 'next/head';
import Link from 'next/link';

export default function Example() {
  const examples = [
    { href: '/example/keyboard-listener', label: 'Keyboard-Listener' },
  ];
  return (
    <div>
      <Head>
        <title>Example</title>
        <meta name="description" content="Examples abput diferent topics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
