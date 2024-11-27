import React, { useState, useCallback,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCart, removeCart } from "../redux/ProductSlice";
import { selectBagMRP, selectTotal, shipping } from "../redux/ProductSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosService from "../common/ApiService";

function ViewCart() {

  const [currentStep, setCurrentStep] = useState(1);
  const cartItem = useSelector((state) => state.products.cart);
  const productsData = useSelector((state) => state.products.items);
  console.log(productsData)
  
  const cartData = productsData.filter((item)=>item.ProductCode === cartItem.ProductCode)
  console.log(cartData);

  const nextStep = async () => {
    if (currentStep === 1) {
      try {
        let res = await AxiosService.post("/user/cart", cartData);
        console.log(res);
        toast.success("Cart details saved successfully!");
      } catch (error) {
        console.error("Error saving cart details:", error);
        toast.error("Failed to save cart details. Please try again.");
        return; 
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-900 rounded shadow text-white">
      {/* Header with Steps */}
      <div className="bg-gray-900 shadow">
        <div className="container mx-auto px-4 py-6">
          {/* Stepper */}
          <div className="flex items-center justify-center space-x-6">
            {["Cart", "Review", "Checkout"].map((label, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;

              return (
                <div key={stepNumber} className="flex items-center space-x-2">
                  {/* Step Circle */}
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      isActive ? "bg-blue-600 text-white" : isCompleted ? "bg-blue-400 text-white" : "bg-gray-700 text-gray-300"
                    }`}>
                    {stepNumber}
                  </div>
                  {/* Step Label */}
                  <span className={`${isActive ? "text-blue-400 font-semibold" : "text-gray-300 font-normal"}`}>{label}</span>
                  {/* Divider (line) */}
                  {stepNumber < 3 && (
                    <div
                      className="w-16 h-1 rounded bg-gray-400"
                      style={{
                        backgroundColor: isCompleted ? "#60a5fa" : "#4b5563",
                      }}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 col-span-6 p-6  bg-white text-gray-900 rounded shadow">
          {currentStep === 1 && <CartStep />}
          {currentStep === 2 && <ReviewStep />}
          {currentStep === 3 && <CheckoutStep />}
        </div>
        <div className="lg:col-span-4 col-span-6  p-6 rounded-lg shadow">
          <OrderSummary />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="container mx-auto px-4 py-4 flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-4 py-2 rounded-lg border ${currentStep === 1 ? "bg-slate-300 text-gray-900 border cursor-not-allowed" : "bg-white text-gray-800 hover:border-gray-400"}`}>
          Previous
        </button>
        <button
          onClick={nextStep}
          className={`px-4 py-2 border rounded-lg ${currentStep === 3 ? "bg-green-800 text-white hover:bg-green-700" : "bg-gray-800 text-white hover:bg-gray-700"}`}>
          {currentStep === 3 ? "Pay Now" : "Next"}
        </button>
      </div>
    </div>
  );
}

// Step 1: Cart Step
function CartStep() {

  const cartItem = useSelector((state) => state.products.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = useCallback(
    (item, newQuantity) => {
      if (newQuantity !== item.quantity) {
        dispatch(updateCart({ id: item._id, quantity: Math.max(newQuantity, 1) }));
      }
    },
    [dispatch]
  );

  const handleTrash = (item) => {
    dispatch(removeCart(item._id));
    toast.info(`${item.product.ProductTitle} removed from the cart.`);
  };

 
  
  return (
    <div className="p-3">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      <div className="space-y-4">
        <div className="flex-1 overflow-y-auto p-4">
          {cartItem && cartItem.length > 0 ? (
            <>
              {cartItem.map((e, index) => {
                return (
                  <div key={e._id} className="flex justify-between items-center p-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <img src={e.product.imgurl?.[0]} alt={e.product.ProductTitle} className="w-16 h-16 object-cover rounded" />
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
                        className="text-green-500 p-3 w-12 h-12 text-lg rounded-full hover:text-green-700"
                        onClick={() => handleQuantityChange(e, e.quantity + 1)}>
                        <i className="bx bx-plus"></i>
                      </button>
                      <button
                        aria-label="Decrease quantity"
                        className="text-red-500 p-3 w-12 h-12 text-lg rounded-full hover:text-red-700"
                        onClick={() => handleQuantityChange(e, e.quantity - 1)}>
                        <i className="bx bx-minus"></i>
                      </button>

                      <button aria-label="Remove item" 
                      className="text-gray-500  p-3 w-12 h-12 text-lg rounded-full  hover:text-gray-700" 
                      onClick={() => handleTrash(e)}>
                        <i className="bx bxs-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">Your cart is empty.</p>
              <button className="mt-4 px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700" onClick={() => navigate("/shopnow")}>
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 2: Review Step
function ReviewStep() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    phonenumber: "",
    email: "",
    address: "",
  });

  const cartItem = useSelector((state) => state.products.cart);
  
  const [loading, setLoading] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

 
  const validateInputs = () => {
    const { name, email, phonenumber, address } = userData;
    if (!name || !email || !phonenumber || !address) {
      toast.error("All fields are required!");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Invalid email address!");
      return false;
    }
    if (!/^\d{10}$/.test(phonenumber)) {
      toast.error("Phone number must be 10 digits!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      let payload ={
        ...userData,
        cart:cartItem.product
      }
      console.log(payload)
      const res = await AxiosService.post("/user/checkout", payload);
      console.log(res)
      if (res.status === 201) {
        toast.success("Proceeding to Payment");
        navigate("/payment");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Shipping Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700"
            value={userData.name}
            onChange={handleInputChange}
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700"
            value={userData.email}
            onChange={handleInputChange}
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phonenumber"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700"
            value={userData.phonenumber}
            onChange={handleInputChange}
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            rows="3"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700"
            value={userData.address}
            onChange={handleInputChange}
            aria-required="true"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

// Step 3: Checkout Step
function CheckoutStep() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
      <p>Review your order before proceeding with the payment.</p>
      <p className="text-sm text-gray-500 mt-2">Secure Checkout - SSL Encrypted</p>
    </div>
  );
}

// Order Summary Component
function OrderSummary() {
  const bagMRP = useSelector(selectBagMRP);
  const Shipping = useSelector(shipping);
  const total = useSelector(selectTotal);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p>BagMRP</p>
          <p>₹{bagMRP.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <p>₹{Shipping}</p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex items-center justify-between font-semibold">
        <p>Total</p>
        <p>₹{total.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ViewCart;
