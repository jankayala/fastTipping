import Head from 'next/head';

const About: React.FC = () => {
  return (
    <div>
      <Head>
        <title>About Us</title>
        <meta name="description" content="Learn more about us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>About Us</h1>
        <p>This is the About page.</p>
      </main>
    </div>
  );
};

export default About;
