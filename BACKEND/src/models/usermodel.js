/*import { Schema, model } from "mongoose";

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

*/
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

// Hash password before saving
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        // Hash password with cost of 12
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// create user model
const User = model("User", userSchema);
export default User;