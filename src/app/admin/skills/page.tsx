import { getPortfolioData } from '@/lib/data';
import SkillsForm from './SkillsForm';

export const metadata = { title: 'Edit Skills | Admin' };

export default async function AdminSkillsPage() {
  const data = await getPortfolioData();
  return (
    <div>
      <h1 style={{ marginBottom: '32px' }}>Skills & Expertise</h1>
      <SkillsForm fullData={data} />
    </div>
  );
}
