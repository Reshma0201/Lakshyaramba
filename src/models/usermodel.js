import { Schema, model } from "mongoose";

const userSchema = new Schema( //calling of constructor function in order to build a schema
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { timestamps: true } // add two fields in the schema that is created at and updated at
);

// Capital U to match export
const User = model("User", userSchema); // Create a Mongoose Model called "User" from the userSchema
// "User" is the name of the collection (Mongoose will use "users")
// userSchema defines the structure of documents in this collection
// The Model (User) can be used to perform CRUD operations:

export default User;
 // Export the User model to use it in other files

