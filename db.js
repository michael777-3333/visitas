const mongoose =require('mongoose')

// const visitSchema = new mongoose.Schema({
//     qrId: String,
//     visitedAt: { type: Date, default: Date.now },
//   });
  
//   const Visit = mongoose.model('Visit', visitSchema);


const connectDB = async()=> {
    try {
        await mongoose.connect('mongodb+srv://porrasmichael882:Michael_777555@cluster0.iludv5c.mongodb.net/Vistas') 
        // await mongoose.connect('mongodb+srv://porrasmichael882:Michael_777555@cluster0.iludv5c.mongodb.net/pelisMike');

        console.log('DB is connected');
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;