export interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    username: string;
    profile: {
      banner: string;
      profile_picture: string;
      headline: string | null;  
      address: string | null;    
      bio: string;
    };
    skills: string[];          
    portfolios: any[];         
    education: any[];        
    experiences: any[];         
    certificates: any[];        
  }
  
//for View-profile
export interface Experience {
    job_title: string;
    company_name: string;
    start_date: string;
    end_date: string;
  }
  
  export interface Education {
    institution: string;
    degree: string;
    start_date: string;
    end_date: string;
  }
  
  export interface Certificate {
    name: string;
    issuer: string;
    issue_date: string;
  }
  
  
//for uppdating
export interface ProfileData {
    headline?: string;
    bio?: string;
    address?: string;
    profile?: string;
    banner?: string;
  }
  
  
  export interface ProfileUpdateData {
    headline: string;
    bio: string;
    address: string;
  }
  