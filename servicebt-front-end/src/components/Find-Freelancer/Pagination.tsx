import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  hasNextPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, hasNextPage }) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button 
        className="p-2 border rounded disabled:opacity-50"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-lg">{currentPage}</span>
      <button 
        className="p-2 border rounded disabled:opacity-50"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={!hasNextPage}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
