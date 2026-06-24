import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function EssayDetail() {
  const { id } = useParams();
  const [essay, setEssay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEssay() {
      try {
        const { data, error } = await supabase
          .from('essays')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        setEssay(data);
      } catch (err) {
        console.error("Error fetching essay:", err.message);
        setError("Could not load the essay. It may have been deleted or the link is invalid.");
      } finally {
        setLoading(false);
      }
    }

    fetchEssay();
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '6rem 0', minHeight: '60vh' }}>
        <Loader className="animate-spin" size={40} color="var(--color-accent)" />
      </div>
    );
  }

  if (error || !essay) {
    return (
      <div className="container section" style={{ textAlign: 'center', minHeight: '60vh' }}>
        <p style={{ color: 'var(--color-accent)', fontSize: '1.2rem', marginBottom: '2rem' }}>{error || "Essay not found."}</p>
        <Link to="/essays" className="btn btn-secondary">
          <ArrowLeft size={18} /> Back to Essays
        </Link>
      </div>
    );
  }

  return (
    <article className="container" style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/essays" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-light)', fontWeight: 500 }}>
        <ArrowLeft size={18} /> Back to Essays
      </Link>
      
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.2 }}>{essay.title}</h1>
        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-light)', fontSize: '0.95rem' }}>
          <span>{new Date(essay.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>{essay.read_time}</span>
        </div>
      </header>

      <div style={{ 
        fontSize: '1.15rem', 
        lineHeight: 1.8, 
        color: 'var(--text-main)',
        whiteSpace: 'pre-wrap' // This ensures your line breaks in the text are respected
      }}>
        {essay.content}
      </div>
    </article>
  );
}
