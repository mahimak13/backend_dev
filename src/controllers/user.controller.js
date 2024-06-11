import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser=asyncHandler(async(req,res)=>{
   const {fullname,email,username,password}=req.body//to get user detail from frontend
   console.log("email: ",email);

   //validation
   if([fullname,email,username,password].some((field)=>field?.trim()==="")){
    throw new ApiError(400,"All fields are required")
   }
    //Check if already registered
   const existedUser=User.findOne({
    $or:[{username},{email}]
   })
   if(existedUser){
    throw new ApiError(409,"user with email or username already exist")
   }
    //check for avatar,coverimage
   const avatarLocalPath=req.files?.avatar[0]?.path
   const coverImageLocalPath=req.files?.coverImage[0]?.path

   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
   }

   //upload them on cloudinary
   const avatar=await uploadOnCloudinary(avatarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400,"Avatar file is required")
   }

   //create user and make entry in database
   const user= await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
   })

   //check for user creation and remove password and refreshtoken
   const createdUser=await User.findById(user._id).select("-password -refreshToken")
    
   if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
   }
    

   //return res
    
   return res.status(200).json(
    new ApiResponse(200,createdUser,"user registered successfully")
   )


})

export {registerUser}

//to register user


//1.get user detail from frontend : here no frontend created so take from postman
//2.validation
//3.check if user already exist:username,email
//4.check for images,avatar
//5.upload them to cloudinary
//6.create user object - create entry in db
//7.remove password and refresh token field
//8.check for user creation
//9.return res