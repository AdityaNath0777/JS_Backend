import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  // res.status(200).json({
  //   message: "shikanji aur code",
  // });

  /* Steps to register a user */
  // get user detials from the frontend
  // validation - not empty & in valid format
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, check avatar uploaded or not
  // create user object - create entry in DB
  // rmv pwd & refresh token field from response
  // check for user creation
  // return res

  const { username, email, fullName, password } = req.body;

  // testing
  // console.log("email: ", email);

  // validation - one by one
  // if(fullName === ""){
  //   throw new ApiError(400, "Full Name is required")
  // }

  // validation
  if (
    [fullName, email, username, password].some((filed) => filed?.trim() === "")
    // study .map() vs .some()
  ) {
    // field is empty
    throw new ApiError(400, "All field are required");
  }


  // console.log("req: ", req)
  // console.log("req.body: ", req.body)
  // console.log("req.files: ", req.files)

  const existedUser = await User.findOne({
    // $or: [{}, {}]
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // req.body -> has sara ka sara data

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  let avatarLocalPath;
  if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
    avatarLocalPath = req.files.avatar[0].path;
  }

  // const coverImageLocalPath = req.files?.coverImage[0]?.path; // returns undefined if coverImage has not been sent

  let coverImageLocalPath;
  if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    // if no coverImage
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
    // excluding fileds given in the string with '-' sign
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registring the user");
  }

  // return res.status(201).json({createdUser})
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully !!!")
  )
});

export { registerUser };
