// import React, { useState } from 'react';
// import { FiEdit, FiPlus, FiX, FiTrash2 } from 'react-icons/fi';
// import { PlusCircle, X, Check, Loader2 } from 'lucide-react';

// interface PortfolioItem {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
// }

// const Portfolio: React.FC = () => {
//   const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: '',
//   });
//   const [fullSizeImage, setFullSizeImage] = useState<string | null>(null);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const fileReader = new FileReader();
//       fileReader.onload = () => {
//         setFormData((prev) => ({ ...prev, image: fileReader.result as string }));
//       };
//       fileReader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const handleSubmit = () => {
//     const newItem = {
//       id: portfolioItems.length + 1,
//       ...formData,
//     };
//     setPortfolioItems((prev) => [...prev, newItem]);
//     setFormData({ title: '', description: '', image: '' });
//     setIsEditing(false);
//   };

//   const handleDelete = (id: number) => {
//     if (window.confirm('Are you sure you want to delete this item?')) {
//       setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
//     }
//   };

//   const closeModal = () => {
//     setIsEditing(false);
//     setFormData({ title: '', description: '', image: '' });
//   };

//   const toggleFullSizeImage = (image: string | null) => {
//     setFullSizeImage((prev) => (prev === image ? null : image));
//   };

//   return (
//     <div className=" bg-gray-100 h-auto">
//       {/* Header Section */}
//       <div className="flex items-center justify-between border-b pb-2 mb-4">
//         <h1 className="text-2xl font-bold text-gray-800 ml-7">Portfolio</h1>
//         <button
//           onClick={() => setIsEditing(true)}
//           className="flex items-center text-orange-500 hover:text-orange-600 space-x-1 mr-8">
//           <PlusCircle className="w-4 h-4 mr-2 text-orange-500" />
//           <span className="text-orange-600 mr-8">Add</span>
//         </button>
//       </div>

//       {/* Portfolio Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
//         {portfolioItems.map((item) => (
//           <div
//             key={item.id}
//             className="rounded-lg p-4 overflow-hidden relative "
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-48 object-cover rounded-md mb-2 cursor-pointer"
//               onClick={() => toggleFullSizeImage(item.image)}
//             />
//             <div className="mt-2">
//               <h2 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h2>
//               <p className="text-sm text-gray-700 truncate">{item.description}</p>
//             </div>
//             <button
//               className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
//               onClick={() => handleDelete(item.id)}
//             >
//               <FiTrash2 />
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Add/Edit Modal */}
//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Add Portfolio Item</h2>
//               <button className="text-gray-500" onClick={closeModal}>
//                 <FiX className="text-2xl" />
//               </button>
//             </div>

//             <input
//               type="text"
//               name="title"
//               placeholder="Title"
//               value={formData.title}
//               onChange={handleInputChange}
//               className="w-full border rounded-lg p-2 mb-4"
//             />
//             <textarea
//               name="description"
//               placeholder="Description"
//               value={formData.description}
//               onChange={handleInputChange}
//               className="w-full border rounded-lg p-2 mb-4"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="w-full mb-4"
//             />
//             {formData.image && (
//               <img
//                 src={formData.image}
//                 alt="Preview"
//                 className="w-full h-32 object-cover rounded-lg mb-4"
//               />
//             )}
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
//                 onClick={handleSubmit}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Full-Size Image Viewer */}
//       {fullSizeImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center cursor-pointer"
//           onClick={() => toggleFullSizeImage(null)}
//         >
//           <div className="relative">
//             <img
//               src={fullSizeImage}
//               alt="Full Size"
//               className="mt-10 max-w-full max-h-screen rounded-lg shadow-lg"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Portfolio;
"use client";
import React, { useState, useEffect, use } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, X, Loader2, ImagePlus } from 'lucide-react';
import { toast } from 'react-toastify';
import apiClient from '@/app/api/apiClient';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [viewImage, setViewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await apiClient.get('/api/v1/portfolios/');
      setPortfolios(response.data);
    } catch (error) {
      toast.error('Failed to fetch portfolios');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (selectedItem) {
        await apiClient.put(`/api/v1/portfolios/${selectedItem.id}/`, formData);
        toast.success('Portfolio updated successfully');
      } else {
        await apiClient.post('/api/v1/portfolios/', formData);
        toast.success('Portfolio created successfully');
      }
      fetchPortfolios();
      handleCloseDialog();
    } catch (error) {
      toast.error(selectedItem ? 'Failed to update portfolio' : 'Failed to create portfolio');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this portfolio item?')) {
      return;
    }
    
    try {
      await apiClient.delete(`/api/v1/portfolios/${id}/`);
      toast.success('Portfolio deleted successfully');
      setPortfolios(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      toast.error('Failed to delete portfolio');
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setSelectedItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image
    });
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedItem(null);
    setFormData({ title: '', description: '', image: '' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <Button
          onClick={() => setShowDialog(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Portfolio
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setViewImage(item.image)}
              />
              <div className="absolute top-2 right-2 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 line-clamp-2">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? 'Edit Portfolio' : 'Add Portfolio'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div>
              <label className="block">
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <ImagePlus className="w-4 h-4 mr-2" />
                    {formData.image ? 'Change Image' : 'Upload Image'}
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </label>
              {formData.image && (
                <div className="mt-2 relative">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {selectedItem ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Viewer Dialog */}
      {viewImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setViewImage(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white"
            onClick={() => setViewImage(null)}
          >
            <X className="w-6 h-6" />
          </Button>
          <img
            src={viewImage}
            alt="Full size"
            className="max-w-[90%] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Portfolio;

