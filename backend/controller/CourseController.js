const courseService = require("../services/CourseServices");
 
exports.addCourse = async (req, res) => {
    console.log("add course")
    try {
        const product = await courseService.addCourse(req.body);
        res.json({ data: product, status: "New course added successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  }

exports.createUser = async (req, res) => {
try {
    // if(!(nameVal.test(req.body.name) || (req.body.name==null)))
    // {
    // throw new Error("Enter a valid Name");
    // }
    // if(!(emailVal.test(req.body.email) || (req.body.email)==null))
    // {
    // throw new Error("Only northeastern and gmail Ids are accepted");
    // }
    // if(!(passVal.test(req.body.password) || (req.body.password)==null))
    // {
    // throw new Error("Password must have atleast one capital letter, a number and a special character and should have a minimum of 8 characters");
    // }
    // const hashVal = await new Promise((resolve, reject) =>{ 
    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     if(err)
    //     reject(err)
    // resolve(hash);
    // });
    // });
    // req.body.password = hashVal;
    const userDet = await service.createUser(req.body);
    res.json({ data: userDet, status: "New course " + req.body.name + " added successfully" });
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

exports.deleteAllCourses = async(req, res) => {
    try{
        await courseService.deleteAllCourses();
        res.json({status:"Deleted all the data"})
    }
    catch{
        res.status(500).json({error:err.message});
    }
}

exports.getAllCourses = async (req, res) => {
    try {
      const courses = await courseService.getAllCourses();
      res.json({ data: courses, status: "Get All API" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
