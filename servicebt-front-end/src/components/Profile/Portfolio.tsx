// import React, { useState, useCallback } from 'react';
// import { Loader2, PlusCircle, Trash2, X, Edit2, Upload } from 'lucide-react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { toast } from "react-toastify";

// interface PortfolioItem {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
//   category?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface PortfolioProps {
//   initialItems?: PortfolioItem[];
//   onItemCreate?: (item: Omit<PortfolioItem, 'id'>) => Promise<void>;
//   onItemDelete?: (id: number) => Promise<void>;
//   onItemUpdate?: (id: number, item: Partial<PortfolioItem>) => Promise<void>;
// }

// const Portfolio: React.FC<PortfolioProps> = ({ 
//   initialItems = [], 
//   onItemCreate, 
//   onItemDelete,
//   onItemUpdate 
// }) => {
//   const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialItems);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
//   const [fullSizeImage, setFullSizeImage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: '',
//     category: ''
//   });

//   const handleInputChange = useCallback((
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   }, []);

//   const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       try {
//         setIsLoading(true);
//         // Simulate backend upload - replace with actual upload logic
//         const file = e.target.files[0];
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setFormData(prev => ({ ...prev, image: reader.result as string }));
//           setIsLoading(false);
//         };
//         reader.readAsDataURL(file);
//       } catch (error) {
//         toast({
//           title: "Error uploading image",
//           description: "Please try again",
//           variant: "destructive"
//         });
//         setIsLoading(false);
//       }
//     }
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       setIsLoading(true);
//       if (selectedItem) {
//         // Update existing item
//         if (onItemUpdate) {
//           await onItemUpdate(selectedItem.id, formData);
//         }
//         setPortfolioItems(prev => 
//           prev.map(item => 
//             item.id === selectedItem.id 
//               ? { ...item, ...formData, updatedAt: new Date().toISOString() }
//               : item
//           )
//         );
//       } else {
//         // Create new item
//         const newItem = {
//           ...formData,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString()
//         };
//         if (onItemCreate) {
//           await onItemCreate(newItem);
//         }
//         setPortfolioItems(prev => [...prev, { ...newItem, id: prev.length + 1 }]);
//       }
//       toast({
//         title: selectedItem ? "Item updated" : "Item created",
//         description: "Your portfolio has been updated successfully"
//       });
//       handleCloseModal();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to save portfolio item",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       setIsLoading(true);
//       if (onItemDelete) {
//         await onItemDelete(id);
//       }
//       setPortfolioItems(prev => prev.filter(item => item.id !== id));
//       toast({
//         title: "Item deleted",
//         description: "Portfolio item has been removed"
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete item",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCloseModal = useCallback(() => {
//     setIsModalOpen(false);
//     setSelectedItem(null);
//     setFormData({ title: '', description: '', image: '', category: '' });
//   }, []);

//   const handleEdit = useCallback((item: PortfolioItem) => {
//     setSelectedItem(item);
//     setFormData({
//       title: item.title,
//       description: item.description,
//       image: item.image,
//       category: item.category || ''
//     });
//     setIsModalOpen(true);
//   }, []);

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
//             <p className="text-gray-500 mt-1">Manage your portfolio items</p>
//           </div>
//           <Button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-orange-500 hover:bg-orange-600"
//           >
//             <PlusCircle className="w-4 h-4 mr-2" />
//             Add New Item
//           </Button>
//         </div>

//         {/* Portfolio Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {portfolioItems.map((item) => (
//             <Card key={item.id} className="group relative overflow-hidden">
//               <div className="aspect-video overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
//                   onClick={() => setFullSizeImage(item.image)}
//                 />
//               </div>
//               <CardContent className="p-4">
//                 <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h2>
//                 <p className="text-gray-600 line-clamp-2">{item.description}</p>
//                 {item.category && (
//                   <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm mt-2">
//                     {item.category}
//                   </span>
//                 )}
//               </CardContent>
//               <CardFooter className="p-4 pt-0 flex justify-between items-center">
//                 <span className="text-sm text-gray-500">
//                   Updated {new Date(item.updatedAt).toLocaleDateString()}
//                 </span>
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handleEdit(item)}
//                   >
//                     <Edit2 className="w-4 h-4" />
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => handleDelete(item.id)}
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>

//         {/* Add/Edit Modal */}
//         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//           <DialogContent className="sm:max-w-lg">
//             <DialogHeader>
//               <DialogTitle>
//                 {selectedItem ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
//               </DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4">
//               <Input
//                 name="title"
//                 placeholder="Title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//               />
//               <Textarea
//                 name="description"
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 rows={4}
//               />
//               <Input
//                 name="category"
//                 placeholder="Category (optional)"
//                 value={formData.category}
//                 onChange={handleInputChange}
//               />
//               <div className="relative">
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                   id="image-upload"
//                 />
//                 <label
//                   htmlFor="image-upload"
//                   className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-orange-500 transition-colors"
//                 >
//                   {formData.image ? (
//                     <img
//                       src={formData.image}
//                       alt="Preview"
//                       className="max-h-48 rounded-lg"
//                     />
//                   ) : (
//                     <div className="text-center">
//                       <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                       <span className="mt-2 block text-sm text-gray-600">
//                         Click to upload image
//                       </span>
//                     </div>
//                   )}
//                 </label>
//               </div>
//               <div className="flex justify-end gap-3">
//                 <Button variant="outline" onClick={handleCloseModal}>
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleSubmit}
//                   disabled={isLoading}
//                   className="bg-orange-500 hover:bg-orange-600"
//                 >
//                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                   {selectedItem ? 'Update' : 'Create'}
//                 </Button>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>

//         {/* Full-Size Image Viewer */}
//         {fullSizeImage && (
//           <Dialog open={!!fullSizeImage} onOpenChange={() => setFullSizeImage(null)}>
//             <DialogContent className="max-w-4xl">
//               <img
//                 src={fullSizeImage}
//                 alt="Full Size"
//                 className="w-full h-auto rounded-lg"
//               />
//             </DialogContent>
//           </Dialog>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Portfolio;
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


