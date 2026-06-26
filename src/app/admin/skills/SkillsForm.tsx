"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skill, PortfolioData } from '@/lib/data';
import { Trash2, Plus } from 'lucide-react';

export default function SkillsForm({ fullData }: { fullData: PortfolioData }) {
  const [skills, setSkills] = useState<Skill[]>(fullData.skills);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAdd = () => {
    setSkills([...skills, { name: 'New Skill', level: 50 }]);
  };

  const handleRemove = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const handleChange = (index: number, field: keyof Skill, value: string | number) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setSkills(newSkills);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const updatedData = { ...fullData, skills };
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Skills updated successfully!');
        router.refresh();
      } else {
        setMessage(data.error || 'Failed to update skills.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '6px',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-glass)',
    color: 'white',
    outline: 'none',
  };

  return (
    <div className="glass-card">
      <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0 }}>Edit Skills</h2>
        <button type="button" onClick={handleAdd} className="btn flex items-center gap-2" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          <Plus size={16} /> Add Skill
        </button>
      </div>

      {message && (
        <div style={{ padding: '12px', background: message.includes('success') ? 'rgba(52, 168, 83, 0.2)' : 'rgba(234, 67, 53, 0.2)', color: message.includes('success') ? '#34a853' : '#ea4335', borderRadius: '8px', marginBottom: '24px' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex gap-4 items-center" style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Skill Name</label>
              <input 
                value={skill.name} 
                onChange={(e) => handleChange(index, 'name', e.target.value)} 
                style={inputStyle} 
                required 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Level (0-100)</label>
              <input 
                type="number" 
                min="0" max="100" 
                value={skill.level} 
                onChange={(e) => handleChange(index, 'level', parseInt(e.target.value) || 0)} 
                style={inputStyle} 
                required 
              />
            </div>
            <div style={{ paddingTop: '20px' }}>
              <button type="button" onClick={() => handleRemove(index)} style={{ background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer', padding: '8px' }}>
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '24px', alignSelf: 'flex-start' }}>
          {loading ? 'Saving...' : 'Save Skills'}
        </button>
      </form>
    </div>
  );
}
