import React, { useState } from "react";

interface ProfileHeaderProps {
  user?: {
    name: string;
    username: string;
    bio?: string;
    bannerUrl?: string;
    avatarUrl?: string;
    avgRating?: number;
    isVerified?: boolean;
    // followersCount?: number;
    // followingCount?: number;
    address?: string;
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
    address: "Thimphu, Bhutan",
    // followersCount: 100,
    // followingCount: 50,
  },
}) => {
  const [name, setName] = useState(user.name || "Anonymous User");
  const [username, setUsername] = useState(user.username || "username");
  const [bio, setBio] = useState(user.bio || "Update your bio here!");
  const [isEditing, setIsEditing] = useState(false);
  const [bannerUrl, setBannerUrl] = useState(user.bannerUrl);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [address, setAddress] = useState(user.address || "");

  const handleSave = () => {
    if (!name || !username || !bio || !address) {
      alert("Name, username, and bio cannot be empty!");
      return;
    }
    setIsEditing(false);
    console.log("Updated Name:", name);
    console.log("Updated Username:", username);
    console.log("Updated Bio:", bio);
    console.log("Updated Adress:", address);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(user.name || "Anonymous User");
    setUsername(user.username || "username");
    setBio(user.bio || "Update your bio here!");
    setAddress(user.address || "");
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBannerUrl(URL.createObjectURL(file));
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarUrl(URL.createObjectURL(file));
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
        <label
          htmlFor="banner-upload"
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
        ><img src="/upload.svg" alt="Custom Icon" className="w-5 h-5 text-gray-600" />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.598 19.115a4.5 4.5 0 01-1.691 1.067l-3.193 1.064 1.064-3.193a4.5 4.5 0 011.067-1.691L16.862 3.487z"
            />
          </svg> */}
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
            src={avatarUrl}
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-white p-2 text-sm rounded-full text-extra-bold shadow text-orange-600 items-center hover:bg-gray-100 cursor-pointer"
          ><img src="/upload.svg" alt="Custom Icon" className="w-5 h-5 text-gray-600" />

            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.598 19.115a4.5 4.5 0 01-1.691 1.067l-3.193 1.064 1.064-3.193a4.5 4.5 0 011.067-1.691L16.862 3.487z"
              />
            </svg>*/}
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              onChange={handleAvatarChange}
            /> 
          </label>
        </div>

        <button
          className="absolute top-0 right-0 bg-white text-orange-500 p-2  hover:bg-gray-100 item-center" 
          onClick={() => setIsEditing(true)}
        >+ Edit Profile
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.598 19.115a4.5 4.5 0 01-1.691 1.067l-3.193 1.064 1.064-3.193a4.5 4.5 0 011.067-1.691L16.862 3.487z"
            />
          </svg> */}
        </button>

        <h1 className="text-3xl font-bold mt-4 text-gray-800">{name}</h1>
        <p className="text-gray-500 text-sm">@{username}</p>
        <p className="text-gray-700 mt-2 text-center max-w-md">{bio}</p>

        {/* Ratings, Followers, Following, and Verification */}
        <div className="mt-4 flex items-center space-x-6">
          {user.avgRating && (
            <span className="text-yellow-500 flex items-center">
              ⭐ {user.avgRating.toFixed(1)}
            </span>
          )}
          
          
          {user.isVerified && (
            <span className="text-blue-500 font-semibold">✔ Verified</span>
          )}
          
        </div>
        <span className="text-gray-600">Address: {user.address}</span>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
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
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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
