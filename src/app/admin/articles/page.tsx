import { getPortfolioData } from '@/lib/data';
import ArticlesForm from './ArticlesForm';

export const metadata = { title: 'Edit Articles | Admin' };

export default async function AdminArticlesPage() {
  const data = await getPortfolioData();
  return (
    <div>
      <h1 style={{ marginBottom: '32px' }}>Manage Articles</h1>
      <ArticlesForm fullData={data} />
    </div>
  );
}
