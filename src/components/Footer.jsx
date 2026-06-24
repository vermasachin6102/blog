import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <h2 style={{ marginBottom: '1rem' }}>Let's Build Something Great.</h2>
        <p style={{ color: 'var(--color-latte)', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Always open to discussing product design work or partnership opportunities.
        </p>

        <div className="social-links">
          <a href="https://github.com" className="social-link" aria-label="GitHub">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/sachin-verma-3a57a8224/" className="social-link" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="social-link" aria-label="Twitter">
            <FaTwitter size={20} />
          </a>
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '2rem',
          marginTop: '3rem',
          fontSize: '0.9rem',
          color: 'var(--color-latte)'
        }}>
          <p>&copy; {currentYear} Sachin Verma. Crafted with care and lots of coffee.</p>
        </div>
      </div>
    </footer>
  );
}
