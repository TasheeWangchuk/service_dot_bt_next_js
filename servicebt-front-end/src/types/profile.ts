export interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    username: string;
    profile: {
      banner: string;
      profile_picture: string;
      headline: string;
      address: string;
      bio: string;
    };
  }