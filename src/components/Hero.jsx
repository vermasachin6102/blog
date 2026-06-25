import { BookOpen, PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';
import CoffeeLiquid from './CoffeeLiquid';

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

      <div className="hero-image-container">
        <CoffeeLiquid />
      </div>
    </section>
  );
}
