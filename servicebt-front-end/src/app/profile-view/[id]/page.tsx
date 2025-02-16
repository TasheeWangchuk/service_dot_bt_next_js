// app/profile-view/[id]/page.tsx
import ProfileView from '@/components/ViewProfile';

export default function ProfilePage({ params }: { params: { id: string } }) {
  return <ProfileView userId={params.id} />;
}
