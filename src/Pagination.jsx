import React, { useState } from 'react'; 

function Pagination({ itemsPerPage, totalItems, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination"> 
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>Previous</button> 

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          style={{ backgroundColor: currentPage === pageNumber ? '#f1f1f1' : '' }}
        >
          {pageNumber}
        </button>
      ))}
 
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>Next</button> 
    </div>
  );
}

export default Pagination;