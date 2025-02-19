// import React, { useState } from 'react';
// import { PlusCircle, X, Trash2, Award } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Card } from '../ui/card';
// import apiClient from '@/app/lib/apiClient';

// const CertificateManager = () => {
//   const [certificates, setCertificates] = useState<Array<{
//     id: number;
//     title: string;
//     issuer: string;
//     issueDate: string;
//     image: File | null;
//     imagePreview: string | null;
//   }>>([]);

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showImageModal, setShowImageModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [newCertificate, setNewCertificate] = useState<{
//     title: string;
//     issuer: string;
//     issueDate: string;
//     image: File | null;
//     imagePreview: string | null;
//   }>({
//     title: '',
//     issuer: '',
//     issueDate: '',
//     image: null,
//     imagePreview: null
//   });

//   const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
//     const { name, value } = e.target;
//     setNewCertificate(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file) {
//       setNewCertificate(prev => ({
//         ...prev,
//         image: file,
//         imagePreview: URL.createObjectURL(file)
//       }));
//     }
//   };

//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     if (!newCertificate.title || !newCertificate.issuer || !newCertificate.issueDate || !newCertificate.image) {
//       alert('Please fill all fields');
//       return;
//     }

//     setCertificates(prev => [...prev, { ...newCertificate, id: Date.now() }]);
//     setNewCertificate({
//       title: '',
//       issuer: '',
//       issueDate: '',
//       image: null,
//       imagePreview: null
//     });
//     setShowAddModal(false);
//   };

//   const handleDelete = (id: any) => {
//     setCertificates(prev => prev.filter(cert => cert.id !== id));
//   };

//   const handleImageClick = (imageUrl: string | null) => {
//     setSelectedImage(imageUrl);
//     setShowImageModal(true);
//   };

//   return (
//     <div className="w-full ">
//       <div className="flex justify-between items-center mb-6">
//         {/* <h1 className="text-2xl font-bold">Certificates</h1> */}
//         <Button 
//           onClick={() => setShowAddModal(true)}
//           className="inline-flex items-center px-4 py-2 text-orange-500 bg-white rounded-lg hover:text-orange-600"
//         >
//           <PlusCircle className="w-4 h-4 mr-2" />
//           Add
//         </Button>
//       </div>

//       {certificates.length === 0 ? (
//         <Card className="p-12 text-center bg-white border-dashed border-2">
//             <Award className="w-16 h-16 mx-auto mb-4 text-blue-500 opacity-50" />
//             <h3 className="text-xl font-semibold mb-2">No Certificates Added Yet</h3>
//             <p className="text-gray-500 mb-6">Add your Certificates here to showcase your crediability</p>
//             <Button 
//               onClick={() => setShowAddModal(true)}
//               variant="outline"
//               className="mx-auto"
//             >
//               Add Certificate
//             </Button>
//           </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {certificates.map(cert => (
//             <div key={cert.id} className="bg-white rounded-lg shadow p-4">
//               <div 
//                 className="relative w-full h-48 mb-4 cursor-pointer"
//                 onClick={() => handleImageClick(cert.imagePreview)}
//               >
//                 <img
//                   src={cert.imagePreview || ''}
//                   alt={cert.title}
//                   className="w-full h-full object-cover rounded"
//                 />
//               </div>
//               <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
//               <p className="text-gray-600 mb-1">{cert.issuer}</p>
//               <p className="text-gray-500 mb-2">{cert.issueDate}</p>
//               <button
//                 onClick={() => handleDelete(cert.id)}
//                 className="flex items-center gap-2 text-red-500 hover:text-red-600"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Add New Certificate</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={newCertificate.title}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Issuer</label>
//               <input
//                 type="text"
//                 name="issuer"
//                 value={newCertificate.issuer}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Issue Date</label>
//               <input
//                 type="date"
//                 name="issueDate"
//                 value={newCertificate.issueDate}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Certificate Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="flex justify-end gap-2">
//               <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
//                 Cancel
//               </Button>
//               <Button className='bg-orange-500 hover:bg-orange-600' type="submit">Add Certificate</Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
//         <DialogContent className="sm:max-w-[90vw] h-[90vh]">
//           <img
//             src={selectedImage || ''}
//             alt="Certificate full view"
//             className="w-full h-full object-contain"
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default CertificateManager;
"use client";
import React, { useState, useEffect } from 'react';
import { PlusCircle, X, Trash2, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from '../ui/card';
import apiClient from '@/app/api/apiClient';
import { toast } from '@/hooks/use-toast';

interface Certificate {
  id: number;
  certificate_title: string;
  certificate_issuer: string;
  issue_date: string;
  certificate_file: string;
}

interface NewCertificate {
  title: string;
  issuer: string;
  issueDate: string;
  image: File | null;
  imagePreview: string | null;
}

const CertificateManager = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newCertificate, setNewCertificate] = useState<NewCertificate>({
    title: '',
    issuer: '',
    issueDate: '',
    image: null,
    imagePreview: null
  });

  // Fetch certificates on component mount
  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/api/v1/certificates/');
      setCertificates(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch certificates",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCertificate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setNewCertificate(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCertificate.title || !newCertificate.issuer || !newCertificate.issueDate || !newCertificate.image) {
      toast({
        title: "Validation Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('certificate_title', newCertificate.title);
      formData.append('certificate_issuer', newCertificate.issuer);
      formData.append('issue_date', newCertificate.issueDate);
      formData.append('certificate_file', newCertificate.image);

      await apiClient.post('/api/v1/certificates/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Refresh certificates list
      await fetchCertificates();

      // Reset form and close modal
      setNewCertificate({
        title: '',
        issuer: '',
        issueDate: '',
        image: null,
        imagePreview: null
      });
      setShowAddModal(false);

      toast({
        title: "Success",
        description: "Certificate added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add certificate",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/api/v1/certificates/${id}`);
      await fetchCertificates();
      toast({
        title: "Success",
        description: "Certificate deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete certificate",
        variant: "destructive",
      });
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  if (isLoading) {
    return <div className="w-full p-12 text-center">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <Button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 text-orange-500 bg-white rounded-lg hover:text-orange-600"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {certificates.length === 0 ? (
        <Card className="p-12 text-center bg-white border-dashed border-2">
          <Award className="w-16 h-16 mx-auto mb-4 text-blue-500 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No Certificates Added Yet</h3>
          <p className="text-gray-500 mb-6">Add your Certificates here to showcase your credibility</p>
          <Button 
            onClick={() => setShowAddModal(true)}
            variant="outline"
            className="mx-auto"
          >
            Add Certificate
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(cert => (
            <div key={cert.id} className="bg-white rounded-lg shadow p-4">
              <div 
                className="relative w-full h-48 mb-4 cursor-pointer"
                onClick={() => handleImageClick(cert.certificate_file)}
              >
                <img
                  src={cert.certificate_file}
                  alt={cert.certificate_title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{cert.certificate_title}</h3>
              <p className="text-gray-600 mb-1">{cert.certificate_issuer}</p>
              <p className="text-gray-500 mb-2">{cert.issue_date}</p>
              <button
                onClick={() => handleDelete(cert.id)}
                className="flex items-center gap-2 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Certificate</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={newCertificate.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Issuer</label>
              <input
                type="text"
                name="issuer"
                value={newCertificate.issuer}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={newCertificate.issueDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Certificate Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button className='bg-orange-500 hover:bg-orange-600' type="submit">
                Add Certificate
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="sm:max-w-[90vw] h-[90vh]">
          <img
            src={selectedImage || ''}
            alt="Certificate full view"
            className="w-full h-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificateManager;