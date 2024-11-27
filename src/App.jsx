import { useState } from "react";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Loading from "./common/Loading";
import ErrorPage from "./common/ErrorPage";



const Navbar = lazy(() => import("./common/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Card = lazy(() => import("./common/Card"));

const LastestProducts = lazy(() => import("./components/LatestProducts"));
const Banner = lazy(() => import("./components/Banner"));
const Footer = lazy(() => import("./common/Footer"));
const ShopNow = lazy(()=>import("./client/Shopnow"))
const ProductDisplay = lazy(()=>import("./client/ProductDisplay"))
const Cart = lazy(()=>import("./components/Cart"))
const ViewCart = lazy(()=>import("./client/ViewCart"))

const Login = lazy(() => import("./client/Login"));
const Signup = lazy(()=>import("./client/Signup"))


function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary FallbackComponent={({ error }) => <ErrorPage statusCode={error.statusCode || "500"} message={error.message || "An unexpected error occurred."} />}>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <Card/>
                    <LastestProducts />
                    <Banner />
                  </>
                }
              />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/shopnow" element={<ShopNow/>}/>
              <Route path="/product/:id" element={<ProductDisplay/>}/>
              <Route path="/cart" element={<Cart />} />
              <Route path="/viewcart" element={<ViewCart/>} />

            </Routes>
            <Footer />
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
