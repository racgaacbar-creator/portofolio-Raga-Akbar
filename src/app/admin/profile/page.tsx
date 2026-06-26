import { getPortfolioData } from '@/lib/data';
import ProfileForm from './ProfileForm';

export const metadata = { title: 'Edit Profile | Admin' };

export default async function AdminProfilePage() {
  const data = await getPortfolioData();
  return (
    <div>
      <h1 style={{ marginBottom: '32px' }}>Profile Information</h1>
      <ProfileForm fullData={data} />
    </div>
  );
}
