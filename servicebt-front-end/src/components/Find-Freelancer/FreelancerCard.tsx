//FreelancerCard component
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '../ui/card';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { Badge } from '../ui/badge';
import { FreelancerProfile } from '@/types/FindFreelancer';
  const FreelancerCard: React.FC<{ freelancer: FreelancerProfile }> = ({ freelancer }) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (freelancer.profile_id) {
      router.push(`/profile-view/${freelancer.profile_id}`);
    }
  };

  const initials = React.useMemo(() => {
    const first = freelancer.user.first_name?.[0] || '';
    const last = freelancer.user.last_name?.[0] || '';
    return (first + last).toUpperCase();
  }, [freelancer.user.first_name, freelancer.user.last_name]);

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer" 
      onClick={handleCardClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage 
              src={freelancer.profile_picture || '/api/placeholder/150/150'} 
              alt={`${freelancer.user.first_name} ${freelancer.user.last_name}`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">
              {freelancer.user.first_name} {freelancer.user.last_name}
            </h3>
            <p className="text-sm text-gray-500">
              {freelancer.headline || 'Freelancer'}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-sm">
                {parseFloat(freelancer.average_rating).toFixed(1)} Rating
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {freelancer.skills?.length > 0 ? (
                freelancer.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-400">No skills listed</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default FreelancerCard;