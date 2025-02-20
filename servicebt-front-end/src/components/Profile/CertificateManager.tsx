"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, X, Loader2, ImagePlus } from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "@/app/api/apiClient";

interface Certificate {
  id: number;
  certificate_title: string;
  certificate_picture: string;
  certificate_issuer: string;
  issue_date: string;
}

const Portfolio = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [viewImage, setViewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    certificate_title: "",
    certificate_picture: null as File | null,
    certificate_issuer: "",
    issue_date: "",
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await apiClient.get("/api/v1/certificates/");
      setCertificates(response.data);
    } catch (error) {
      toast.error("Failed to fetch certificates");
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, certificate_picture: e.target.files![0] }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = new FormData();
    data.append("certificate_title", formData.certificate_title);
    data.append("certificate_issuer", formData.certificate_issuer);
    data.append("issue_date", formData.issue_date);
    if (formData.certificate_picture) {
      data.append("certificate_picture", formData.certificate_picture);
    }

    try {
      if (selectedCertificate) {
        await apiClient.put(`/api/v1/certificates/${selectedCertificate.id}/`, data);
        toast.success("Certificate updated successfully");
      } else {
        await apiClient.post("/api/v1/certificates/", data);
        toast.success("Certificate added successfully");
      }
      fetchCertificates();
      handleCloseDialog();
    } catch (error) {
      toast.error(selectedCertificate ? "Failed to update certificate" : "Failed to add certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await apiClient.delete(`/api/v1/certificates/${id}/`);
      toast.success("Certificate deleted successfully");
      setCertificates((prev) => prev.filter((cert) => cert.id !== id));
    } catch (error) {
      toast.error("Failed to delete certificate");
    }
  };

  const handleEdit = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setFormData({
      certificate_title: certificate.certificate_title,
      certificate_picture: null,
      certificate_issuer: certificate.certificate_issuer,
      issue_date: certificate.issue_date,
    });
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedCertificate(null);
    setFormData({ certificate_title: "", certificate_picture: null, certificate_issuer: "", issue_date: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Button className="bg-transparent border border-gray-200 text-orange-500" onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id}>
            <img src={cert.certificate_picture} alt={cert.certificate_title} className="w-full h-48 object-cover" />
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">{cert.certificate_title}</h2>
              <p className="text-gray-600">{cert.certificate_issuer}</p>
              <p className="text-gray-500">{cert.issue_date}</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button size="sm" variant="secondary" onClick={() => handleEdit(cert)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(cert.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCertificate ? "Edit Certificate" : "Add Certificate"}</DialogTitle>
          </DialogHeader>
          <Input name="certificate_title" placeholder="Title" value={formData.certificate_title} onChange={handleInputChange} />
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          <Input name="certificate_issuer" placeholder="Issuer" value={formData.certificate_issuer} onChange={handleInputChange} />
          <Input type="date" name="issue_date" value={formData.issue_date} onChange={handleInputChange} />
          <Button onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Submit"}</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Portfolio;
