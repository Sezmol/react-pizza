import React from 'react';
import { useState } from 'react';
import {
  ICartItem,
  addToCart,
  increaseAmount,
} from '../redux/slices/cartSlice';
import { PizzaItem } from '../redux/slices/pizzaSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const PizzaCard: React.FC<PizzaItem> = ({
  imageUrl,
  price,
  sizes,
  title,
  types,
}) => {
  const dispatch = useAppDispatch();
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [activeType, setActiveType] = useState(types[0]);
  const cartItems = useAppSelector((state) => state.cartSlice.items);
  const amount = cartItems.reduce(
    (acc, item) => (item.title === title ? (acc += item.amount) : acc),
    0
  );

  const addCartItem = () => {
    const itemToCart: ICartItem = {
      // для id можно использовать библиотеку для создания уникального id
      id: title + activeSize + activeType,
      imageUrl,
      title,
      totalPrice: price,
      size: activeSize,
      type: activeType === 0 ? 'тонкое' : 'традиционное',
      amount: 1,
      unitPrice: price,
    };

    const itemExists = cartItems.some(
      (item) =>
        item.title === itemToCart.title &&
        item.size === itemToCart.size &&
        item.type === itemToCart.type
    );

    if (itemExists) {
      dispatch(increaseAmount(itemToCart.id));
    } else {
      dispatch(addToCart(itemToCart));
    }
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              className={activeType === type ? 'active' : ''}
              onClick={() => setActiveType(type)}
              key={type}
            >
              {type === 0 ? 'тонкое' : 'традиционное'}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              className={activeSize === size ? 'active' : ''}
              onClick={() => setActiveSize(size)}
              key={i}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          onClick={() => addCartItem()}
          className="button button--outline button--add"
        >
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {amount > 0 && <i>{amount}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
