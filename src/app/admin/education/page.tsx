import { getPortfolioData } from '@/lib/data';
import EducationForm from './EducationForm';

export const metadata = { title: 'Edit Education | Admin' };

export default async function AdminEducationPage() {
  const data = await getPortfolioData();
  return (
    <div>
      <h1 style={{ marginBottom: '32px' }}>Education History</h1>
      <EducationForm fullData={data} />
    </div>
  );
}
