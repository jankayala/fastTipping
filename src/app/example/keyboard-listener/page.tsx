import ArrowsNavigation from '@/components/ArrowsNavigation';

export default function KeyboardListener() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          Keyboard Listener
        </h1>
        <p className="page-subtitle">
          Use the buttons or arrow keys to navigate between blocks
        </p>
      </div>
      <div className="content-card">
        <ArrowsNavigation />
      </div>
    </div>
  );
}
