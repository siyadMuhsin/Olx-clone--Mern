import mongoose from 'mongoose'
const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,

        required:true
    },
    createdBy:{
        type:String
    },
    date:{
        type:String,
        
        
    }
})

const Products= mongoose.model('Products',productSchema)
export default Products