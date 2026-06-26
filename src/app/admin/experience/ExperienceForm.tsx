"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Experience, PortfolioData } from '@/lib/data';
import { Trash2, Plus } from 'lucide-react';

export default function ExperienceForm({ fullData }: { fullData: PortfolioData }) {
  const [experienceList, setExperienceList] = useState<Experience[]>(fullData.experience);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAdd = () => {
    setExperienceList([...experienceList, { id: Date.now().toString(), company: '', role: '', period: '', description: '' }]);
  };

  const handleRemove = (index: number) => {
    const newList = [...experienceList];
    newList.splice(index, 1);
    setExperienceList(newList);
  };

  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const newList = [...experienceList];
    newList[index] = { ...newList[index], [field]: value };
    setExperienceList(newList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const updatedData = { ...fullData, experience: experienceList };
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Experience updated successfully!');
        router.refresh();
      } else {
        setMessage(data.error || 'Failed to update experience.');
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
        <h2 style={{ margin: 0 }}>Edit Experience</h2>
        <button type="button" onClick={handleAdd} className="btn flex items-center gap-2" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {message && <div style={{ padding: '12px', background: message.includes('success') ? 'rgba(52, 168, 83, 0.2)' : 'rgba(234, 67, 53, 0.2)', color: message.includes('success') ? '#34a853' : '#ea4335', borderRadius: '8px', marginBottom: '24px' }}>{message}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {experienceList.map((exp, index) => (
          <div key={exp.id} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-glass)', position: 'relative' }}>
            <button type="button" onClick={() => handleRemove(index)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>
              <Trash2 size={20} />
            </button>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '12px', paddingRight: '32px' }}>
              <div>
                <label style={labelStyle}>Company</label>
                <input value={exp.company} onChange={(e) => handleChange(index, 'company', e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <input value={exp.role} onChange={(e) => handleChange(index, 'role', e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Period</label>
                <input value={exp.period} onChange={(e) => handleChange(index, 'period', e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea value={exp.description} onChange={(e) => handleChange(index, 'description', e.target.value)} style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} required />
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: 'flex-start' }}>
          {loading ? 'Saving...' : 'Save Experience'}
        </button>
      </form>
    </div>
  );
}
