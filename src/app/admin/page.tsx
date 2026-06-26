import FadeIn from '@/components/FadeIn';

export const metadata = {
  title: 'Admin Dashboard | Raga Akbar',
};

export default function AdminDashboard() {
  return (
    <FadeIn>
      <h1>Dashboard Overview</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Welcome to the admin panel. Use the sidebar to navigate and manage your portfolio content.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card">
          <h3>Vercel KV Status</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            In development mode, data is mocked from local files. In production, connect this to Vercel KV for persistent storage.
          </p>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '16px', fontSize: '0.8rem', marginTop: '16px' }}>
            Local Mock Mode
          </div>
        </div>

        <div className="glass-card">
          <h3>Vercel Blob Status</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Used for uploading profile pictures and project images. Needs BLOB_READ_WRITE_TOKEN in environment variables.
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
