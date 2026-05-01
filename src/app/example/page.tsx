import { Metadata } from 'next';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardIcon from '@mui/icons-material/Keyboard';

export const metadata: Metadata = {
  title: 'Examples',
};

export default function Example() {
  const examples = [
    {
      href: '/example/keyboard-listener',
      label: 'Keyboard Listener',
      description: 'Interactive keyboard navigation with animated dropping blocks',
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          Examples
        </h1>
        <p className="page-subtitle">
          Explore interactive demos and experiments
        </p>
      </div>

      <div className="list-grid">
        {examples.map((example, index) => (
          <Link key={index} href={example.href} className="list-item">
            <div className="list-item-icon">
              <KeyboardIcon style={{ fontSize: 32, color: '#818cf8' }} />
            </div>
            <div className="list-item-content">
              <h3 className="list-item-title">
                {example.label}
              </h3>
              <p className="list-item-description">
                {example.description}
              </p>
            </div>
            <ArrowForwardIcon className="list-item-arrow" />
          </Link>
        ))}
      </div>
    </div>
  );
}
