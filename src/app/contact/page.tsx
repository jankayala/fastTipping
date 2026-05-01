import { Metadata } from 'next';
import EmailIcon from '@mui/icons-material/Email';
import LocationIcon from '@mui/icons-material/LocationOn';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default function Contact() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          Get in Touch
        </h1>
        <p className="page-subtitle">
          Have questions or feedback? We would love to hear from you.
        </p>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <div className="content-card-icon">
            <EmailIcon style={{ color: '#818cf8', fontSize: 24 }} />
          </div>
          <h2 className="content-card-title">
            Send us a message
          </h2>
        </div>
        <form className="contact-form">
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input type="text" placeholder="John Doe" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" placeholder="john@example.com" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea placeholder="Tell us what you think..." className="form-textarea" />
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <div className="content-card-icon">
            <LocationIcon style={{ color: '#818cf8', fontSize: 24 }} />
          </div>
          <h2 className="content-card-title">
            Contact Information
          </h2>
        </div>
        <div className="contact-info-grid">
          <div className="contact-info-item">
            <div className="contact-info-icon">
              <EmailIcon style={{ color: '#818cf8', fontSize: 20 }} />
            </div>
            <div>
              <div className="contact-info-label">Email</div>
              <div className="contact-info-value">hello@fasttipping.com</div>
            </div>
          </div>
          <div className="contact-info-item">
            <div className="contact-info-icon">
              <LocationIcon style={{ color: '#818cf8', fontSize: 20 }} />
            </div>
            <div>
              <div className="contact-info-label">Location</div>
              <div className="contact-info-value">Internet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
