import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, removeCart } from "../redux/ProductSlice";
import {setShowMobileMenu,setShowContactInfo} from "../redux/MenuSlice"
import { selectBagMRP, selectTotal, shipping } from "../redux/ProductSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../common/ApiService";

function Cart({ isOpen, toggleSidebar }) {
  const cartItem = useSelector((state) => state.products.cart);
  console.log(cartItem)
  const bagMRP = useSelector(selectBagMRP);
  const shippingCost = useSelector(shipping);
  const total = useSelector(selectTotal);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleCheckout = async () => {
    try {
      const response = await AxiosService.post("/checkout", { cart: cartItem });
      navigate("/confirmation");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Checkout failed. Please try again.";
      toast.error(errorMessage);
    }
    toggleSidebar()
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      return dispatch(removeCart(item._id))
    }
    dispatch(updateCart({ productId: item._id, quantity: newQuantity }));
    toggleSidebar()
  };

  const handleTrash = (item) => {
    dispatch(removeCart(item._id)); 
  };

  
  return (
    <div
    className={`fixed top-0 right-0 h-full lg:w-96 bg-white shadow-lg transform transition-transform duration-300 ${
      isOpen ? "translate-x-0" : "translate-x-full"
    } z-50`}
  >
    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
      <h5 className="text-lg font-semibold">Your Cart</h5>
      <button className="text-base text-gray-500 hover:text-gray-700" onClick={toggleSidebar}>
        <i className="bx bxs-x-circle text-4xl"></i>
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-4">
      {cartItem && cartItem.length > 0 ? (
        <>
          {cartItem.map((e) => (
            <div key={e._id} className="flex justify-between items-center p-3 border-b border-gray-200">
              <div className="flex items-center">
                <img
                  src={e.product.imgurl?.[0]}
                  alt={e.product.ProductTitle}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-3">
                  <h6 className="font-medium">
                    {e.quantity} x {e.product.ProductTitle}
                  </h6>
                  <p className="text-sm text-gray-600">₹{e.product.price?.toFixed(2) || "0.00"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  aria-label="Increase quantity"
                  className="text-green-500 p-6 w-12 h-12 text-lg rounded-full hover:text-green-700"
                  onClick={() => handleQuantityChange(e.product, e.quantity + 1)}
                >
                  <i className="bx bx-plus"></i>
                </button>
                <button
                  aria-label="Decrease quantity"
                  className="text-red-500 p-6 w-12 h-12 text-lg rounded-full hover:text-red-700"
                  onClick={() => handleQuantityChange(e.product, e.quantity - 1)}
                >
                  <i className="bx bx-minus"></i>
                </button>
                <button
                  aria-label="Remove item"
                  className="text-gray-500 p-6 w-12 h-12 text-lg rounded-full hover:text-gray-700"
                  onClick={() => handleTrash(e.product)}
                >
                  <i className="bx bxs-trash"></i>
                </button>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-200 px-4 py-3">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="text-right font-medium">Bag-MRP:</td>
                  <td className="text-right">₹{bagMRP.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-right font-medium">Shipping:</td>
                  <td className="text-right">₹{shippingCost}</td>
                </tr>
                <tr>
                  <td className="text-right font-medium">Total:</td>
                  <td className="text-right">₹{total.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center px-4 py-3 bg-gray-100">
            <button
              className="px-6 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => navigate("/viewcart")}
            >
              View Cart
            </button>
            <button
              className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">Your cart is empty.</p>
          <button
            className="mt-4 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={() => navigate("/shopnow")}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  </div>
  
  );
}

export default Cart;
