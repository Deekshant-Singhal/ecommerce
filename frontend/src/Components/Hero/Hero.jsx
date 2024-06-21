import React from 'react';
import hand from '../Assests/hand_icon.png';
import arrow from '../Assests/arrow.png';
import hero from '../Assests/hero_image.png';

const Hero = () => {
  return (
    <div className="w-5/6 md:w-4/5 lg:w-3/4 mx-auto py-16 px-4 md:px-8 lg:px-12">
      <div className="hero flex bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-lg py-8 px-6 md:px-12">
        
        <div className="left text-left w-full md:w-2/3">
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-8">New Arrivals!</h2>
          <div className="flex items-center mb-4">
            <p className="text-xl md:text-5xl font-semibold mr-2">New</p>
            <img src={hand} alt="Hand Icon" className="h-8 w-auto md:h-12" />
          </div>
          <p className="text-xl md:text-5xl font-bold mb-2">Collections</p>
          <p className="text-xl md:text-5xl font-bold mb-12">for everyone</p>
          <div className="bg-red-600 rounded-lg py-2 px-4 flex items-center w-auto md:w-60">
            <div className="text-lg md:text-xl font-semibold mr-2">Latest Collections</div>
            <img src={arrow} alt="Arrow Icon" className="h-4 w-4" />
          </div>
        </div>

        <div className="right hidden md:block md:w-1/3 ml-0">
          <img src={hero} alt="Hero Image" className="w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
