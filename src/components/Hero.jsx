import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [current, setCurrent] = useState(0);
  let navigate = useNavigate();

  const items = [
    {
      image: "https://images.unsplash.com/photo-1515555230216-82228b88ea98?auto=format&fit=crop&w=900&q=60",
      url: "/product",
    },
    {
      image: "https://images.unsplash.com/photo-1601144537792-c401ba4e30ba?auto=format&fit=crop&w=900&q=60",
      url: "/product",
    },
    {
      image: "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=900&q=60",
      url: "/product",
    },
    {
      image: "https://plus.unsplash.com/premium_photo-1681276170423-2c60b95094b4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "/product",
    },
    {
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=900&q=60",
      url: "/product",
    },
  ];

  const prevSlide = () => setCurrent(current > 0 ? current - 1 : items.length - 1);
  const nextSlide = () => setCurrent(current < items.length - 1 ? current + 1 : 0);

  return (
    <>
      <header className="mb-5 pb-5">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 py-12 md:px-12 md:py-32 flex items-center justify-center">
            <div className="max-w-sm">
              <h1 className="text-5xl md:text-6xl mb-6 font-display text-black leading-tight" style={{ fontFamily: "PlayFair,serif" }}>
                Our new arrivals
              </h1>
              <p>
                Find new everyday essentials to mix and match with all your outfits. Discover new arrivals of statement pieces and treat yourself to something really special from
                our latest assortment of clothing..
              </p>
              <span onClick={() => navigate("/shopnow")} className="flex cursor-pointer items-center mt-8 uppercase text-sm text-black font-semibold">
                Shop now
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 relative h-48 md:h-64 lg:h-auto">
            <a href={items[current].url}>
              <img src={items[current].image} alt="Slideshow" className="absolute inset-0 p-5 w-full h-full object-cover" />
            </a>
            <div className="absolute bottom-0 right-0 grid grid-cols-2">
              <button onClick={prevSlide} className="p-4 md:p-6 bg-white hover:bg-gray-100 hover:opacity-80">
                <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button onClick={nextSlide} className="p-4 md:p-6 bg-white hover:bg-gray-100 hover:opacity-80">
                <svg className="w-6 h-6 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Hero;
