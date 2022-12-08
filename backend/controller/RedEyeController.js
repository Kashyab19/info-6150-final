const redeyeService = require("../services/RedEyeServices");

exports.addTrip = async (req, res) => {
    console.log("Adding trip")
    try {
        const product = await redeyeService.addTrip(req.body);
        res.json({ data: product, status: "New trip added successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  }



exports.deleteTrip = async(req, res) => {
    try{ console.log("inside delete controller");
    //console.log(req)
        await redeyeService.deleteTrip(req);
        return res.json({status:"Deleted the trip"})
    }
    catch{
        res.status(500).json({error:err.message});
    }
}

exports.getAllTrips = async (req, res) => {
    try {
      //console.log("reached heeee.")
      const trips = await redeyeService.getAllTrips(req);
      //console.log("reached heeee.2")
      //console.log("Trips"+trips)
      res.json({ data: trips, status: "Get All trips" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };