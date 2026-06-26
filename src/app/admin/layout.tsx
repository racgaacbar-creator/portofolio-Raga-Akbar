"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, User, FileText, Briefcase, GraduationCap, Code, Star, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Profile Info', path: '/admin/profile', icon: <User size={20} /> },
    { name: 'Skills', path: '/admin/skills', icon: <Star size={20} /> },
    { name: 'Education', path: '/admin/education', icon: <GraduationCap size={20} /> },
    { name: 'Experience', path: '/admin/experience', icon: <Briefcase size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <Code size={20} /> },
    { name: 'Articles', path: '/admin/articles', icon: <FileText size={20} /> },
  ];

  return (
    <div className="container flex" style={{ paddingTop: '40px', minHeight: '80vh', gap: '32px' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', flexShrink: 0 }}>
        <div className="glass-card" style={{ padding: '24px', position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px' }}>
            Admin Panel
          </h2>
          
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className="flex items-center gap-3"
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: isActive ? 'var(--bg-glass-hover)' : 'transparent',
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s'
                  }}
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
          </nav>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-3"
            style={{
              width: '100%',
              padding: '10px 16px',
              marginTop: '32px',
              borderRadius: '8px',
              background: 'transparent',
              color: '#ff4d4f',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: 500
            }}
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, paddingBottom: '60px' }}>
        {children}
      </main>
    </div>
  );
}
