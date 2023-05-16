import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import LoaderCard from '../components/LoaderCard';
import PizzaCard from '../components/PizzaCard';
import Pagination from '../components/Pagination/Pagination';
import { fetchPizzaItems } from '../redux/slices/pizzaSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import NoPizzasMessage from '../components/NoPizzasMessage';

function App() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.pizzaSlice);
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const changeActiveCategory = (category: number) => {
    setActiveCategory(category);
  };

  const changeCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchPizzaItems({ currentPage, limit, category: activeCategory }));
  }, [currentPage, limit, activeCategory]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={changeActiveCategory}
          />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {loading ? (
            new Array(8).fill(null).map((elem, i) => <LoaderCard key={i} />)
          ) : error ? (
            <NoPizzasMessage
              title="Произошла ошибка..."
              desc="Повторите попытку чуть позднее"
            />
          ) : items.length === 0 ? (
            <NoPizzasMessage
              title="Пиццы в данной категории отсутствуют"
              desc="Выберите другую категорию"
            />
          ) : (
            items.map((item) => <PizzaCard key={item.id} {...item} />)
          )}
        </div>
      </div>
      {/* Для общего количества страниц(numberOfPages) нужно получать его с заголовка x-total-count */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={changeCurrentPage}
        numberOfPages={3}
      />
    </div>
  );
}

export default App;
