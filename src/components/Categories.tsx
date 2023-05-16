import React from 'react';

type CategoriesProps = {
  activeCategory: number;
  setActiveCategory: (category: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, i) => (
          <li
            className={activeCategory === i ? 'active' : ''}
            onClick={() => setActiveCategory(i)}
            key={i}
          >
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
