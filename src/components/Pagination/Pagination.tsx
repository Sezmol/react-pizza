import React from 'react';

import styles from './style.module.scss';

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  numberOfPages: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  numberOfPages,
}) => {
  return (
    <div className={styles.pagination}>
      <ul>
        {new Array(numberOfPages).fill(null).map((page, i) => (
          <li
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? styles.active : ''}
            key={i}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
