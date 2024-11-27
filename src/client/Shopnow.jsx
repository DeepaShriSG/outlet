import React, { useState, useEffect,useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {toast} from "react-toastify"
import { fetchProducts, addtoCart, updateCart } from "../redux/ProductSlice";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart";
import { SkeletonCard } from "../common/Loading";

const Shopnow = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [sortOrder, setSortOrder] = useState("Newest First");

  const [loading, setLoading] = useState(true);

  const productsData = useSelector((state) => state.products.items);
  const cartItem = useSelector((state) => state.products.cart);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchProducts())
      .unwrap()
      .then(() => setLoading(false))
      .catch((err) => {
        setError("Failed to fetch products!");
        setLoading(false);
      });
  }, [dispatch]);
  

  const sortedProducts = useMemo(() => {
    return productsData.slice().sort((a, b) => {
      if (sortOrder === "Price: Low to High") return a.price - b.price;
      if (sortOrder === "Price: High to Low") return b.price - a.price;
      return 0;
    });
  }, [productsData, sortOrder]);

  // Add to Cart Handler
  const addToCartHandler = ({ product: product, quantity }) => {
    console.log(product);
    if (quantity > 0) {
      dispatch(addtoCart({ product: product, quantity }));
      toast.success(`${quantity} ${product.ProductTitle} added to cart!`);
    } else {
      toast.error("Please select a valid quantity!");
    }
  };

  const updateCartHandler = (productId, quantity) => {
    dispatch(updateCart({ id: productId, quantity }));
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="text-gray-600 mb-4 text-center">
        <a href="/" className="hover:text-gray-800">
          Home
        </a>{" "}
        / <span className="font-semibold ml-2">Shopnow</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-4">
        <aside className="w-full lg:w-1/4 p-4 border-2 border-gray-300 rounded-lg mb-6 lg:mb-0">
          <h2 className="text-lg font-bold mb-4">Category</h2>
          {/* Add Categories */}
        </aside>

        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">{loading ? "Loading..." : `${sortedProducts.length} items`}</p>
            {!loading && sortedProducts.length === 0 && <p>No products found!</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <select className="border rounded-md p-2" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />)
              : sortedProducts.map((product) => {
                  const productQuantity = cartItem.find((item) => item._id === product._id)?.quantity || 1;
                  return <ProductCard key={product._id} product={product} quantity={productQuantity} updateCart={updateCart} addToCartHandler={addToCartHandler} />;
                })}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

const ProductCard = ({ product, quantity, updateCart, addToCartHandler }) => (
  <div className="border bg-slate-100 rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
    <img src={product.imgurl[0]} alt={product.ProductTitle} className="w-full h-48 object-cover" />
    <div className="p-2">
      <h3 className="text-lg font-semibold text-center">{product.ProductTitle}</h3>
      <h6 className="text-gray-600 mt-2 text-center font-bold">₹{product.price}</h6>
    </div>
    <div className="Product-Quantity flex flex-col md:flex-row justify-center items-center p-2 text-center space-y-2 md:space-y-0">
      <label htmlFor={`quantity-${product._id}`} className="mx-2 text-sm font-medium">
        Qty:
      </label>
      <input
        type="number"
        id={`quantity-${product._id}`}
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          updateCart(product._id, isNaN(value) || value < 1 ? 1 : value);
        }}
        min="1"
        className="border border-gray-300 rounded-md w-16 text-center focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        className="btn text-black rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          addToCartHandler({ product, quantity });
        }}>
        <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      </button>
    </div>
  </div>
);

export default Shopnow;
