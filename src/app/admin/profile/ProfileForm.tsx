"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileData, PortfolioData } from '@/lib/data';

export default function ProfileForm({ fullData }: { fullData: PortfolioData }) {
  const [profile, setProfile] = useState<ProfileData>(fullData.profile);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setLoading(true);
    setMessage('Uploading image...');
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setProfile({ ...profile, image: data.url });
        setMessage("Image uploaded successfully! (Don't forget to save profile)");
      } else {
        setMessage(data.error || 'Failed to upload image.');
      }
    } catch (err) {
      setMessage('Error uploading image.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const updatedData = { ...fullData, profile };
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated successfully!');
        router.refresh();
      } else {
        setMessage(data.error || 'Failed to update profile.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-glass)',
    color: 'white',
    outline: 'none',
    fontFamily: 'inherit',
    marginBottom: '16px'
  };

  const labelStyle = { display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' };

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '24px' }}>Edit Profile</h2>
      {message && (
        <div style={{ padding: '12px', background: message.includes('success') ? 'rgba(52, 168, 83, 0.2)' : 'rgba(234, 67, 53, 0.2)', color: message.includes('success') ? '#34a853' : '#ea4335', borderRadius: '8px', marginBottom: '24px' }}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Full Name</label>
        <input name="name" value={profile.name} onChange={handleChange} style={inputStyle} required />

        <label style={labelStyle}>Job Title</label>
        <input name="title" value={profile.title} onChange={handleChange} style={inputStyle} required />

        <label style={labelStyle}>About Me</label>
        <textarea name="about" value={profile.about} onChange={handleChange} style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} required />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input name="email" value={profile.email} onChange={handleChange} style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input name="phone" value={profile.phone} onChange={handleChange} style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>LinkedIn URL</label>
            <input name="linkedin" value={profile.linkedin} onChange={handleChange} style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>GitHub Username</label>
            <input name="github" value={profile.github} onChange={handleChange} style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>Instagram Username</label>
            <input name="instagram" value={profile.instagram} onChange={handleChange} style={inputStyle} required />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Profile Image</label>
            <div className="flex gap-4 items-center">
              {profile.image && (
                <img src={profile.image} alt="Profile Preview" style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-cyan)' }} />
              )}
              <div style={{ flex: 1 }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }} />
                <input name="image" value={profile.image || ''} onChange={handleChange} style={inputStyle} placeholder="Or paste image URL here (e.g. https://example.com/photo.jpg)" />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '24px' }}>
          {loading ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
