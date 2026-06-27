import { getPortfolioData } from '@/lib/data';
import FadeIn from '@/components/FadeIn';
import { Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Articles | Raga Akbar',
  description: 'Articles and writings by Raga Akbar',
};

export default async function ArticlesPage() {
  const data = await getPortfolioData();

  return (
    <div className="container" style={{ paddingTop: '60px' }}>
      <FadeIn>
        <h1>Articles & Writings</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
          Thoughts, learnings, and experiences in software engineering, design, and AR development.
        </p>
      </FadeIn>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px', marginTop: '48px' }}>
        {data.articles.map((article, index) => (
          <FadeIn key={article.id} delay={index * 0.1}>
            <article className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                <Calendar size={16} />
                <time dateTime={article.date}>{article.date}</time>
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{article.title}</h2>
              <p style={{ flex: 1 }}>{article.excerpt}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
