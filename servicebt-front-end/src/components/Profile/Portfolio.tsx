// "use client";
// import React, { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Plus, Pencil, Trash2, X, Loader2, ImagePlus } from "lucide-react";
// import { toast } from "react-toastify";
// import apiClient from "@/app/api/apiClient";

// interface PortfolioItem {
//   id: number;
//   project_title: string;
//   project_description: string;
//   project_picture: string;
// }

// const Portfolio = () => {
//   const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);
//   const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
//   const [formData, setFormData] = useState({
//     project_title: "",
//     project_description: "",
//     project_picture: "",
//   });

//   useEffect(() => {
//     fetchPortfolios();
//   }, []);

//   const fetchPortfolios = async () => {
//     try {
//       const response = await apiClient.get("/api/v1/portfolios/");
//       setPortfolios(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch portfolios");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prev) => ({
//           ...prev,
//           project_picture: reader.result as string,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

  // const handleSubmit = async () => {
  //   setIsSubmitting(true);
  //   try {
  //     let response:any;
  //     if (selectedItem) {
  //       // Updating existing portfolio
  //       response = await apiClient.put(
  //         `/api/v1/portfolios/${selectedItem.id}/`,
  //         { ...formData, id: selectedItem.id } // Pass id explicitly
  //       );
  //       toast.success("Portfolio updated successfully");
  //       setPortfolios((prev) =>
  //         prev.map((item) => (item.id === selectedItem.id ? response.data : item))
  //       );
  //     } else {
  //       // Creating new portfolio
  //       response = await apiClient.post("/api/v1/portfolios/", formData);
  //       toast.success("Portfolio created successfully");
  //       setPortfolios((prev) => [...prev, response.data]);
  //     }
  //     handleCloseDialog();
  //   } catch (error) {
  //     console.log("erroe", error?.response?.data)
  //     toast.error(
  //       selectedItem ? "Failed to update portfolio" : "Failed to create portfolio"
  //     );
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this portfolio item?")) {
//       return;
//     }

//     try {
//       await apiClient.delete(`/api/v1/portfolios/${id}/`);
//       toast.success("Portfolio deleted successfully");
//       setPortfolios((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       toast.error("Failed to delete portfolio");
//     }
//   };

//   const handleEdit = (item: PortfolioItem) => {
//     setSelectedItem(item);
//     setFormData({
//       project_title: item.project_title,
//       project_description: item.project_description,
//       project_picture: item.project_picture,
//     });
//     setShowDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setShowDialog(false);
//     setSelectedItem(null);
//     setFormData({ project_title: "", project_description: "", project_picture: "" });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
//         <Button onClick={() => setShowDialog(true)}>
//           <Plus className="w-4 h-4 mr-2" /> Add Portfolio
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {portfolios.map((item) => (
//           <Card key={item.id}>
//             <img
//               src={item.project_picture}
//               alt={item.project_title}
//               className="w-full h-48 object-cover"
//             />
//             <CardContent>
//               <h2 className="text-xl font-semibold">{item.project_title}</h2>
//               <p className="text-gray-600">{item.project_description}</p>
//               <div className="flex space-x-2 mt-4">
//                 <Button size="sm" onClick={() => handleEdit(item)}>
//                   <Pencil className="w-4 h-4" /> Edit
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="destructive"
//                   onClick={() => handleDelete(item.id)}
//                 >
//                   <Trash2 className="w-4 h-4" /> Delete
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Dialog Modal for Adding/Editing Portfolio */}
//       <Dialog open={showDialog} onOpenChange={setShowDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{selectedItem ? "Edit Portfolio" : "Add Portfolio"}</DialogTitle>
//           </DialogHeader>

//           <Input
//             name="project_title"
//             value={formData.project_title}
//             onChange={handleInputChange}
//             placeholder="Project Title"
//           />
//           <Textarea
//             name="project_description"
//             value={formData.project_description}
//             onChange={handleInputChange}
//             placeholder="Project Description"
//           />
//           <div className="flex items-center space-x-2">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="hidden"
//               id="file-upload"
//             />
//             <label htmlFor="file-upload" className="cursor-pointer">
//               <ImagePlus className="w-6 h-6 text-gray-600" />
//             </label>
//             {formData.project_picture && (
//               <img src={formData.project_picture} alt="Preview" className="w-16 h-16" />
//             )}
//           </div>

//           <div className="flex justify-end space-x-2">
//             <Button variant="outline" onClick={handleCloseDialog}>
//               <X className="w-4 h-4" /> Cancel
//             </Button>
//             <Button onClick={handleSubmit} disabled={isSubmitting}>
//               {isSubmitting ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Plus className="w-4 h-4" />
//               )}
//               {selectedItem ? "Update" : "Save"}
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
// export default Portfolio;
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Trash2, X, Loader2, ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "@/app/api/apiClient";

interface PortfolioItem {
  id: number;
  project_title: string;
  project_description: string;
  project_picture: string;
}

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    project_title: "",
    project_description: "",
    project_picture: "",
  });

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await apiClient.get("/api/v1/portfolios/");
      setPortfolios(response.data);
    } catch (error) {
      toast.error("Failed to fetch portfolios");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//         const file = e.target.files[0];
//         if (!file.type.startsWith("image/")) {
//             alert("Please upload a valid image file.");
//             return;
//         }
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setFormData((prev) => ({
//                 ...prev,
//                 project_picture: reader.result as string,
//             }));
//         };
//         reader.readAsDataURL(file);
//     }
// };
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
          alert("Please upload a valid image file.");
          return;
      }
      setFormData((prev: any) => ({
          ...prev,
          project_picture: file,
      }));
  }
};


  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this portfolio item?")) {
      return;
    }

    try {
      await apiClient.delete(`/api/v1/portfolios/${id}/`);
      toast.success("Portfolio deleted successfully");
      setPortfolios((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error("Failed to delete portfolio");
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setFormData({ project_title: "", project_description: "", project_picture: "" });
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const formDataToSend = new FormData();
    formDataToSend.append("project_title", formData.project_title);
    formDataToSend.append("project_description", formData.project_description);
    if (formData.project_picture) {
        formDataToSend.append("project_picture", formData.project_picture);
    }

    try {
        await apiClient.post("/api/v1/portfolios/", formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success("Portfolio created successfully");
        fetchPortfolios();
        handleCloseDialog();
    } catch (error) {
        toast.error("Failed to create portfolio");
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Portfolio
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((item) => (
          <Card key={item.id}>
            <img
              src={item.project_picture}
              alt={item.project_title}
              className="w-full h-48 object-cover"
            />
            <CardContent>
              <h2 className="text-xl font-semibold">{item.project_title}</h2>
              <p className="text-gray-600">{item.project_description}</p>
              <div className="flex space-x-2 mt-4">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog Modal for Adding Portfolio */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Portfolio</DialogTitle>
          </DialogHeader>

          <Input
            name="project_title"
            value={formData.project_title}
            onChange={handleInputChange}
            placeholder="Project Title"
          />
          <Textarea
            name="project_description"
            value={formData.project_description}
            onChange={handleInputChange}
            placeholder="Project Description"
          />
          <div className="flex items-center space-x-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <ImagePlus className="w-6 h-6 text-gray-600" />
            </label>
            {formData.project_picture && (
              <img src={formData.project_picture} alt="Preview" className="w-16 h-16" />
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCloseDialog}>
              <X className="w-4 h-4" /> Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portfolio;
