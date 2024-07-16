// <filename>.model.js
// it just to let others know this file consists of model
// it is still a plain JS file

// First import mongoose

import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema(
//   {
//     username: String,
//     email: String,
//     isActive: Boolean
//   }
// )

// More Advanced Method (industry Std.)
const userSchema = new mongoose.Schema(
  // first obj -> defines the schema
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,

      // if not true -> msg -> Pwd is reqd
      // requred: [true, 'Password is required'],
    },
  },

  // second obj -> timestamps -> s is necessary
  { timestamps: true }
  // automatically adds -> createdAt & updatesAt props
);

// first arg -> Model name in the DB
// 2nd Arg -> schema it is based on
export const User = mongoose.model('User', userSchema);

// NOTE: when stored in MongoDB -> User -> users (plural form and lowercase)
