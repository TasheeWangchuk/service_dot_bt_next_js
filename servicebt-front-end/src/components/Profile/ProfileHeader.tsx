// 'use client';
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // interface ProfileHeaderProps {
// //   user?: {
// //     name: string;
// //     username: string;
// //     bio?: string;
// //     bannerUrl?: string;
// //     avatarUrl?: string;
// //     avgRating?: number;
// //     isVerified?: boolean;
// //     // followersCount?: number;
// //     // followingCount?: number;
// //     address?: string;
// //   };
// // }

// // const ProfileHeader: React.FC<ProfileHeaderProps> = ({
// //   user = {
// //     name: "Loday T Gyeltshen",
// //     username: "dxdy",
// //     bio: "Update your bio here!",
// //     bannerUrl: "/banner.jpg",
// //     avatarUrl: "/Profile_placeholder.png",
// //     avgRating: 4.5,
// //     address: "Thimphu, Bhutan",
// //     // followersCount: 100,
// //     // followingCount: 50,
// //   },
//   interface ProfileHeaderProps {
//     userId: string; // Unique ID to fetch user data
//   }
  
//   const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userId }) => {
//     const [user, setUser] = useState({
//       name: "",
//       username: "",
//       bio: "",
//       bannerUrl: "",
//       avatarUrl: "",
//       avgRating: 0,
//       address: "",
//       isVerified: false,
//     });
//     const [isEditing, setIsEditing] = useState(false);
  
//     const [name, setName] = useState("");
//     const [username, setUsername] = useState("");
//     const [bio, setBio] = useState("");
//     const [address, setAddress] = useState("");
//     const [bannerUrl, setBannerUrl] = useState("");
//     const [avatarUrl, setAvatarUrl] = useState("");
  
//     // Fetch user data from the backend
//     useEffect(() => {
//       const fetchUserData = async () => {
//         try {
//           const response = await axios.get(`/api/users/${userId}`);
//           const data = response.data;
//           setUser(data);
//           setName(data.name);
//           setUsername(data.username);
//           setBio(data.bio);
//           setAddress(data.address);
//           setBannerUrl(data.bannerUrl);
//           setAvatarUrl(data.avatarUrl);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       };
  
//       fetchUserData();
//     }, [userId]);
  
//     const handleSave = async () => {
//       try {
//         const response = await fetch('/api/user/update-profile', {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             name,
//             username,
//             bio,
//             address,
//           }),
//         });
    
//         if (response.ok) {
//           const updatedData = await response.json();
//           console.log('Profile updated successfully', updatedData);
//         } else {
//           console.error('Error updating profile:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Network error:', error);
//       }
//     };
    
  
//     const handleCancel = () => {
//       setIsEditing(false);
//       setName(user.name);
//       setUsername(user.username);
//       setBio(user.bio);
//       setAddress(user.address);
//       setBannerUrl(user.bannerUrl);
//       setAvatarUrl(user.avatarUrl);
//     };
  
//     const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (e.target.files && e.target.files[0]) {
//         const file = e.target.files[0];
//          // Validate file type
//          if (!file.type.startsWith("image/")) {
//           alert("Please upload a valid image file.");
//           return;
//         }
//         setBannerUrl(URL.createObjectURL(file));
//       }
//     };
  
//     const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       if (e.target.files && e.target.files[0]) {
//         const file = e.target.files[0];
    
//         // Validate file type
//         if (!file.type.startsWith("image/")) {
//           alert("Please upload a valid image file.");
//           return;
//         }
    
//         // Proceed if valid
//         setAvatarUrl(URL.createObjectURL(file));
//       }
//     };
    
//   return (
//     <div className="profile-header">
//       {/* Banner Section */}
//       <div className="banner relative mt-14 h-auto">
//         <img
//           src={bannerUrl}
//           alt="Banner"
//           className="w-full h-48 object-cover rounded-lg shadow-md"
//         />
//         <label
//           htmlFor="banner-upload"
//           className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
//         ><img src="/upload.svg" alt="Custom Icon" className="w-5 h-5 text-gray-600" />
//           <input
//             type="file"
//             id="banner-upload"
//             className="hidden"
//             onChange={handleBannerChange}
//           />
//         </label>
//       </div>

//       {/* Profile Info */}
//       <div className="profile-info flex flex-col items-center mt-4 relative">
//         <div className="relative">
//           <img
//             src={avatarUrl}
//             alt="Avatar"
//             className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
//           />
//           <label
//             htmlFor="avatar-upload"
//             className="absolute bottom-0 right-0 bg-white p-2 text-sm rounded-full text-extra-bold shadow text-orange-600 items-center hover:bg-gray-100 cursor-pointer"
//           ><img src="/upload.svg" alt="Custom Icon" className="w-5 h-5 text-gray-600" />

//             {/* <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth="1.5"
//               stroke="currentColor"
//               className="w-5 h-5 text-gray-600"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.598 19.115a4.5 4.5 0 01-1.691 1.067l-3.193 1.064 1.064-3.193a4.5 4.5 0 011.067-1.691L16.862 3.487z"
//               />
//             </svg>*/}
//             <input
//               type="file"
//               id="avatar-upload"
//               className="hidden"
//               accept="image/*"
//               onChange={handleAvatarChange}
//             />

//           </label>
//         </div>

//         <button
//           className="absolute top-0 right-0 bg-white text-orange-500 p-2  hover:bg-gray-100 item-center" 
//           onClick={() => setIsEditing(true)}
//         >+ Edit Profile
//         </button>

//         <h1 className="text-3xl font-bold mt-4 text-gray-800">{name}</h1>
//         <p className="text-gray-500 text-sm">@{username}</p>
//         <p className="text-gray-700 mt-2 text-center max-w-md">{bio}</p>

//         {/* Ratings, Followers, Following, and Verification */}
//         <div className="mt-4 flex items-center space-x-6">
//           {user.avgRating && (
//             <span className="text-yellow-500 flex items-center">
//               ⭐ {user.avgRating.toFixed(1)}
//             </span>
//           )}
          
          
//           {user.isVerified && (
//             <span className="text-blue-500 font-semibold">✔ Verified</span>
//           )}
          
//         </div>
//         <span className="text-gray-800 text-bold">Address: {user.address}</span>
//       </div>

//       {/* Edit Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
//             <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg p-2 mt-1"
//                   placeholder="Enter your name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg p-2 mt-1"
//                   placeholder="Enter your username"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Bio
//                 </label>
//                 <textarea
//                   value={bio}
//                   onChange={(e) => setBio(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg p-2 mt-1"
//                   placeholder="Enter your bio"
//                   rows={3}
//                 ></textarea>
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end space-x-4">
//               <button
//                 onClick={handleCancel}
//                 className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileHeader;
'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";

interface ProfileHeaderProps {
  userId: string; // Unique ID to fetch user data
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userId }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    role: "",
    profile: {
      profile_id: 0,
      profile_picture: null,
      banner: null,
      bio: null,
      address: null,
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://service-bhutan-api.onrender.com/api/v1/users/profile`, {
            headers: {
              'Authorization': `Bearer ${userId}`, // Assuming the userId is used as a token or authorization
            }
          }
        );
        const data = response.data;
        setUser(data);
        setName(data.first_name);
        setUsername(data.username);
        setBio(data.profile.bio || "No bio available");
        setAddress(data.profile.address || "No address provided");
        setBannerUrl(data.profile.banner || "");
        setAvatarUrl(data.profile.profile_picture || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          bio,
          address,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log('Profile updated successfully', updatedData);
      } else {
        console.error('Error updating profile:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(user.first_name);
    setUsername(user.username);
    setBio(user.profile.bio || "No bio available");
    setAddress(user.profile.address || "No address provided");
    setBannerUrl(user.profile.banner || "");
    setAvatarUrl(user.profile.profile_picture || "");
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      setBannerUrl(URL.createObjectURL(file));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }

      // Proceed if valid
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-header">
      {/* Banner Section */}
      <div className="banner relative mt-14 h-auto">
        <img
          src={bannerUrl || "/default-banner.png"}  // Fallback to default image if bannerUrl is empty
          alt="Banner"
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
        <label
          htmlFor="banner-upload"
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
        >
          <img src="/upload.svg" alt="Custom Icon" className="w-5 h-5 text-gray-600" />
          <input
            type="file"
            id="banner-upload"
            className="hidden"
            onChange={handleBannerChange}
          />
        </label>
      </div>

      {/* Profile Info */}
      <div className="profile-info flex flex-col items-center mt-4 relative">
        <div className="relative">
          <img
            src={avatarUrl || "/default-avatar.png"}  // Fallback to default image if avatarUrl is empty
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-white p-2 text-sm rounded-full text-extra-bold shadow text-orange-600 items-center hover:bg-gray-100 cursor-pointer"
          >
            <img src="/upload.svg" alt="Custom Icon" className="w-5 h-5 text-gray-600" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <button
          className="absolute top-0 right-0 bg-white text-orange-500 p-2 hover:bg-gray-100 item-center" 
          onClick={() => setIsEditing(true)}
        >+ Edit Profile</button>

        <h1 className="text-3xl font-bold mt-4 text-gray-800">{name || 'User'}</h1>
        <p className="text-gray-500 text-sm">@{username || 'username'}</p>
        <p className="text-gray-700 mt-2 text-center max-w-md">{bio || 'Bio not available'}</p>

        {/* Ratings, Followers, Following, and Verification */}
        <div className="mt-4 flex items-center space-x-6">
          {user.profile.bio && (
            <span className="text-yellow-500 flex items-center">
              ⭐ {user.profile.bio}
            </span>
          )}
          
        </div>
        <span className="text-gray-800 text-bold">Address: {address || 'No address'}</span>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter your bio"
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;