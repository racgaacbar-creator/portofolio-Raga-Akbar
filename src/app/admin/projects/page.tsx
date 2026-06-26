import { getPortfolioData } from '@/lib/data';
import ProjectsForm from './ProjectsForm';

export const metadata = { title: 'Edit Projects | Admin' };

export default async function AdminProjectsPage() {
  const data = await getPortfolioData();
  return (
    <div>
      <h1 style={{ marginBottom: '32px' }}>Featured Projects</h1>
      <ProjectsForm fullData={data} />
    </div>
  );
}
