import React, { useContext, useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { toast } from "react-toastify";
import API from "../../../axiosConfic";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "@/pages/Home/Home";

const AddProduct = ({ closeModal }) => {
  const { isAddProduct, setAddProduct } = useContext(ProductContext);

  const [user, setUser] = useState(null);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cropperRef = useRef(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    document.body.style.overflow = "hidden"; // Disable background scrolling
    return () => {
      document.body.style.overflow = ""; // Re-enable background scrolling
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      toast.error("Product Name required");
      return;
    }
    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (price <= 0) {
      toast.error("Price must be a positive integer");
      return;
    }
    if (!address.trim()) {
      toast.error("Address must be required");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("from", user.id);

    try {
      const cropper = cropperRef?.current?.cropper;

      if (cropper) {
        const canvas = cropper.getCroppedCanvas();
        if (!canvas) {
          toast.error("Error cropping image. Please try again.");
          return;
        }

        await new Promise((resolve) => {
          canvas.toBlob((blob) => {
            formData.append("image", blob, "cropped-image.png");
            resolve();
          }, "image/png");
        });
      }
      const response = await API.post("/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data) {
        if (response.data.success) {
          toast.success(response.data.message);
          closeModal();
          // navigate('/')
          setAddProduct(!isAddProduct);
        } else {
          toast.error(response.data.message);
          closeModal();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Loading isLoading={isLoading} />
      <div className="z-20 fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div
          className="bg-white p-6 rounded-lg w-1/3 max-h-[90vh] overflow-y-auto"
          style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <h2 className="text-xl font-bold mb-4">Add Product</h2>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block mb-1">Product Name</label>
            <input
              type="text"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1">Description</label>
            <textarea
              style={{ resize: "none", height: "80px" }}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
              rows="4"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block mb-1">Price</label>
            <input
              type="number"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          {/* address  */}
          <div className="mb-4">
            <label className="block mb-1">Address</label>
            <textarea
              style={{ resize: "none", height: "80px" }}
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 w-full"
              rows="4"
            />
          </div>

          {/* Image Upload with Cropper */}
          <div className="mb-4">
            <label className="block mb-1">Product Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border p-2 w-full"
            />
          </div>

          {/* Image Cropper */}
          {image && (
            <div className="mb-4">
              <Cropper
                src={image}
                ref={cropperRef}
                style={{ width: "100%", height: 400 }}
                aspectRatio={2}
                guides={false}
              />
            </div>
          )}

          {/* Modal Buttons */}
          <div className="flex justify-end mt-4">
            <button
              onClick={closeModal}
              className="bg-red-500 text-white p-2 rounded"
            >
              Close
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white p-2 rounded ml-2"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
