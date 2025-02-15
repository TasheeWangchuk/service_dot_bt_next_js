import React, { useState } from 'react';
import { FiEdit, FiPlus, FiX, FiTrash2 } from 'react-icons/fi';
import { PlusCircle, X, Check, Loader2 } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [fullSizeImage, setFullSizeImage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFormData((prev) => ({ ...prev, image: fileReader.result as string }));
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const newItem = {
      id: portfolioItems.length + 1,
      ...formData,
    };
    setPortfolioItems((prev) => [...prev, newItem]);
    setFormData({ title: '', description: '', image: '' });
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const closeModal = () => {
    setIsEditing(false);
    setFormData({ title: '', description: '', image: '' });
  };

  const toggleFullSizeImage = (image: string | null) => {
    setFullSizeImage((prev) => (prev === image ? null : image));
  };

  return (
    <div className=" bg-gray-100 h-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b pb-2 mb-4">
        <h1 className="text-2xl font-bold text-gray-800 ml-7">Portfolio</h1>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center text-orange-500 hover:text-orange-600 space-x-1 mr-8">
          <PlusCircle className="w-4 h-4 mr-2 text-orange-500" />
          <span className="text-orange-600 mr-8">Add</span>
        </button>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg p-4 overflow-hidden relative "
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-md mb-2 cursor-pointer"
              onClick={() => toggleFullSizeImage(item.image)}
            />
            <div className="mt-2">
              <h2 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h2>
              <p className="text-sm text-gray-700 truncate">{item.description}</p>
            </div>
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              onClick={() => handleDelete(item.id)}
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Portfolio Item</h2>
              <button className="text-gray-500" onClick={closeModal}>
                <FiX className="text-2xl" />
              </button>
            </div>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mb-4"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            )}
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Size Image Viewer */}
      {fullSizeImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center cursor-pointer"
          onClick={() => toggleFullSizeImage(null)}
        >
          <div className="relative">
            <img
              src={fullSizeImage}
              alt="Full Size"
              className="mt-10 max-w-full max-h-screen rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;


