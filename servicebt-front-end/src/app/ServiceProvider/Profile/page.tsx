"use client";

import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import SkillCard from "@/components/Profile/SkillCard";
import ExperienceCard from "@/components/Profile/ExperienceCard";
import CertificationForm from "@/components/Profile/CertificationForm";
import Navbar from "@/components/Shared/NavBar";
import Portfolio from "@/components/Profile/Portfolio";
import Reviews from "@/components/Profile/Reviews";
import Services from "@/components/Profile/Services";
import ExperienceForm from "@/components/Profile/ExperienceForm";
import Footer from "@/components/Shared/Footer";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

interface Experience {
  id: number;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  image: File | null;
}

const Profile: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);

  // Fetch experiences and certifications on component mount
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get('/api/experiences');
        setExperiences(response.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    const fetchCertifications = async () => {
      try {
        const response = await axios.get('/api/certifications');
        setCertifications(response.data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    fetchExperiences();
    fetchCertifications();
  }, []);

  const addExperience = async (newExperience: Omit<Experience, "id">) => {
    try {
      const response = await axios.post('/api/experiences', newExperience);
      setExperiences((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

  const deleteExperience = async (id: number) => {
    try {
      await axios.delete(`/api/experiences/${id}`);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const addCertification = async (newCertification: Omit<Certification, "id">) => {
    try {
      const response = await axios.post('/api/certifications', newCertification);
      setCertifications((prev) => [...prev, response.data]);
      setIsCertificationModalOpen(false);
    } catch (error) {
      console.error("Error adding certification:", error);
    }
  };

  const deleteCertification = async (id: number) => {
    try {
      await axios.delete(`/api/certifications/${id}`);
      setCertifications((prev) => prev.filter((cert) => cert.id !== id));
    } catch (error) {
      console.error("Error deleting certification:", error);
    }
  };

  const [isViewMoreOpen, setIsViewMoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white p-8 mt-6 rounded-xl shadow-lg">
        <ProfileHeader />
        <Services />
        <SkillCard />

        {/* Experience Section */}
        <section className="p-6 mt-6 bg-white rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Experience</h2>
            <button
              className="flex items-center text-sm text-orange-600 hover:text-orange-800"
              onClick={() => setIsExperienceModalOpen(true)}
            >
              <AiOutlinePlus className="mr-1" />
              Add Experience
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                onDelete={() => deleteExperience(exp.id)}
              />
            ))}
          </div>
        </section>
        {isExperienceModalOpen && (
          <ExperienceForm
            onSave={(newExperience) => {
              addExperience(newExperience);
              setIsExperienceModalOpen(false);
            }}
            onClose={() => setIsExperienceModalOpen(false)}
          />
        )}

        {/* Certification Section */}
        <section className="p-6 bg-gray-100 h-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
            <button
              className="flex items-center text-sm text-orange-600 hover:text-orange-800"
              onClick={() => setIsCertificationModalOpen(true)}
            >
              <AiOutlinePlus className="mr-1" />
              Add Certification
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {certifications.slice(0, isViewMoreOpen ? certifications.length : 2).map((cert) => (
              <div
                key={cert.id}
                className="border rounded-lg p-4 overflow-hidden relative bg-gradient-to-t from-gray-800 to-gray-900"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-50">{cert.title}</h3>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => deleteCertification(cert.id)}
                  >
                    <AiOutlineDelete size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-100">Issuer: {cert.issuer}</p>
                <p className="text-sm text-gray-100">
                  Issue Date: {cert.issueDate}
                </p>
                {cert.image && (
                  <img
                    src={URL.createObjectURL(cert.image)}
                    alt={cert.title}
                    className="w-full h-auto mt-2 rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
          {certifications.length > 2 && !isViewMoreOpen && (
            <button
              className="mt-4 text-orange-600 hover:text-orange-800"
              onClick={() => setIsViewMoreOpen(true)}
            >
              View More
            </button>
          )}
          {isViewMoreOpen && (
            <button
              className="mt-4 text-orange-600 hover:text-orange-800"
              onClick={() => setIsViewMoreOpen(false)}
            >
              View Less
            </button>
          )}
        </section>

        {isCertificationModalOpen && (
          <CertificationForm
            certifications={certifications}
            onDelete={(id: number) => setCertifications((prev) => prev.filter((cert) => cert.id !== id))}
            onSave={(newCertification) => addCertification(newCertification)}
            onClose={() => setIsCertificationModalOpen(false)}
          />
        )}

        {/* Portfolio Section */}
        <section className="p-6 mt-6 bg-gray-100 rounded-lg shadow-sm">
          <Portfolio />
        </section>

        {/* Reviews Section */}
        <section className="mt-6">
          <Reviews />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
// "use client";

// import React, { useEffect, useState } from "react";
// import ProfileHeader from "@/app/components/Profile/ProfileHeader";
// import SkillCard from "@/app/components/Profile/SkillCard";
// import ExperienceCard from "@/app/components/Profile/ExperienceCard";
// import CertificationForm from "@/app/components/Profile/CertificationForm";
// import Navbar from "@/app/components/Shared/NavBar";
// import Portfolio from "@/app/components/Profile/Portfolio";
// import Reviews from "@/app/components/Profile/Reviews";
// import Services from "@/app/components/Profile/Services";
// import ExperienceForm from "@/app/components/Profile/ExperienceForm";
// import Footer from "@/app/components/Shared/Footer";
// import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
// import axios from "axios";

// interface Experience {
//   id: number;
//   role: string;
//   company: string;
//   startDate: string;
//   endDate: string;
// }

// interface Certification {
//   id: number;
//   title: string;
//   issuer: string;
//   issueDate: string;
//   image: File | null;
// }

// const Profile: React.FC = () => {
//   const [experiences, setExperiences] = useState<Experience[]>([]);
//   const [certifications, setCertifications] = useState<Certification[]>([]);
//   const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
//   const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
//   const [isViewMoreOpen, setIsViewMoreOpen] = useState(false);

//   // Fetch experiences and certifications on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [expResponse, certResponse] = await Promise.all([
//           axios.get('/api/experiences'), // Update with your backend URL
//           axios.get('/api/certifications'),
//         ]);
//         setExperiences(expResponse.data);
//         setCertifications(certResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const addExperience = async (newExperience: Omit<Experience, "id">) => {
//     try {
//       const response = await axios.post('/api/experiences', newExperience);
//       setExperiences((prev) => [...prev, response.data]);
//     } catch (error) {
//       console.error("Error adding experience:", error);
//     }
//   };

//   const deleteExperience = async (id: number) => {
//     try {
//       await axios.delete(`/api/experiences/${id}`);
//       setExperiences((prev) => prev.filter((exp) => exp.id !== id));
//     } catch (error) {
//       console.error("Error deleting experience:", error);
//     }
//   };

//   const addCertification = async (newCertification: Omit<Certification, "id">) => {
//     try {
//       const response = await axios.post('/api/certifications', newCertification);
//       setCertifications((prev) => [...prev, response.data]);
//       setIsCertificationModalOpen(false);
//     } catch (error) {
//       console.error("Error adding certification:", error);
//     }
//   };

//   const deleteCertification = async (id: number) => {
//     try {
//       await axios.delete(`/api/certifications/${id}`);
//       setCertifications((prev) => prev.filter((cert) => cert.id !== id));
//     } catch (error) {
//       console.error("Error deleting certification:", error);
//     }
//   };

//   const requestHire = async () => {
//     try {
//       const response = await axios.post('/api/hire', {
//         freelancerId: 1, // Replace with actual freelancer ID
//         clientId: 2,     // Replace with actual client ID
//       });
//       alert("Hire request sent successfully!");
//     } catch (error) {
//       console.error("Error sending hire request:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <div className="max-w-7xl mx-auto bg-white p-8 mt-6 rounded-xl shadow-lg">
//         <ProfileHeader userId={""} />
//         <button
//           onClick={requestHire}
//           className="mt-4 px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700"
//         >
//           Request to Hire
//         </button>
//         <Services />
//         <SkillCard />

//         {/* Experience Section */}
//         <section className="p-6 mt-6 bg-white rounded-lg shadow-sm">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">Experience</h2>
//             <button
//               className="flex items-center text-sm text-orange-600 hover:text-orange-800"
//               onClick={() => setIsExperienceModalOpen(true)}
//             >
//               <AiOutlinePlus className="mr-1" />
//               Add Experience
//             </button>
//           </div>
//           <div className="grid gap-4 md:grid-cols-2">
//             {experiences.map((exp) => (
//               <ExperienceCard
//                 key={exp.id}
//                 experience={exp}
//                 onDelete={() => deleteExperience(exp.id)}
//               />
//             ))}
//           </div>
//         </section>
//         {isExperienceModalOpen && (
//           <ExperienceForm
//             onSave={(newExperience) => {
//               addExperience(newExperience);
//               setIsExperienceModalOpen(false);
//             }}
//             onClose={() => setIsExperienceModalOpen(false)}
//           />
//         )}

//         {/* Certification Section */}
//         <section className="p-6 bg-gray-100 h-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
//             <button
//               className="flex items-center text-sm text-orange-600 hover:text-orange-800"
//               onClick={() => setIsCertificationModalOpen(true)}
//             >
//               <AiOutlinePlus className="mr-1" />
//               Add Certification
//             </button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {certifications.slice(0, isViewMoreOpen ? certifications.length : 2).map((cert) => (
//               <div
//                 key={cert.id}
//                 className="border rounded-lg p-4 overflow-hidden relative bg-gradient-to-t from-gray-800 to-gray-900"
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-bold text-gray-50">{cert.title}</h3>
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     onClick={() => deleteCertification(cert.id)}
//                   >
//                     <AiOutlineDelete size={18} />
//                   </button>
//                 </div>
//                 <p className="text-sm text-gray-100">Issuer: {cert.issuer}</p>
//                 <p className="text-sm text-gray-100">
//                   Issue Date: {cert.issueDate}
//                 </p>
//                 {cert.image && (
//                   <img
//                     src={URL.createObjectURL(cert.image)}
//                     alt={cert.title}
//                     className="w-full h-auto mt-2 rounded-md"
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//           {certifications.length > 2 && !isViewMoreOpen && (
//             <button
//               className="mt-4 text-orange-600 hover:text-orange-800"
//               onClick={() => setIsViewMoreOpen(true)}
//             >
//               View More
//             </button>
//           )}
//           {isViewMoreOpen && (
//             <button
//               className="mt-4 text-orange-600 hover:text-orange-800"
//               onClick={() => setIsViewMoreOpen(false)}
//             >
//               View Less
//             </button>
//           )}
//         </section>

//         {isCertificationModalOpen && (
//           <CertificationForm
//             certifications={certifications}
//             onDelete={(id: number) => setCertifications((prev) => prev.filter((cert) => cert.id !== id))}
//             onSave={(newCertification) => addCertification(newCertification)}
//             onClose={() => setIsCertificationModalOpen(false)}
//           />
//         )}

//         {/* Portfolio Section */}
//         <section className="p-6 mt-6 bg-gray-100 rounded-lg shadow-sm">
//           <Portfolio />
//         </section>

//         {/* Reviews Section */}
//         <section className="mt-6">
//           <Reviews />
//         </section>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Profile;
