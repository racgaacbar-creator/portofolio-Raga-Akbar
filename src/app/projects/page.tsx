import { getPortfolioData } from '@/lib/data';
import FadeIn from '@/components/FadeIn';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Projects | Raga Akbar',
  description: 'Projects portfolio by Raga Akbar',
};

export default async function ProjectsPage() {
  const data = await getPortfolioData();

  return (
    <div className="container" style={{ paddingTop: '60px' }}>
      <FadeIn>
        <h1>Featured Projects</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
          Here are some of the selected projects I've worked on, showcasing my skills in design and development.
        </p>
      </FadeIn>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px', marginTop: '48px' }}>
        {data.projects.map((project, index) => (
          <FadeIn key={project.id} delay={index * 0.1}>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ height: '200px', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {project.image ? (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                ) : (
                  <span style={{ color: 'var(--text-secondary)' }}>Project Image</span>
                )}
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{project.title}</h2>
              <p style={{ flex: 1 }}>{project.description}</p>
              {project.link && (
                <Link href={project.link} className="flex items-center gap-2" style={{ color: 'var(--accent-cyan)', marginTop: '16px', fontWeight: 500 }} target="_blank" rel="noopener noreferrer">
                  View Project <ChevronRight size={16} />
                </Link>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
