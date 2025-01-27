// // src/app/components/RoleGuard.tsx

// import { useAuth } from '@/app/context/AuthContext';
// import { UserRole } from '@/app/types/auth';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// interface RoleGuardProps {
//   children: React.ReactNode;
//   allowedRoles: UserRole[];
// }

// export default function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
//   const { user, isLoading, isAuthorized } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push('/auth/signin');
//     } else if (!isLoading && !isAuthorized(allowedRoles)) {
//       router.push('/unauthorized');
//     }
//   }, [isLoading, user, allowedRoles]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return isAuthorized(allowedRoles) ? children : null;
// }