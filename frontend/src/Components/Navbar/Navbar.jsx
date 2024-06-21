import React, { useState } from 'react';
import logo from '../Assests/logo.png';
import cart from '../Assests/cart_icon.png';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [menu, setMenu] = useState('shop'); // State to track active menu item

  return (
    <div className="navbar flex  items-center md:flex-row justify-between w-full p-2 md:p-6 lg:p-8 shadow">
      <div className="flex items-center gap-2 mb-3 md:gap-4">
        <img src={logo} alt="Logo" className="w-auto h-10 md:h-20" />
        <p className="text-xl font-semibold md:text-2xl lg:text-3xl">STOREHOUSE</p>
      </div>

      <ul className="flex mt-12 mb-2  -ml-20 text-xs flex-row md:flex-row gap-5 md:text-xl">
        <Link to='/'>
          <li
            className={`text-gray-600 cursor-pointer relative ${menu === 'shop' ? 'font-semibold' : ''}`}
            onClick={() => setMenu('shop')}
          >
            Shop
            {menu === 'shop' && <hr className="absolute -bottom-2 left-0 w-full h-2 bg-red-600 rounded-xl" />}
          </li>
        </Link>

        <Link to='/men'>
          <li
            className={`text-gray-600 cursor-pointer relative ${menu === 'men' ? 'font-semibold' : ''}`}
            onClick={() => setMenu('men')}
          >
            Men
            {menu === 'men' && <hr className="absolute -bottom-2 left-0 w-full h-2 bg-red-600 rounded-xl" />}
          </li>
        </Link>

        <Link to='/women'>
          <li
            className={`text-gray-600 cursor-pointer relative ${menu === 'women' ? 'font-semibold' : ''}`}
            onClick={() => setMenu('women')}
          >
            Women
            {menu === 'women' && <hr className="absolute -bottom-2 left-0 w-full h-2 bg-red-600 rounded-xl" />}
          </li>
        </Link>

        <Link to='/kid'>
          <li
            className={`text-gray-600 cursor-pointer relative ${menu === 'kid' ? 'font-semibold' : ''}`}
            onClick={() => setMenu('kid')}
          >
            Kids
            {menu === 'kid' && <hr className="absolute -bottom-2 left-0 w-full h-2 bg-red-600 rounded-xl" />}
          </li>
        </Link>
      </ul>

      <div className="cart relative flex items-center gap-2 mb-3 mr-2 md:gap-8">
        <Link to='/loginsignup'>
          <button className="bg-blue-500 hover:bg-blue-600 text-white  w-12 rounded-md h-6 text-xs  md:text-base md:h-8 md:w-20">Login</button>
        </Link>

        <Link to='/cart'>
          <img src={cart} alt="Cart" className="h-6 w-auto md:h-10" />
          <div className="absolute -top-1 md:text-sm -right-2 h-4 w-4 md:h-5 md:w-5 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">0</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
