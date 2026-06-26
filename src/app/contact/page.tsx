import { getPortfolioData } from '@/lib/data';
import FadeIn from '@/components/FadeIn';
import { Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Contact | Raga Akbar',
  description: 'Get in touch with Raga Akbar',
};

export default async function ContactPage() {
  const data = await getPortfolioData();

  const socialLinks = [
    { 
      icon: <Mail size={24} />, 
      label: 'Email', value: data.profile.email, href: `mailto:${data.profile.email}`, color: '#ea4335' 
    },
    { 
      icon: <Phone size={24} />, 
      label: 'Phone', value: data.profile.phone, href: `tel:${data.profile.phone}`, color: '#34a853' 
    },
    { 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>, 
      label: 'LinkedIn', value: 'raga-akbar', href: data.profile.linkedin, color: '#0a66c2' 
    },
    { 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>, 
      label: 'GitHub', value: data.profile.github, href: `https://github.com/${data.profile.github}`, color: '#ffffff' 
    },
    { 
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, 
      label: 'Instagram', value: `@${data.profile.instagram}`, href: `https://instagram.com/${data.profile.instagram}`, color: '#e1306c' 
    },
  ];

  return (
    <div className="container" style={{ paddingTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <FadeIn style={{ textAlign: 'center' }}>
        <h1>Get In Touch</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
      </FadeIn>

      <div style={{ width: '100%', maxWidth: '800px', marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {socialLinks.map((link, index) => (
          <FadeIn key={link.label} delay={index * 0.1}>
            <a 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card flex items-center gap-4"
              style={{ display: 'flex', textDecoration: 'none', padding: '32px 24px' }}
            >
              <div style={{ 
                width: '60px', height: '60px', borderRadius: '12px', 
                background: `rgba(255,255,255,0.05)`, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: link.color
              }}>
                {link.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--text-secondary)' }}>{link.label}</h3>
                <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>{link.value}</p>
              </div>
            </a>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
