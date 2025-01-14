import express from "express";
import { v2 as cloudinary } from "cloudinary";
import Products from "../models/Product_Models.js";
import stream from "stream";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const addProduct = async (req, res) => {
  try {
    const { productName, description, price, address,from } = req.body;

    // Validate required fields
    if (!productName || !description || price <= 0 || !from ||!address) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let imageUrl = null;

    // Upload image to Cloudinary if file exists
    if (req.file) {
      console.log("Starting Cloudinary upload...");

      const { buffer } = req.file;

      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            public_id: `products/${Date.now()}`,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              console.log("Cloudinary upload successful:", result.secure_url);
              resolve(result.secure_url);
            }
          }
        );

        // Pipe the buffer to the Cloudinary upload stream
        try {
          const bufferStream = new stream.PassThrough();
          bufferStream.end(buffer);
          bufferStream.pipe(uploadStream);
        } catch (streamError) {
          console.error("Stream error:", streamError);
          reject(streamError);
        }
      });
    }

    // Create the product in the database
    const newProduct = await Products.create({
      productName,
      description,
      price,
      date:Date.now(),
      address,
      image: imageUrl,
      createdBy: from,
    });

    console.log("Product added successfully:", newProduct);

    // Send success response
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const list_Products=async (req,res)=>{
  console.log("running");
  
  const products= await Products.find()
  if(products){
    return res.json({success:true,products:products})
  }

}
export { addProduct ,list_Products};
