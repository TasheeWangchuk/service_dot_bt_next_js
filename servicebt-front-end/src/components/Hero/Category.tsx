"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import apiClient from "@/app/api/apiClient";
import { useAuth } from "@/app/context/AuthContext";

interface JobCategory {
  id: number;
  category_name: string;
  category_picture?: string;
}

const Categories: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (isLoggedIn) {
      fetchCategories();
    }
  }, [isLoggedIn]);

  const fetchCategories = async () => {
    try {
      const response = await apiClient.get(`/api/v1/job-categories/`);
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch job categories");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCategories = categories.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (!isLoggedIn) return null;

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="">
        <h1 className="text-4xl text-center font-extrabold text-orange-500 mb-8 mt-4">
          Job Categories
        </h1>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No categories available</p>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCategories.map((category, index) => (
                <Card key={category.id || index} className="transform transition-all duration-300 hover:scale-105 bg-white/60 backdrop-blur-lg border border-white/20">
                  <CardContent className="p-0">
                    <div className="relative group">
                      <img
                        src={category.category_picture || "/marketing.jpg"}
                        alt={category.category_name}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {category.category_name || "Untitled Category"}
                      </h2>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-white/60 backdrop-blur-sm hover:bg-white/80"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-lg font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-white/60 backdrop-blur-sm hover:bg-white/80"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;