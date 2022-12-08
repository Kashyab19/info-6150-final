const redeyeTripSchema = require("../models/redeyeTripSchema");

exports.addTrip = async (creds) => {
    console.log("Added trip");
    return await redeyeTripSchema.create(creds);
};

exports.deleteTrip = async (req,res) => {
    console.log("Deleting a trip");
    //console.log(req.body.email)
    return await redeyeTripSchema.deleteMany({ email: req.body.email });
}

exports.getAllTrips = async (req,res) => {
   // console.log("Inside get trip");
    //console.log(req.body.email);
    // return await redeyeTripSchema.find({ email: req.body.email }, (error, data) => {
    //     if (data != "") {
    //         // console.log("Count!\n" + count);
    //          console.log("Record found!\n" + data);
    //         return data;
    //         // console.log(data[0].destination);
    //     } else { console.log("Error occurred!\n" + error); }
    // });


    return await redeyeTripSchema.find({ email: req.body.email });
}