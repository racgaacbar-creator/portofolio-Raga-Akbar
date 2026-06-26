"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article, PortfolioData } from '@/lib/data';
import { Trash2, Plus } from 'lucide-react';

export default function ArticlesForm({ fullData }: { fullData: PortfolioData }) {
  const [articlesList, setArticlesList] = useState<Article[]>(fullData.articles);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAdd = () => {
    setArticlesList([...articlesList, { id: Date.now().toString(), title: '', excerpt: '', content: '', date: new Date().toISOString().split('T')[0] }]);
  };

  const handleRemove = (index: number) => {
    const newList = [...articlesList];
    newList.splice(index, 1);
    setArticlesList(newList);
  };

  const handleChange = (index: number, field: keyof Article, value: string) => {
    const newList = [...articlesList];
    newList[index] = { ...newList[index], [field]: value };
    setArticlesList(newList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const updatedData = { ...fullData, articles: articlesList };
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Articles updated successfully!');
        router.refresh();
      } else {
        setMessage(data.error || 'Failed to update articles.');
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
        <h2 style={{ margin: 0 }}>Edit Articles</h2>
        <button type="button" onClick={handleAdd} className="btn flex items-center gap-2" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          <Plus size={16} /> Add Article
        </button>
      </div>

      {message && <div style={{ padding: '12px', background: message.includes('success') ? 'rgba(52, 168, 83, 0.2)' : 'rgba(234, 67, 53, 0.2)', color: message.includes('success') ? '#34a853' : '#ea4335', borderRadius: '8px', marginBottom: '24px' }}>{message}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {articlesList.map((article, index) => (
          <div key={article.id} style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-glass)', position: 'relative' }}>
            <button type="button" onClick={() => handleRemove(index)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#ff4d4f', cursor: 'pointer' }}>
              <Trash2 size={20} />
            </button>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px', paddingRight: '32px' }}>
              <div>
                <label style={labelStyle}>Article Title</label>
                <input value={article.title} onChange={(e) => handleChange(index, 'title', e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <label style={labelStyle}>Publish Date</label>
                <input type="date" value={article.date} onChange={(e) => handleChange(index, 'date', e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Excerpt (Short Summary)</label>
                <input value={article.excerpt} onChange={(e) => handleChange(index, 'excerpt', e.target.value)} style={inputStyle} required />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Full Content</label>
              <textarea value={article.content} onChange={(e) => handleChange(index, 'content', e.target.value)} style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }} required />
            </div>
          </div>
        ))}

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: 'flex-start' }}>
          {loading ? 'Saving...' : 'Save Articles'}
        </button>
      </form>
    </div>
  );
}
