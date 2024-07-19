import Head from 'next/head';

const Contact: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Get in touch with us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Contact Us</h1>
        <p>This is the Contact page.</p>
      </main>
    </div>
  );
};

export default Contact;
