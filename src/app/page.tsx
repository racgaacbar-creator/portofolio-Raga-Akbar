import { getPortfolioData } from '@/lib/data';
import FadeIn from '@/components/FadeIn';
import { Briefcase, GraduationCap, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingTop: '40px' }}>
      
      {/* Hero Section */}
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <FadeIn>
            <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>
              Hi, I'm <br/><span className="gradient-text">{data.profile.name}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '2rem' }}>
              {data.profile.title}
            </h2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p style={{ maxWidth: '600px', fontSize: '1.2rem', marginTop: '1.5rem' }}>
              {data.profile.about}
            </p>
          
        </div>
        {/* Placeholder for Profile Image */}
        <FadeIn delay={0.4} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            width: '350px', height: '350px', 
            borderRadius: '50%', 
            background: 'linear-gradient(45deg, var(--accent-cyan), var(--accent-purple))',
            padding: '4px',
            boxShadow: '0 0 40px var(--accent-glow)'
          }}>
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '50%',
              background: 'var(--bg-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden'
            }}>
              {data.profile.image ? (
                <img src={data.profile.image} alt={data.profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: 'var(--text-secondary)' }}>Profile Photo</span>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Skills Section */}
      <section>
        <FadeIn>
          <h2>Skills & Expertise</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginTop: '32px' }}>
          {data.skills.map((skill, index) => (
            <FadeIn key={skill.name} delay={index * 0.1}>
              <div className="glass-card">
                <div className="flex justify-between" style={{ marginBottom: '12px' }}>
                  <span style={{ fontWeight: 600 }}>{skill.name}</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>{skill.level}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ 
                    width: `${skill.level}%`, height: '100%', 
                    background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-purple))',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Experience & Education Section */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        
        {/* Education Timeline */}
        <div>
          <FadeIn className="flex items-center gap-2" style={{ marginBottom: '32px' }}>
            <GraduationCap size={32} color="var(--accent-purple)" />
            <h2>Education</h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', borderLeft: '2px solid var(--border-glass)', paddingLeft: '24px', marginLeft: '16px' }}>
            {data.education.map((edu, index) => (
              <FadeIn key={edu.id} delay={index * 0.2} style={{ position: 'relative' }}>
                {/* Timeline Dot */}
                <div style={{
                  position: 'absolute', left: '-33px', top: '0',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: 'var(--accent-purple)',
                  boxShadow: '0 0 10px var(--accent-purple)'
                }} />
                <span style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 600 }}>{edu.period}</span>
                <h3 style={{ marginTop: '8px' }}>{edu.school}</h3>
                <p style={{ marginTop: '8px' }}>{edu.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <FadeIn className="flex items-center gap-2" style={{ marginBottom: '32px' }}>
            <Briefcase size={32} color="var(--accent-cyan)" />
            <h2>Experience</h2>
          </FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', borderLeft: '2px solid var(--border-glass)', paddingLeft: '24px', marginLeft: '16px' }}>
            {data.experience.map((exp, index) => (
              <FadeIn key={exp.id} delay={index * 0.2} style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '-33px', top: '0',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: 'var(--accent-cyan)',
                  boxShadow: '0 0 10px var(--accent-cyan)'
                }} />
                <span style={{ color: 'var(--accent-purple)', fontSize: '0.9rem', fontWeight: 600 }}>{exp.period}</span>
                <h3 style={{ marginTop: '8px' }}>{exp.company}</h3>
                <h4 style={{ color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '8px' }}>{exp.role}</h4>
                <p>{exp.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <FadeIn>
          <h2>Featured Projects</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px', marginTop: '32px' }}>
          {data.projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.2}>
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ height: '200px', background: 'var(--bg-secondary)', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>Project Image</span>
                  )}
                </div>
                <h3>{project.title}</h3>
                <p style={{ flex: 1 }}>{project.description}</p>
                {project.link && (
                  <Link href={project.link} className="flex items-center gap-2" style={{ color: 'var(--accent-cyan)', marginTop: '16px', fontWeight: 500 }}>
                    View Project <ChevronRight size={16} />
                  </Link>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      
    </div>
  );
}
