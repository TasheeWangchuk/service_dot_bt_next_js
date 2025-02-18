export interface User {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
  }
  
  export interface FreelancerProfile {
    role: any;
    profile_id: number;
    user: User;
    headline: string | null;
    profile_picture: string | null;
    banner: string | null;
    bio: string | null;
    address: string | null;
    skills: string[];
    average_rating: string;
  }
  