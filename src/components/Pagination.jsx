import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
        id='pagination-btn'
      >
        Previous
      </button>
      
      <span className="px-4 py-2 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
        id='pagination-btn'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
