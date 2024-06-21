import React from 'react';

const Item = (props) => {
  return (
    <div className="item flex flex-col xl:w-60 2xl:h-full xl:h-96 2xl:w-80 h-80 w-40 md:w-60 p-4 bg-white shadow-lg rounded-lg mx-auto my-4">
      <div className="image mb-4 2xl:mb-0 h-5/6">
        <img 
          src={props.image} 
          alt={props.name} 
          className="w-full 2xl:h-4/5 h-48 xl:h-60 object-cover object-center rounded-t-lg" 
        />
        <p className="mt-2 text-lg font-semibold text-gray-700">{props.name}</p>
      </div>
      <div className="prices flex justify-between items-center mt-auto">
        <p className="text-xl font-bold text-gray-800">${props.new_price}</p>
        <p className="text-sm line-through text-gray-500">${props.old_price}</p>
      </div>
    </div>
  );
};

export default Item;
