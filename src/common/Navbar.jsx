import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowMobileMenu, setShowContactInfo } from "../redux/MenuSlice";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart";

const Navbar = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  let navigate = useNavigate();

  const showMobileMenu = useSelector((state) => state.show.showMobileMenu);
  const showContactInfo = useSelector((state) => state.show.showContactInfo);
  const dispatch = useDispatch();

  return (
    <div className="relative">
      <div className="container mx-auto px-6 flex justify-between items-center py-4 h-32">
        {/* Nav items */}
        <div className="flex items-center h-full">
          <a href="/" className="text-2xl font-bold text-black tracking-tighter h-full flex items-center">
            outlet
          </a>
          <nav className="hidden lg:flex items-end text-xs uppercase tracking-wider ml-4">
            <a href="/products" className="ml-8">
              Catalog
            </a>
            <a href="/about" className="ml-8">
              About
            </a>
            <a href="/blog" className="ml-8">
              Blog
            </a>
            <button onClick={() => dispatch(setShowContactInfo())} className="ml-8 uppercase">
              Contact
            </button>
          </nav>
        </div>
        {/* cart items */}
        <div className="flex items-center justify-center text-xs uppercase tracking-wider">
        <a href="/login" className="ml-8">
              Login
            </a>
            <div onClick={toggleSidebar}>
              <svg className="w-6 h-6 ml-8  cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {/* Sidebar (Cart Component) */}
          {isSidebarOpen && <Cart isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}</div>
        </div>

        {showContactInfo && (
          <div className="z-50 bg-black bg-opacity-50 fixed inset-0 w-screen min-h-screen lg:flex lg:justify-center lg:items-center p-12">
            <div className="w-full max-w-sm bg-white text-xs uppercase shadow-2xl">
              <div className="pt-6 pr-6 flex justify-end">
                <button onClick={() => dispatch(setShowContactInfo())}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <div className="px-12 pb-12 pt-2">
                <ContactInfo />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <button onClick={() => dispatch(setShowMobileMenu())} className="flex lg:hidden uppercase text-xs items-center -mt-6 mb-6">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
          </svg>
          Menu
        </button>
      </div>

      {showMobileMenu && (
        <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-gray-100 z-40 uppercase space-y-4 text-xl tracking-widest text-center text-black">
          <a href="/products">Catalog</a>
          <a href="/about">About</a>
          <a href="/blog">Blog</a>
          <a href="/login"> Login </a>
          <button onClick={() => dispatch(setShowContactInfo())} className="uppercase tracking-widest text-black">
            Contact
          </button>
          <button onClick={() => dispatch(setShowMobileMenu())} className="absolute top-0 right-0 pr-8 pt-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

const ContactInfo = () => (
  <>
    <ContactItem href="tel:01632 960192" icon="phone">
      01632 960192
    </ContactItem>
    <ContactItem href="mailto:hitir48807@netjook.com" icon="email">
      hitir48807@netjook.com
    </ContactItem>
    <ContactItem icon="clock">MON-SAT, 9-5 | SUN, 10-4</ContactItem>
    <ContactItem href="https://www.google.com/maps/place/2321 Wildwood Street, OH, 44503" icon="location" target="_blank">
      2321 Wildwood Street, OH, 44503
    </ContactItem>
  </>
);

const ContactItem = ({ href, icon, target, children }) => (
  <a href={href} target={target} className="flex items-center my-2">
    <Icon type={icon} />
    {children}
  </a>
);

const Icon = ({ type }) => {
  const icons = {
    phone: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    email: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    clock: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    location: (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  };
  return icons[type] || null;
};

export default Navbar;
