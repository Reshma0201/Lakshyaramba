import "dotenv/config";
import mongoose from 'mongoose'

const DB_URL = process.env.DB_URl;
const connectDB = async ()=> {
  try{
     await mongoose.connect(DB_URL);
     console.log("MONGO CONNECTED SUCCSSFULLY");
  }catch (err){
console.log("mongodb connection error detected:", err.message);

  }

};
export default connectDB;