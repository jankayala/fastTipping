import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import NavBar from '@/components/NavBar';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fast Tipping App',
  description: 'Test your reflexes and memory with pattern-based games',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/example', label: 'Examples' },
    { href: '/game', label: 'Games' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <NavBar links={links} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
