import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ newsPerPage, totalNews, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalNews / newsPerPage);
  const maxVisiblePages = 5; 


  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  
  const showLeftDots = currentPage > Math.floor(maxVisiblePages / 2) + 1;
  const showRightDots = currentPage < totalPages - Math.floor(maxVisiblePages / 2);

  const getDisplayedPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return pageNumbers; 
    }

    const start = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages - 1, currentPage + Math.floor(maxVisiblePages / 2));

    let visiblePages = pageNumbers.slice(start - 1, end);

    if (showLeftDots && showRightDots) {
      visiblePages = ['...', ...visiblePages, '...'];
    } else if (showLeftDots) {
      visiblePages = ['...', ...visiblePages];
    } else if (showRightDots) {
      visiblePages = [...visiblePages, '...'];
    }

    return [1, ...visiblePages, totalPages];
  };

  const displayedPageNumbers = getDisplayedPageNumbers();

  return (
    <nav className={styles.paginationContainer}>
      <ul className={styles.pagination}>
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.arrowButton}
          >
            &laquo; Prev
          </button>
        </li>
        {displayedPageNumbers.map((number, index) =>
          number === '...' ? (
            <li key={index} className={styles.dots}>
              &hellip;
            </li>
          ) : (
            <li key={index} className={number === currentPage ? styles.active : ''}>
              <button onClick={() => paginate(number)}>{number}</button>
            </li>
          )
        )}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.arrowButton}
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
