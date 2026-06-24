import React, { useEffect, useState } from 'react';
import { ArrowRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function Essays() {
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEssays() {
      try {
        const { data, error } = await supabase
          .from('essays')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setEssays(data || []);
      } catch (err) {
        console.error("Error fetching essays:", err.message);
        setError("Could not load essays. Make sure your database is set up and keys are correct.");
      } finally {
        setLoading(false);
      }
    }

    fetchEssays();
  }, []);

  return (
    <section className="section container">
      <div className="section-header">
        <h2>Essays & Thoughts</h2>
        <p style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
          Long-form writing on software engineering, design patterns, and life as a developer.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Loader className="animate-spin" size={32} color="var(--color-accent)" />
          </div>
        ) : error ? (
          <div className="glass" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-accent)' }}>
            <p>{error}</p>
          </div>
        ) : essays.length === 0 ? (
          <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
            <p>No essays found. Add some in your Supabase dashboard!</p>
          </div>
        ) : (
          essays.map((essay) => (
            <article key={essay.id} className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--border-radius-md)', transition: 'var(--transition)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                  {new Date(essay.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{essay.read_time}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{essay.title}</h3>
              <p style={{ marginBottom: '1.5rem' }}>{essay.excerpt}</p>
              
              <Link to={`/essays/${essay.id}`} className="read-more" style={{ color: 'var(--color-espresso)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Read Essay <ArrowRight size={18} />
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
