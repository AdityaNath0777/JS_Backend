import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// direct encryption is not possible
// so we will use some hooks from mongoose

// 1st way
// const userSchema = new mongoose.Schema(

// 2nd way
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      //  indexing makes easier searching
      index: true, // caution

      // indexing should be choosed carefully,
      // might affect performance greatly
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary type service's url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video"
      },
    ],
    password: {
      // challenge: encryption and comparing while login
      type: String,
      required: [true, "Password is required"]
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);


// middleware -> pre hook
// middleware should have the access of next
userSchema.pre("save", async function(next) {
  // encrypt pwd
  // only when password has been modified
  if(!this.isModified("password")) return next() 

  this.password = bcrypt.hash(this.password, 10)
  
  // next() // pass the flag to the next middleware
})





/***** NOTE: CAUTION ***** */

// not recommended as ()=>{} don't has this reference
// userSchema.pre("save", () => {})

/*************************** */






/* *** custom hook/method *** */

// to compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  // cryptography takes time
  return await bcrypt.compare(password, this.password)
}


// to generate access token
userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullName: this.fullName
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
  
  )
}

// to generate refresh token
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id: this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
  
  )
}



export const User = mongoose.model("User", userSchema);
