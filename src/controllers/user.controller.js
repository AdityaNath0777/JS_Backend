import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// as we're going to generate ascess & refresh token again many time
// lets wrap it in a function
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    // store the refresh token in DB
    await user.save({ validateBeforeSave: false }); // as we've already validated the user & pwd
    // so just save the refresh Token in DB

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh tokens"
    );
  }
};

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
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  // const coverImageLocalPath = req.files?.coverImage[0]?.path; // returns undefined if coverImage has not been sent

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
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
  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "User registered successfully !!!")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  // username/email
  // pwd
  // > click on login
  // check username/email in our DB
  // match pwd of the user
  // > if user exists && pwd matched:
  //   generate AccessToken
  //   generate refreshToken
  //   > store these tokens in cookies and send it to user

  const { username, email, password } = req.body;

  // if both username and email are absent
  if (!(username || email)) {
    throw new ApiError(400, "username or email required");
  }

  // // simple method
  // User.findOne({email})
  // User.findOne({username})

  // Adv Method
  const user = await User.findOne({
    // to find a document form the DB
    // $or -> MongoDB operator
    $or: [{ username }, { email }],

    // find from either username or email
  });

  if (!user) {
    throw new ApiError(404, "User does not exists");
  }

  // User -> to access in DB
  // user -> to access user data stored in our server
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(403, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // here we've to decide whether we need to contact DB again
  // or store necessary values in anothe variable
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // options for COOKIES
  const options = {
    // now cookie is only modifiable by the SERVER
    htmlOnly: true,
    secure: true,

    // frontend can only read it (write operation not available to them)
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
          // in case user wanst to save access and refresh tkn
          // e.g. developing mobile app where cookie cannot be saved
        },
        "User logged In successfully !!"
      )
    );

  //  NOTE :: we can also access cookie from req
});

const logoutUser = asyncHandler(async (req, res) => {
  // clear cookies
  // rmv refresh token form the DB

  // User.findById(_id) // but id where???

  // here comes -> middleware to the rescue

  // now using verifyJWT (and next() inside it)
  // we now have user data along with req
  await User.findByIdAndUpdate(
    // 1st arg -> give id of the document to the be found
    req.user_id,

    // 2ns arg -> what to update
    {
      $set: {
        refreshToken: undefined,
      },
    },

    // options
    {
      // now response will have updated value
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully !!"));
});

export { registerUser, loginUser, logoutUser };
