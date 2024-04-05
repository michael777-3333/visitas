import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  visits:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'QrModel', 
    required:true   
  },
  count: {
    type: Number,
    default: 1 // Valor inicial de count
  }
    
  },{
    timestamps:true
  });
  
export default mongoose.model('Vists',visitSchema)