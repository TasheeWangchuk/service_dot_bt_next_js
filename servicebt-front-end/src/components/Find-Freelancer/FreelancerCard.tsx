import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Star, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
      className="group relative overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 border-0 hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20" />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 dark:bg-white/5" />

      <CardContent className="relative p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <Avatar className="h-20 w-20 ring-2 ring-white/90 dark:ring-gray-800/90 shadow-lg">
              <AvatarImage
                src={freelancer.profile_picture || '/api/placeholder/150/150'}
                alt={`${freelancer.user.first_name} ${freelancer.user.last_name}`}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-lg">
              <div className="flex items-center space-x-1 px-2 py-1">
                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                <span className="text-sm font-medium">
                  {parseFloat(freelancer.average_rating).toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {freelancer.user.first_name} {freelancer.user.last_name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {freelancer.headline || 'Freelancer'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {freelancer.skills?.length > 0 ? (
                freelancer.skills.map((skill, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-400">No skills listed</span>
              )}
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{freelancer.address || "Remote"}</span>
              </div>
              <div className="flex items-center">
                {/* <Clock className="h-4 w-4 mr-1" />
                <span>Available Now</span> */}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FreelancerCard;