import React, { useEffect, useState ,createContext} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Content from "../../components/Content/Content";
import {Routes,Route} from 'react-router-dom'
import API from "../../../axiosConfic";
import { Turtle } from "lucide-react";
import Product from "../Product/Product";
import AddProduct from "../../components/Navbar/AddProduct";

export const ProductContext = createContext();
const Home = () => {
 
  const [products, setProducts] = useState([]);
  const [isAddProduct,setAddProduct]=useState("gwsgs")
  const [modalOpen,setModalOpen]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/list_Products");
        if (response.data.success) {
          setProducts(response.data.products);
        }
        console.log("running");
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [isAddProduct]);

  const closeModal=()=>{
    setModalOpen(false)
  }
  return (
    <>
   <ProductContext.Provider value={{isAddProduct,setAddProduct}}>
      <Navbar setModalOpen={setModalOpen}/>
      {modalOpen&&<AddProduct closeModal={closeModal}/>}
      <div className="w-full min-h-screen bg-gray-50">
        {/* Navigation Categories */}
        <nav className="w-full bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center space-x-6 overflow-x-auto py-3 no-scrollbar">
              <button className="text-gray-800 font-medium whitespace-nowrap flex items-center">
                ALL CATEGORIES
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <a
                href="#"
                className="text-gray-600 whitespace-nowrap hover:text-gray-800"
              >
                Cars
              </a>
              <a
                href="#"
                className="text-gray-600 whitespace-nowrap hover:text-gray-800"
              >
                Motorcycles
              </a>
              <a
                href="#"
                className="text-gray-600 whitespace-nowrap hover:text-gray-800"
              >
                Mobile Phones
              </a>
              <a
                href="#"
                className="text-gray-600 whitespace-nowrap hover:text-gray-800"
              >
                For Sale: Houses & Apartments
              </a>
              <a
                href="#"
                className="text-gray-600 whitespace-nowrap hover:text-gray-800"
              >
                Scooters
              </a>
              <a
                href="#"
                className="text-gray-600 whitespace-nowrap hover:text-gray-800"
              >
                Commercial & Other Vehicles
              </a>
              <a
                href="#"
                className="text-gray-600 whitespace-nowrap hover:text-gray-800"
              >
                For Rent: Houses & Apartments
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <Content products={products} />
      </div>
      </ProductContext.Provider>
    </>
  );
};

export default Home;
