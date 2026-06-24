import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Essays from './pages/Essays';
import EssayDetail from './pages/EssayDetail';
import BookReviews from './pages/BookReviews';
import Lab from './pages/Lab';

function App() {
  return (
    <Router>
      <nav>
        <div className="container nav-container">
          <Link to="/" className="logo">
            Sachin<span>.</span>
          </Link>
          <ul className="nav-links">
            <li><Link to="/essays">Essays</Link></li>
            <li><Link to="/library">Library</Link></li>
            <li><Link to="/lab">Lab</Link></li>
          </ul>
        </div>
      </nav>

      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/essays" element={<Essays />} />
          <Route path="/essays/:id" element={<EssayDetail />} />
          <Route path="/library" element={<BookReviews />} />
          <Route path="/lab" element={<Lab />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
