import ProfileView from '@/components/Profile-View/ViewProfile';

export default async function ProfilePage({ params }: { params: { id: string } }) {
  return <ProfileView userId={params.id} />;
}