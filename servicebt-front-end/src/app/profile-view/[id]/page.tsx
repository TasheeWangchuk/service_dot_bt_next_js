import Navbar from '@/components/NavBar/NavBar';
import ProfileView from '@/components/Profile-View/ViewProfile';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <Navbar/>
  <ProfileView userId={params.id} />
  
    </div>);
}