import { ArrowRight } from 'lucide-react';

export default function BlogList() {
  const posts = [
    {
      id: 1,
      title: 'Building Modern UI with Glassmorphism',
      date: 'Oct 24, 2023',
      excerpt: 'Exploring how to use backdrop-filter and semi-transparent backgrounds to create stunning depth in web design.',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '#'
    },
    {
      id: 2,
      title: 'The Perfect Developer Coffee Setup',
      date: 'Nov 12, 2023',
      excerpt: 'A deep dive into my pour-over routine, beans selection, and how good coffee fuels better code.',
      image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '#'
    },
    {
      id: 3,
      title: 'Why React Ecosystem is Evolving',
      date: 'Dec 05, 2023',
      excerpt: 'Server components, new hooks, and the future of rendering React applications on the web.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: '#'
    }
  ];

  return (
    <section id="blog" className="section container">
      <div className="section-header">
        <h2>Latest Notes</h2>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.id} className="glass blog-card">
            <div className="blog-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-content">
              <span className="blog-date">{post.date}</span>
              <h3 className="blog-title">{post.title}</h3>
              <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>{post.excerpt}</p>
              
              <a href={post.link} className="read-more">
                Read Article <ArrowRight size={18} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
