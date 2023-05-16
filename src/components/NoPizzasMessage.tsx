import React from 'react';

interface NoPizzasMessageProps {
  title: string;
  desc: string;
}

const NoPizzasMessage: React.FC<NoPizzasMessageProps> = ({ title, desc }) => {
  return (
    <div className="no-pizzas-message">
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
};

export default NoPizzasMessage;
