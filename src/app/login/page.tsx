"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center" style={{ minHeight: '80vh' }}>
      <FadeIn>
        <div className="glass-card" style={{ width: '400px', maxWidth: '100%', padding: '40px' }}>
          <h1 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '8px' }}>Admin Login</h1>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Enter your password to access the dashboard
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (default: admin123)"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-glass)',
                  color: 'white',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            {error && <p style={{ color: '#ff4d4f', fontSize: '0.9rem', margin: 0 }}>{error}</p>}
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', marginTop: '16px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}
