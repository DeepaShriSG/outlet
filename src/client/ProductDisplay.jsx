import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addtoCart } from "../redux/ProductSlice";
import {toast} from "react-toastify"
import ErrorPage from "../common/ErrorPage";
import Loading from "../common/Loading";
import {SkeletonCard} from "../common/Loading"

const ProductDisplay = () => {
  const { id } = useParams();

  // Redux state
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const dispatch = useDispatch();

  // Local state for quantity
  const [quantity, setQuantity] = useState(1);

  // Fetch products if not already fetched
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, []);

  // Loading state
  if (status === "loading") {
    return <SkeletonCard />;
  }

  // Error state
  if (status === "failed") {
    return <ErrorPage message={error} />;
  }

  // Find product by ID
  const product = products.find((product) => product._id === id);

  // Product not found
  if (!product) {
    return <ErrorPage message="Product not found" />;
  }

  // Add to Cart Handler
  const addToCartHandler = (product) => {
    const payload = {
      product: product.product,
      quantity,
    };
    if (quantity > 0) {
      dispatch(addtoCart(payload));
      toast.success(`${quantity} ${product.product.ProductTitle} added to cart!`);
    } else {
      toast.error("Please select a valid quantity!");
    }
  };

  return (
    <div className="container mx-auto p-4">
    <div className="flex flex-col lg:flex-row gap-4 bg-white shadow-md rounded-lg p-4">
      {/* Product Image */}
      <div className="lg:w-2/3">
        <img
          src={product.imgurl[0]}
          alt={product.ProductTitle}
          className="rounded-lg object-center w-48 h-48"
        />
      </div>
  
      {/* Product Details */}
      <div className="lg:w-2/3">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {product.ProductTitle}
        </h1>
  
        {/* Ratings */}
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 text-lg">&#9733;</span>
          <span className="text-gray-700 ml-2">4 (Placeholder Rating)</span>
        </div>
  
        {/* Price */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Rs. {product.price}
        </h2>
  
        {/* Description */}
        <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
  
        {/* Additional Info */}
        <ul className="list-disc list-inside text-gray-600 mb-4 text-sm">
          <li>
            <strong>Brand:</strong> {product.brand}
          </li>
          <li>
            <strong>Product Code:</strong> {product.ProductCode}
          </li>
          <li>
            <strong>Availability:</strong>{" "}
            {product.Availability ? (
              <span className="text-green-500">In Stock</span>
            ) : (
              <span className="text-red-500">Out of Stock</span>
            )}
          </li>
        </ul>
  
        {/* Quantity Selector and Add to Cart */}
        <div className="flex items-center gap-2">
          <label htmlFor="quantity" className="font-semibold text-sm">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, e.target.value))}
            min="1"
            className="w-16 p-1 border rounded-md text-sm"
          />
          <button
            onClick={() => addToCartHandler({product,quantity})}
            className="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ProductDisplay;
