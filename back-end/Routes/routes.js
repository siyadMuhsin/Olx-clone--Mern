import express from 'express'
import {signUp,login} from '../controller/Auth.js'
import { addProduct ,list_Products} from '../controller/ProductController.js'
import multer from 'multer'

const router=express.Router()
const storage=multer.memoryStorage()
const upload=multer({storage})
router.post('/signup',signUp)
router.post('/login',login)
router.post('/addproduct',upload.single('image'),addProduct)
router.get('/list_Products',list_Products)













export default router