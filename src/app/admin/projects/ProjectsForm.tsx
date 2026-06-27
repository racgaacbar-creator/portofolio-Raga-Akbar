"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project, PortfolioData } from '@/lib/data';
import { Trash2, Plus } from 'lucide-react';

export default function ProjectsForm({ fullData }: { fullData: PortfolioData }) {
  const [projectsList, setProjectsList] = useState<Project[]>(fullData.projects);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAdd = () => {
    setProjectsList([...projectsList, { id: Date.now().toString(), title: '', description: '', link: '', image: '' }]);
  };

  const handleRemove = (index: number) => {
    const newList = [...projectsList];
    newList.splice(index, 1);
    setProjectsList(newList);
  };

  const handleChange = (index: number, field: keyof Project, value: string) => {
    const newList = [...projectsList];
    newList[index] = { ...newList[index], [field]: value };
    setProjectsList(newList);
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
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
        const newList = [...projectsList];
        newList[index] = { ...newList[index], image: data.url };
        setProjectsList(newList);
        setMessage("Image uploaded successfully! (Don't forget to save projects)");
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
      const updatedData = { ...fullData, projects: projectsList };
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Projects updated successfully!');
        router.refresh();
      } else {
        setMessage(data.error || 'Failed to update projects.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'var(--bg-primary)', border: '1px solid var(--border-glass)', color: 'white', outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' };

  return (
    <div className="glass-card">
      <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>Edit Projects</h2>
        <button type="button" onClick={handleAdd} className="btn flex items-center gap-2" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      {message && <div style={{ padding: '12px', background: message.includes('success') ? 'rgba(52, 168, 83, 0.2)' : 'rgba(234, 67, 53, 0.2)', color: message.includes('success') ? '#34a853' : '#ea4335', borderRadius: '8px', marginBottom: '24px' }}>{message}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {projectsList.map((project, index) => (
          <div key={project.id} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-glass)', position: 'relative' }}>
            <button type="button" onClick={() => handleRemove(index)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>
              <Trash2 size={20} />
            </button>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px', paddingRight: '32px' }}>
              <div>
                <label style={labelStyle}>Project Title</label>
                <input value={project.title} onChange={(e) => handleChange(index, 'title', e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Project Link (optional)</label>
                <input value={project.link || ''} onChange={(e) => handleChange(index, 'link', e.target.value)} style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Project Image</label>
                <div className="flex gap-4 items-center">
                  {project.image && (
                    <img src={project.image} alt="Project Preview" style={{ width: '80px', height: '60px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--border-glass)' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(index, e)} style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }} />
                    <input value={project.image || ''} onChange={(e) => handleChange(index, 'image', e.target.value)} style={inputStyle} placeholder="Or paste image URL here (e.g. https://example.com/photo.jpg)" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea value={project.description} onChange={(e) => handleChange(index, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} required />
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: 'flex-start' }}>
          {loading ? 'Saving...' : 'Save Projects'}
        </button>
      </form>
    </div>
  );
}
