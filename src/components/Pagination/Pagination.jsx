import styles from './style.module.scss';

function Pagination({ currentPage, setCurrentPage, numberOfPages }) {
  return (
    <div className={styles.pagination}>
      <ul>
        <li
          onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          {'<'}
        </li>
        {new Array(numberOfPages).fill(null).map((page, i) => (
          <li
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? styles.active : ''}
            key={i}
          >
            {i + 1}
          </li>
        ))}
        <li
          onClick={() =>
            setCurrentPage((prev) => (prev < numberOfPages ? prev + 1 : prev))
          }
        >
          {'>'}
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
