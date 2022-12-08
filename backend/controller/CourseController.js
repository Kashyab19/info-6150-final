const courseService = require("../services/CourseServices");
 
exports.addCourse = async (req, res) => {
    console.log("add course")
    try {
        const product = await courseService.addCourse(req.body);
        res.json({ product });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  }

exports.editUser = async (req, res) => {
  try {
    // const hashVal = await new Promise((resolve, reject) =>{ 
    //   bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     if(err)
    //     reject(err)
    //   resolve(hash);
    //   });
    // });
    // req.body.password = hashVal;
    const userDet = await courseService.editUser(req.body.courseID, req.body);
    if(userDet == null)
    {
      throw new Error ("User does not exist" );
    }
    // if(!(nameVal.test(req.body.name) || (req.body.name==null)))
    // {
    //   throw new Error("Enter a valid Name");
    // }
    // if(!(passVal.test(req.body.password) || (req.body.password)==null))
    // {
    //   throw new Error("Password must have atleast one capital letter, a number and a special character and should have a minimum of 8 characters");
    // }
    res.json({ status: "User details of " + req.body.email + " updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.selectedCourses = async (req, res) => {
  try {
    const courses = await courseService.selectedCourses(req.body);
    res.json({data: courses, status: "Courses Saved"});
  } catch {
    res.status(500).json({error: err.message})
  }
};

exports.getSelectedCourses = async (req, res) => {
  try {
    const courses = await courseService.getSelectedCourses();
    res.json({data: courses, status: "Get All API"});
  } catch {
    res.status(500).json({error: err.message})
  }
};

exports.deleteAllSavedCourses = async (req, res) => {
  try {
    await courseService.deleteAllSavedCourses();
    res.json({status: "Courses Deleted"})
  } catch {
    res.status(500).json({error: err.message})
  }
};

exports.deleteAcourse = async (req, res) => {
  try {
    const userDet = await courseService.deleteAcourse(req.body.CourseID);
    res.json({ data: userDet, status: "User " + userDet.CourseID + " deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};