import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/ProductSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {SkeletonCard} from "../common/Loading"

function LatestProducts() {
  const [loading, setLoading] = useState(true);

  const productsData = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Derive latest products
  const data = useMemo(() => productsData.slice(-5), [productsData]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Update loading state once products are fetched
  useEffect(() => {
    if (productsData.length > 0) {
      setLoading(false);
    }
  }, [productsData]);

  return (
    <div>
      <h2 className="text-center uppercase font-bold text-lg lg:text-xl text-black py-12">
        Latest Products
      </h2>
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-6 cursor-pointer">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
          : data.map((product, index) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className={`relative p-4 ${index === 1 ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-1"}`}
                aria-label={`View details for ${product.ProductTitle}`}>
                <div className={`w-full h-52 ${index === 1 ? "lg:h-96" : "lg:h-72"} overflow-hidden rounded-lg`}>
                  <img
                    src={product.imgurl}
                    alt={product.ProductTitle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-black font-semibold">{product.ProductTitle}</h3>
                  <p className="text-gray-700">Rs.{product.price}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default LatestProducts;
