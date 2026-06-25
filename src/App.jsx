import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Essays from './pages/Essays';
import EssayDetail from './pages/EssayDetail';
import BookReviews from './pages/BookReviews';
import Lab from './pages/Lab';
import Projects from './pages/Projects';

const navItems = [
  { label: 'Essays',   to: '/essays' },
  { label: 'Library',  to: '/library' },
  { label: 'Projects', to: '/projects' },
  { label: 'Lab',      to: '/lab' },
];

function Nav() {
  const loc = useLocation();
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 60px',
      background: 'rgba(244,241,235,.82)',
      backdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(58,50,43,.06)',
    }}>
      <Link to="/" style={{
        textDecoration: 'none', color: '#3A322B',
        fontWeight: 600, fontSize: 26, letterSpacing: '-0.4px',
        display: 'flex', alignItems: 'baseline', gap: 2,
      }}>
        Sachin<span style={{ color: '#B07E58' }}>.</span>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        {navItems.map(({ label, to }) => {
          const active = loc.pathname === to;
          return (
            <Link key={to} to={to} style={{
              textDecoration: 'none',
              color: active ? '#9A6C49' : '#5B5048',
              fontWeight: 500, fontSize: 16, letterSpacing: '.1px',
              position: 'relative',
              paddingBottom: 2,
            }}>
              {label}
              <span style={{
                position: 'absolute', left: 0, bottom: -6, height: 1.5,
                width: active ? '100%' : 0,
                background: '#B07E58',
                transition: 'width .3s cubic-bezier(.4,0,.2,1)',
                display: 'block',
              }} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/essays" element={<Essays />} />
        <Route path="/essays/:id" element={<EssayDetail />} />
        <Route path="/library" element={<BookReviews />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/lab" element={<Lab />} />
      </Routes>
    </Router>
  );
}

export default App;
