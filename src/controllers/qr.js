import qr from "qr-image";
import QrModel from "../models/qr.model.js";
import vistasModel from "../models/vistas.model.js";
import path from "path";
import fileSystem from "fs";
import qrModel from "../models/qr.model.js";


const currentDir = path.dirname(new URL(import.meta.url).pathname);
export const index = async (req, res) => {
  try {
    res.render("qr.ejs");
  } catch (error) {
    console.log(error);
  }
};

export const allQrs = async (req, res) => {
  try {
    const visitas = await vistasModel.find().populate('visits').exec();
    if (!visitas) return res.status(400).json(['Visits not found'])
    res.json({visitas});
  } catch (error) {
    console.log(error);
  }
};

export const editQr= async (req,res)=>{
  try {
    if (req.body.url==='' || req.body.campaign==='') {
      return res.status(400).json(["Los campos requeridos deben ser proporcionados."]);
    }
    const qr= await qrModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
    if (!qr) {
      return res.status(404).json({ message: "QR no encontrado." });
    }
    res.status(200).json({message:"QR Editado con exito",qr});
  } catch (error) {
    res.status(401).json(error)
  }
}

export const viewsTo0=async(req,res)=>{
  try {
    const vists= await vistasModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
    res.status(200).json(vists)
  } catch (error) {
    console.log(error);
  }
}

export const dowlandLastQr =async(req,res)=>{

  try {
    let filePath = path.join("qr_img.png");
    console.log(filePath);
    
    if (fileSystem.existsSync(filePath)) {
      await res.download(filePath);
    }

    
  } catch (error) {
   console.log(error); 
  }
}

export const createQr = async (req, res) => {
  const { url, campaign } = req.body;
  try {
    const qrFound = await QrModel.findOne({ url });
    if (qrFound) return res.status(400).json(["The url is alredy exist"]);
    const newQr = new QrModel({
      campaign,
      url,
    });
    const qrSaved = await newQr.save();

    if (fileSystem.existsSync("qr_img.png")) {
      fileSystem.unlinkSync("qr_img.png");
    }
    let qr_svg = qr.image(`https://visitas-1ql1.onrender.com/index/${qrSaved._id}`);
    const writeStream = qr_svg.pipe(fileSystem.createWriteStream("qr_img.png"));
    writeStream.on("finish", async () => {
      let filePath = path.join("qr_img.png");
      await res.download(filePath);
    });
  } catch (error) {
    res.status(401).json(error)
    console.log(error);
  }
};
