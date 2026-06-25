import React, { useEffect, useState } from 'react';
import { ExternalLink, Loader } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { supabase } from '../supabaseClient';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('personal_projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error('Error fetching projects:', err.message);
        setError('Could not load projects. Make sure the personal_projects table exists in Supabase.');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section className="section container">
      <div className="section-header">
        <h2>Projects</h2>
        <p style={{ marginTop: '1rem', maxWidth: '600px', margin: '1rem auto 0' }}>
          Personal projects I've built — from side experiments to shipped products.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
            <Loader className="animate-spin" size={32} color="var(--color-accent)" />
          </div>
        ) : error ? (
          <div className="glass" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-accent)' }}>
            <p>{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
            <p>No projects yet. Add some in your Supabase dashboard!</p>
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius-lg)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1.4rem' }}>{project.title}</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {project.repo_link && (
                    <a href={project.repo_link} style={{ color: 'var(--text-main)' }} aria-label="GitHub Repository">
                      <FaGithub size={20} />
                    </a>
                  )}
                  {project.demo_link && (
                    <a href={project.demo_link} style={{ color: 'var(--text-main)' }} aria-label="Live Demo">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--text-light)', lineHeight: 1.6 }}>
                {project.description}
              </p>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {project.tags && project.tags.map(tag => (
                  <span key={tag} style={{
                    background: 'var(--color-espresso)',
                    color: 'var(--color-cream)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
