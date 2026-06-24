import React, { useEffect, useState } from 'react';
import { Star, Loader } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function BookReviews() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data, error } = await supabase
          .from('book_reviews')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setBooks(data || []);
      } catch (err) {
        console.error("Error fetching books:", err.message);
        setError("Could not load library. Make sure your database is set up and keys are correct.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        fill={i < rating ? 'var(--color-accent)' : 'transparent'} 
        color={i < rating ? 'var(--color-accent)' : 'var(--color-latte)'} 
      />
    ));
  };

  return (
    <section className="section container">
      <div className="section-header">
        <h2>The Library</h2>
        <p style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
          My thoughts on the tech books, design guides, and engineering manuals I've been reading.
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <Loader className="animate-spin" size={32} color="var(--color-accent)" />
        </div>
      ) : error ? (
        <div className="glass" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-accent)' }}>
          <p>{error}</p>
        </div>
      ) : books.length === 0 ? (
        <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
          <p>No books found. Add some in your Supabase dashboard!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {books.map((book) => (
            <div key={book.id} className="glass" style={{ display: 'flex', flexDirection: 'column', borderRadius: 'var(--border-radius-md)', overflow: 'hidden' }}>
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img src={book.cover_url} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(255,255,255,0.9)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {book.read_date}
                </div>
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.2rem' }}>{book.title}</h3>
                <p style={{ color: 'var(--color-accent)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>By {book.author}</p>
                
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                  {renderStars(book.rating)}
                </div>
                
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic', color: 'var(--text-light)' }}>
                  "{book.review}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
