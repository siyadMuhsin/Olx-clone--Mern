import mongoose  from "mongoose";
import 'dotenv'
const mongoDB = async () => {
    console.log(process.env.MONGO_URL);
    
  try {
   await mongoose.connect(process.env.MONGO_URL,{
   
  })
    .then(()=>console.log('mongodb connect '))
    
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};

export default mongoDB