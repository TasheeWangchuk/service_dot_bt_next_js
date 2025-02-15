// app/profile-view/[id]/page.tsx
import ProfileView from '@/components/ViewProfile';

export default function ProfilePage({ params }: { params: { id: string } }) {
  return <ProfileView userId={params.id} />;
}
// app/profile-view/[id]/page.tsx
// import { Suspense } from 'react';
// import Loading from '@/components/Shared/Loading';
// import ViewProfile from '@/components/ViewProfile';

// export default function ProfileViewPage({ params }: { params: { id: string } }) {
//   return (
//     <Suspense fallback={<Loading />}>
//       <ViewProfile userId={params.id} />
//     </Suspense>
//   );}