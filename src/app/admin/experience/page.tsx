import { getPortfolioData } from '@/lib/data';
import ExperienceForm from './ExperienceForm';

export const metadata = { title: 'Edit Experience | Admin' };

export default async function AdminExperiencePage() {
  const data = await getPortfolioData();
  return (
    <div>
      <h1 style={{ marginBottom: '32px' }}>Experience History</h1>
      <ExperienceForm fullData={data} />
    </div>
  );
}
