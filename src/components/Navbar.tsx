"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Articles', path: '/articles' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      transition: 'all 0.3s ease',
      background: scrolled ? 'var(--bg-glass)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-glass)' : '1px solid transparent',
      padding: scrolled ? '12px 0' : '20px 0'
    }}>
      <div className="container flex justify-between items-center">
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>
          RAGA<span className="gradient-text">.AKBAR</span>
        </Link>
        <nav className="flex gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link 
                key={link.path} 
                href={link.path}
                style={{
                  fontWeight: 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textShadow: isActive ? '0 0 10px var(--accent-glow)' : 'none',
                  borderBottom: isActive ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                  paddingBottom: '4px'
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
