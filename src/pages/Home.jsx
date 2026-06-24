import React from 'react';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem' }}>Currently Exploring</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius-md)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)' }}>Reading (Books)</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>"Designing Data-Intensive Applications" by Martin Kleppmann</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius-md)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)' }}>Reading (Papers)</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>"Attention Is All You Need" - Vaswani et al. (Exploring Transformer architectures)</p>
          </div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius-md)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-espresso)' }}>Building</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>A custom React component library based on coffee tones.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
