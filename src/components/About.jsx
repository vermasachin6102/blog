import { Code2, Coffee, MonitorSmartphone, Database } from 'lucide-react';

export default function About() {
  const skills = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'UI/UX Design', 'CSS/Tailwind'];

  return (
    <section id="about" className="section container">
      <div className="section-header">
        <h2>About Me</h2>
      </div>

      <div className="about-grid">
        <div className="about-content">
          <h3 style={{ color: 'var(--color-espresso)', marginBottom: '1rem' }}>
            Bridging Design & Technology
          </h3>
          <p>
            I'm Sachin, a developer passionate about creating interactive, user-centric web applications. 
            I love combining clean code with beautiful aesthetics to build products that people enjoy using.
          </p>
          <p>
            My approach to development is much like brewing specialty coffee: it requires precision, 
            the right tools, and an appreciation for the craft.
          </p>

          <div className="tech-tags" style={{ marginTop: '2rem' }}>
            {skills.map((skill) => (
              <span key={skill} className="tech-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass about-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-espresso)' }}>
              <MonitorSmartphone size={32} />
              <h4>Frontend Magic</h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Crafting responsive, accessible, and stunning user interfaces.</p>
          </div>
          
          <div className="glass about-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-espresso)' }}>
              <Code2 size={32} />
              <h4>Clean Architecture</h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Writing maintainable, scalable, and efficient codebases.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
