import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import LoaderCard from '../components/LoaderCard';
import PizzaCard from '../components/PizzaCard';
import Pagination from '../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzaItems } from '../redux/slices/pizzaSlice';

function App() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.pizzaSlice);
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  useEffect(() => {
    dispatch(fetchPizzaItems({ currentPage, limit }));
  }, [currentPage, limit]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {loading ? (
            new Array(8).fill(null).map((elem, i) => <LoaderCard key={i} />)
          ) : error ? (
            <div className="error__message">
              <h2>Что-то пошло не так...</h2>
              <p>При запросе произошла ошибка ({error})</p>
            </div>
          ) : (
            items
              .filter(
                (item) =>
                  activeCategory === 0 || item.category === activeCategory
              )
              .map((item) => <PizzaCard key={item.id} {...item} />)
          )}
        </div>
      </div>
      {/* Для общего количества страниц(numberOfPages) нужно получать его с заголовка x-total-count */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        numberOfPages={3}
      />
    </div>
  );
}

export default App;
