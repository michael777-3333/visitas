import QrModel from "../models/qr.model.js";
import Vists from "../models/vistas.model.js";


export const index = async (req, res) => {
  try {
    const { qrId } = req.params;
    const qrFound = await QrModel.findById(qrId);
    const visitFound = await Vists.findOne({ visits: qrId });

    if (visitFound) {
      console.log('ll');
      const incremetCountVist = await Vists.findOneAndUpdate(
        {visits: qrId},
        {$inc: { count: 1 }},
      );

      console.log(incremetCountVist);
    } else {
      const newVisit = new Vists({
        visits: qrId,
      });
      await newVisit.save();
    }

    res.redirect(qrFound.url);
    // console.log(visitFound);
  } catch (error) {
    console.log(error);
  }
};
