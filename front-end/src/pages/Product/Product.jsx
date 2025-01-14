import React, { useEffect, useState } from "react";
import API from "../../../axiosConfic.js";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, Share2, Heart } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar.jsx";
import logo from "../../assets/olx-logo.svg";
import AddProduct from "../../components/Navbar/AddProduct.jsx";
import { timeHandle } from "../../components/Content/Card.jsx";
const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { product } = location.state || {};

  useEffect(() => {
    if (!product) {
      navigate("/");
    }
  }, [product, navigate]);

  const [isProductPage, setProductPage] = useState(false);

  if (!product) {
    return null;
  }

  return (
    <div>
      <Navbar isProductPage={{ isProductPage }} />
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto  gap-8 mt-5">
        {/* Left side - Image Gallery */}
        <div className=" items-center justify-center w-full md:w-3/5 relative mt-12 ">
          {" "}
          {/* Increased width */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden p-5">
            <img
              src={product.image}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="w-full md:w-2/5">
          {" "}
          {/* Reduced width */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">
                ₹ {product.price.toLocaleString()}
              </h1>
              <h2 className="mt-5 text-xl text-black-600 font-semibold">
                {product.productName}
              </h2>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share2 className="w-6 h-6" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="mb-6 mt-10 ">
            <h3 className="text-xl font-semibold mb-1">Details</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <span>{product.description}</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer">
                <MapPin className="text-red-600"></MapPin>
                <span>{product.address}</span>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Seller Information</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full overflow-hidden">
                <img
                  src={logo}
                  alt="Seller"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{product.createdBy.name}</p>
                <span className="text-red-600">
                  {timeHandle(Date.now() - product.date)}
                </span>
              </div>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
            Chat with seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
