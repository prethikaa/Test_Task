import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

//PaginationProps interface
interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  entriesPerPage: number;
  setEntriesPerPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
}

//Pagination Component
const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  entriesPerPage,
  setEntriesPerPage,
  totalItems,
}) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / entriesPerPage);

  // Function to generate the page numbers displayed on the pagination
  const generatePageNumbers = () => {
    const pages = [];
    // Maximum number of pages to show
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if the total pages are less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Handle the pagination display when there are more than maxPagesToShow pages
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="m-2 flex flex-wrap items-center justify-center gap-2 ">
      {/* Button to go to the previous page */}
      <button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className={`px-2 py-2 font-medium transition-all bg-gray-300 text-gray-500 cursor-pointer ${
          page <= 1
            ? "cursor-not-allowed"
            : " hover:bg-blue-600 hover:text-white"
        }`}
      >
        <IoIosArrowBack />
      </button>

      <div className="flex flex-wrap items-center justify-center space-x-2">
        {/* Generate the page numbers and display them */}
        {generatePageNumbers().map((pageNum, index) =>
          pageNum === "..." ? (
            <span key={index} className="px-2 py-2 text-gray-500 ">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => setPage(Number(pageNum))}
              className={`px-3 py-1 font-medium transition-all cursor-pointer ${
                page === pageNum
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          )
        )}
      </div>

      {/* Button to go to the next page */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page >= totalPages}
        className={`px-2 py-2 font-medium transition-all bg-gray-300 text-gray-500 cursor-pointer ${
          page >= totalPages
            ? "cursor-not-allowed"
            : " hover:bg-blue-600 hover:text-white"
        }`}
      >
        <IoIosArrowForward />
      </button>
      {/* Dropdown to select number of entries per page */}
      <select
        value={entriesPerPage}
        onChange={(e) => {
          setEntriesPerPage(Number(e.target.value));
          setPage(1);
        }}
        className="p-2 px-3 py-1 shadow-sm bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 cursor-pointer"
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default Pagination;
