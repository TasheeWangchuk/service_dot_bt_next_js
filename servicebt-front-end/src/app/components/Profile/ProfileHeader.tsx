import React, { useState, useEffect } from "react";

interface ProfileHeaderProps {
  user?: {
    name: string;
    username: string;
    bio?: string;
    bannerUrl?: string;
    avatarUrl?: string;
    avgRating?: number;
    isVerified?: boolean;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  user = {
    name: "Loday T Gyeltshen",
    username: "dxdy",
    bio: "Update your bio here!",
    bannerUrl: "/banner.jpg",
    avatarUrl: "/Profile_placeholder.png",
    avgRating: 4.5,
    // isVerified: true,
  } 
}) => {
  const [bio, setBio] = useState(user.bio || "");
  const [name, setName] = useState(user.name || "Anonymous User");
  const [editingBio, setEditingBio] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [bannerUrl, setBannerUrl] = useState(user.bannerUrl || "/banner.jpg");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "/placeholder.jpg");

  useEffect(() => {
    if (user.name) {
      setName(user.name);
    }
  }, [user]);

   // Handle Bio Editing
   const handleEditBioClick = () => setEditingBio(true);
  
   const handleSaveBio = () => {
     if (!bio) {
       alert("Bio cannot be empty!");
       return;
     }
     setEditingBio(false);
     console.log("Updated Bio:", bio);
   };
 
   const handleCancelBio = () => {
     setEditingBio(false);
     setBio(user.bio || "");
   };
 
   // Handle Name Editing
   const handleEditNameClick = () => setEditingName(true);
 
   const handleSaveName = () => {
     if (!name) {
       alert("Name cannot be empty!");
       return;
     }
     setEditingName(false);
     console.log("Updated Name:", name);
   };
 
   const handleCancelName = () => {
     setEditingName(false);
     setName(user.name || "Anonymous User"); // Reset to "Anonymous User" if user name is empty
   };
 
   // Handle Banner Upload
   const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
     if (event.target.files && event.target.files[0]) {
       const file = URL.createObjectURL(event.target.files[0]);
       setBannerUrl(file);
       console.log("Uploaded Banner:", file);
     } else {
       alert("Failed to upload banner.");
     }
   };
 
   // Handle Avatar Upload
   const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
     if (event.target.files && event.target.files[0]) {
       const file = URL.createObjectURL(event.target.files[0]);
       setAvatarUrl(file);
       console.log("Uploaded Profile Picture:", file);
     } else {
       alert("Failed to upload avatar.");
     }
   };

  return (
    <div className="profile-header">
      {/* Banner Section */}
      <div className="banner relative mt-14 h-auto">
        <img
          src={bannerUrl}
          alt="Banner"
          className="w-full h-48 object-cover rounded-lg shadow-md"
        />
        <label className="absolute top-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerUpload}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </label>
      </div>

      {/* Profile Info */}
      <div className="profile-info flex flex-col items-center mt-4">
        <div className="relative">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </label>
        </div>

        {/* Editable Name Section */}
        {editingName ? (
          <div className="flex flex-col items-center mt-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-64"
            />
            <div className="mt-4 space-x-2">
              <button
                onClick={handleSaveName}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleCancelName}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl font-bold mt-4">
            {name} 
            <button
              className="ml-2 text-orange-500 text-sm px-2 py-1 rounded-md hover:bg-blue-100"
              onClick={handleEditNameClick}
            >
              + Edit
            </button>
          </h1>
        )}

        <p className="text-gray-500 text-sm">@{user.username || "username"}</p>

        {/* Ratings and Verification */}
        <div className="mt-2 flex items-center space-x-4">
          {user.avgRating && (
            <span className="text-yellow-500 flex items-center">
              Rating {user.avgRating.toFixed(1)} 
            </span>
          )}
          {/* {user.isVerified && (
            <span className="text-blue-500 font-semibold">Verified</span>
          )} */}
        </div>

        {/* Bio Section */}
        {editingBio ? (
          <div className="flex flex-col items-center mt-4">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 w-64"
              rows={3}
            />
            <div className="mt-4 space-x-2">
              <button
                onClick={handleSaveBio}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleCancelBio}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mt-4 flex items-center space-x-2">
            <span>{bio || "Add a bio"}</span>
            <button
              className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
              title="Edit Bio"
              onClick={handleEditBioClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;

// import React, { useState } from "react";

// interface ProfileHeaderProps {
//   user?: {
//     name: string;
//     username: string;
//     bio?: string;
//     bannerUrl?: string;
//     avatarUrl?: string;
//     avgRating?: number;
//     //isVerified?: boolean;
//   };
// }

// const EditableField: React.FC<{
//   value: string;
//   onSave: (value: string) => void;
//   onCancel: () => void;
//   isEditing: boolean;
//   setIsEditing: (editing: boolean) => void;
//   placeholder: string;
//   multiline?: boolean;
// }> = ({ value, onSave, onCancel, isEditing, setIsEditing, placeholder, multiline = false }) => {
//   const [tempValue, setTempValue] = useState(value);

//   return isEditing ? (
//     <div className="flex flex-col items-center mt-4" >
//       {multiline ? (
//         <textarea
//           value={tempValue}
//           onChange={(e) => setTempValue(e.target.value)}
//           className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
//           rows={3}
//           placeholder={placeholder}
//         />
//       ) : (
//         <input
//           type="text"
//           value={tempValue}
//           onChange={(e) => setTempValue(e.target.value)}
//           className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
//           placeholder={placeholder}
//         />
//       )}
//       <div className="mt-4 space-x-2">
//         <button
//           onClick={() => {
//             onSave(tempValue);
//             setIsEditing(false);
//           }}
//           className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
//         >
//           Save
//         </button>
//         <button
//           onClick={() => {
//             onCancel();
//             setIsEditing(false);
//           }}
//           className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   ) : (
//     <div className="flex items-center space-x-2">
//       <span>{value || placeholder}</span>
//       <button
//         className="bg-gray-200 p-1 rounded-full hover:bg-gray-300"
//         title="Edit"
//         onClick={() => setIsEditing(true)}
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1}
//           stroke="currentColor"
//           className="w-3 h-3 text-gray-500"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// const ProfileHeader: React.FC<ProfileHeaderProps> = ({
//   user = {
//     name: "John Doe",
//     username: "john_doe",
//     bio: "This is a sample bio. Update your profile here!",
//     bannerUrl: "/banner.jpg",
//     avatarUrl: "/avatar.jpg",
//     avgRating: 4.5,
    
//   },
// }) => {
//   const [bio, setBio] = useState(user.bio || "");
//   const [name, setName] = useState(user.name || "Anonymous User");
//   const [bannerUrl, setBannerUrl] = useState(user.bannerUrl || "/banner.jpg");
//   const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "/placeholder.jpg");
//   const [editingBio, setEditingBio] = useState(false);
//   const [editingName, setEditingName] = useState(false);

//   // Handle Banner Upload
//   const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = URL.createObjectURL(event.target.files[0]);
//       setBannerUrl(file);
//     }
//   };

//   // Handle Avatar Upload
//   const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = URL.createObjectURL(event.target.files[0]);
//       setAvatarUrl(file);
//     }
//   };

//   return (
//     <div className="profile-header max-w-4xl mx-auto p-4 bg-white shadow rounded-lg">
//       {/* Banner Section */}
//       <div className="relative h-48">
//         <img
//           src={bannerUrl}
//           alt="Banner"
//           className="w-full h-full object-cover rounded-lg"
//         />
//         <label className="absolute top-2 right-2 bg-white rounded-full p-2 shadow cursor-pointer">
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleBannerUpload}
//           />
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2}
//             stroke="currentColor"
//             className="w-2 h-2 text-gray-600"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//           </svg>
//         </label>
//       </div>

//       {/* Profile Info */}
//       <div className="flex flex-col items-center mt-4">
//         <div className="relative">
//           <img
//             src={avatarUrl}
//             alt="Avatar"
//             className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
//           />
//           <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow cursor-pointer">
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleAvatarUpload}
//             />
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="w-6 h-6 text-gray-600"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//           </label>
//         </div>

//         {/* Editable Name Section */}
//         <EditableField
//           value={name}
//           onSave={setName}
//           onCancel={() => setName(user.name || "Anonymous User")}
//           isEditing={editingName}
//           setIsEditing={setEditingName}
//           placeholder="Add your name"
//         />

//         <p className="text-gray-500 text-sm mt-5">@{user.username || "username"}</p>

//         {/* Ratings */}
//         <div className="mt-2 flex items-center space-x-4">
//           {user.avgRating && (
//           //   <span className="inline-block text-yellow-500">
//           //   {"★".repeat(review.rating)}
//           //   {"☆".repeat(5 - review.rating)}
//           // </span>
//             <span className="text-yellow-500 flex items-center">
//               ★ {user.avgRating.toFixed(1)}
//             </span>
//           )}
      
//         </div>

//         {/* Editable Bio Section */}
//         <EditableField
//           value={bio}
//           onSave={setBio}
//           onCancel={() => setBio(user.bio || "")}
//           isEditing={editingBio}
//           setIsEditing={setEditingBio}
//           placeholder="Add a bio"
//           multiline
//         />
//       </div>
//     </div>
//   );
// };

// export default ProfileHeader;
