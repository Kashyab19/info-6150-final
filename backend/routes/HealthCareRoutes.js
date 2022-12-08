const cors = require('cors');
var mongoose = require('mongoose');

const Sample = new mongoose.Schema({
    policyNum: { type: String, default: '' }
  });

module.exports = function (app) {
    app.use(cors());

    app.get('/getPolicyDetails', function (req, res) {
        console.log('Request Reached');
        Sample.find(function (err, samples) {
            if (err)
                res.send(err);
            console.log('samples', samples);
            //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.json(samples);
        });
    });


    app.get('/getAll', function (req, res) {
        Sample.find(function (err, samples) {
            if (err)
                res.send(err);
            console.log('samples', samples);
            res.json(samples);
        });
      });
      
      app.post('/getPolicyDetails', function (req, res) {
        var policy = req.body.policyNum;
        Sample.find({ policy: policy }, (error, data) => {
          if (data) {
            console.log("This is found policies " + data);
      
            for (var i = 0; i < data.length; i++) {
              if (data[i].policyNum === policy) {
                console.log("Match Found");
              return res.send({ response: 'SUCCESS' });
              }
             else if(i==data.length-1){
               return res.send({ response: 'FAILURE' });
              }
            }
          }
          else{
           return res.send({ response: 'FAILURE' });
          }
        });
      });
      
      app.post('/createPolicy', function (req, res) {
        var rec = new Sample(req.body);
        rec.save(function (err, n) {
          if (err) {
            // displayMessage = 'Saving Failed' + " " + err;
            console.log('Saving Failed' + " " + err);
            res.json({ response: 'Saving Failed' + " " + err });
      
          }
          else {
            //displayMessage = 'Record saved ' + n;
            console.log('Recored Saved');
            res.json({ response: 'Recored Saved Successfully' });
      
          }
        });
      
      });

}
module.exports = mongoose.model("Sample", Sample)