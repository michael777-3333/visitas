import mongoose from "mongoose";

const qrSchema = new mongoose.Schema({
    campaign:{
        type:String,
        required:true,
        trim:true
    },
    url:{
        type:String,
        required:true,
        trim:true
    },
  },{
    timestamps:true
  });
  
export default mongoose.model('QrModel',qrSchema)                       