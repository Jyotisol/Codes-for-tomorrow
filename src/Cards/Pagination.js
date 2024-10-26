// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = () => {
        const pages = [];
        
        if (totalPages <= 5) {
            // If total pages are 5 or less, display all pages
            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }
        } else {
            // Always show the first page
            pages.push(1);

            // Display middle pages around the current page with "..." on either side if necessary
            if (currentPage > 3) pages.push("...");

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push("...");

            // Always show the last page
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <div className="flex justify-center mt-4 space-x-2">
            {pageNumbers.map((page, index) => (
                <button
                    key={index}
                    onClick={() => page !== "..." && onPageChange(page)}
                    className={`px-3 py-1 rounded ${
                        currentPage === page
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    } ${page === "..." ? "cursor-default" : ""}`}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
