import { Coffee, BookOpen, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-content animate-fade-up">
        <span className="hero-subtitle">Tech Journal & Digital Garden</span>
        <h1>Welcome to my <br/><span style={{ color: 'var(--color-accent)' }}>Digital Space</span></h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '450px' }}>
          I'm Sachin. This is my corner of the internet where I document my tech journey, review books, and write essays over a cup of coffee.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/essays" className="btn btn-primary">
            <PenTool size={20} /> Read Essays
          </Link>
          <Link to="/library" className="btn btn-secondary">
            <BookOpen size={20} /> Browse Library
          </Link>
        </div>
      </div>

      <div className="hero-image-container animate-float">
        <div className="blob"></div>
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.5)',
          boxShadow: '0 20px 40px rgba(44, 24, 16, 0.1)'
        }}>
          <img 
            src="https://api.dicebear.com/7.x/notionists/svg?seed=Sachin&backgroundColor=f5efeb" 
            alt="Sachin Verma Avatar" 
            style={{ width: '80%', height: '80%', objectFit: 'contain' }}
          />
        </div>
      </div>
    </section>
  );
}
