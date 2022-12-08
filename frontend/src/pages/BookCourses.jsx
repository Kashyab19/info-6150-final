import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import {Row, Col} from 'react-bootstrap';
import "../styles/BookCourses.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

var isSelected = 'false';
var prodCheck = 'false';
var prog;
var tempVal;
const terms = ['Spring 2023', 'Fall 2024'];
const programEnrolled = [{ code:"MIS", "name":'Information Systems'} ,{ code: "SES", "name": 'Software Engineering Systems'}, { code: "MEM", "name":'Engineering Management'}];

const programDet = []
const selectedCourses = []
const bodyFormData = new FormData();
// const programs = {
//     "MIS": [
//         {
//             'Program': 'MIS',
//             'CourseID': 'INFO 5100',
//             'CourseName': 'Application Engineering and Design',
//             'Description': 'Design of Application and development using JAVA',
//             'Professor': 'Khaled Bugrara',
//             'MeetingTime': 'Wed 3pm - 6pm',
//             'Location': 'ISEC 102',
//             'Credits': '4',
//             'Contact': 'bugrara.k@northeastern.edu',
//             'Seats': '100'
//         },
//         {
//             'Program': 'MIS',
//             'CourseID': 'INFO 6100',
//             'CourseName': 'Web Design and Development',
//             'Description': 'Learn web development from HTML, CSS to MERN and MEAN stack',
//             'Professor': 'Vishal Chawla',
//             'MeetingTime': 'Thurs 6pm - 9:30pm',
//             'Location': 'Behrakis 203',
//             'Credits': '4',
//             'Contact': 'chawla.v@northeastern.edu',
//             'Seats': '100'
//         },
//         {
//             'Program': 'MIS',
//             'CourseID': 'INFO 6150',
//             'CourseName': 'Smartphone based application development',
//             'Description': 'Learn iOS application development',
//             'Professor': 'Rabah Ahmed',
//             'MeetingTime': 'Wed 3pm - 6pm',
//             'Location': 'ISEC 105',
//             'Credits': '4',
//             'Contact': 'ahmed.r@northeastern.edu',
//             'Seats': '100'
//         }
//     ],
//     "MEM": [
//         {
//             'Program': 'MEM',
//             'CourseID': 'INFO 5101',
//             'CourseName': 'Engineering Project Management',
//             'Description': 'Design of Application and development using JAVA',
//             'Professor': 'Khaled Bugrara',
//             'MeetingTime': 'Wed 3pm - 6pm',
//             'Location': 'ISEC 102',
//             'Credits': '4',
//             'Contact': 'bugrara.k@northeastern.edu',
//             'Seats': '100'
//         },
//         {
//             'Program': 'MEM',
//             'CourseID': 'INFO 6101',
//             'CourseName': 'Economic Decision Making',
//             'Description': 'Learn web development from HTML, CSS to MERN and MEAN stack',
//             'Professor': 'Vishal Chawla',
//             'MeetingTime': 'Thurs 6pm - 9:30pm',
//             'Location': 'Behrakis 203',
//             'Credits': '4',
//             'Contact': 'chawla.v@northeastern.edu',
//             'Seats': '100'
//         },
//         {
//             'Program': 'MEM',
//             'CourseID': 'INFO 6151',
//             'CourseName': 'Engineering Probability and Statistics',
//             'Description': 'Learn iOS application development',
//             'Professor': 'Rabah Ahmed',
//             'MeetingTime': 'Wed 3pm - 6pm',
//             'Location': 'ISEC 105',
//             'Credits': '4',
//             'Contact': 'ahmed.r@northeastern.edu',
//             'Seats': '100'
//         }
//     ],
//     "SES": [
//         {
//             'Program': 'SES',
//             'CourseID': 'INFO 5102',
//             'CourseName': 'Concepts of Object-Oriented Design',
//             'Description': 'Design of Application and development using JAVA',
//             'Professor': 'Khaled Bugrara',
//             'MeetingTime': 'Wed 3pm - 6pm',
//             'Location': 'ISEC 102',
//             'Credits': '4',
//             'Contact': 'bugrara.k@northeastern.edu',
//             'Seats': '100'
//         },
//         {
//             'Program': 'SES',
//             'CourseID': 'INFO 6102',
//             'CourseName': 'Program Structure and Algorithms',
//             'Description': 'Learn web development from HTML, CSS to MERN and MEAN stack',
//             'Professor': 'Vishal Chawla',
//             'MeetingTime': 'Thurs 6pm - 9:30pm',
//             'Location': 'Behrakis 203',
//             'Credits': '4',
//             'Contact': 'chawla.v@northeastern.edu',
//             'Seats': '100'
//         },
//         {
//             'Program': 'SES',
//             'CourseID': 'INFO 6152',
//             'CourseName': 'User Experience Design and Testing',
//             'Description': 'Learn iOS application development',
//             'Professor': 'Rabah Ahmed',
//             'MeetingTime': 'Wed 3pm - 6pm',
//             'Location': 'ISEC 105',
//             'Credits': '4',
//             'Contact': 'ahmed.r@northeastern.edu',
//             'Seats': '100'
//         }
//     ]
// }

const BookCourses = () =>{
    
    const [courses, setCourses] = useState([])
    const [showResults, setShowResults] = useState([]);
    const [checked, setChecked] = useState({});
    // const showDetails = (e) => {
    //     setShowResults(true);
    //     console.log(e)
    // }
    const handleCheckBoxChange = (e) => {
        let newState = {...checked};
        console.log(newState)

        if(newState[e]){
            newState[e] = !newState[e]
        } else {
            newState[e] = true
        }
        setChecked(newState);
        // console.log(checked)
        // setNewProduct(
        //     {
        //         ...newProduct,
        //         details: {
        //             ...newProduct.details,
        //             [e.target.name] : e.target.value
        //         },
                
        //         [e.target.name] : e.target.value, //For root-level elements
        //     }
        // );
        setNewProduct(
            {
                // ...newProduct,
                // [e.target.name] : e.target.value, //For root-level elements
                
            }
        );
    }
    const [term, setTerm] = useState();
    const [selected, setSelected] = useState();
    let type = null;
    let options = null;
    // const changeSelectOptionHandler = (event) => {
    //     setSelected(event.target.value);
    //   };
    const [flags, setFlags] = useState({
        showModal : false
    })
    //const [selectedCourses, setSelectedCourses] = useState({});
    const [newProduct, setNewProduct] = useState( {
        program: "",
        courseID : "",
        courseName: "",
        term: "",
        description: "",
        professor: "",
        meetingTime: "",
        location: "",
        credits: "",
        contact: ""
    });
    
    const handleSubmit =(e) => {
        //let checkedCourses = Object.keys(checked).filter((key) => checked[key])
        
        e.preventDefault();
        setChecked({});
        
        console.log(checked)

        const temp = Object.keys(checked);

        for(let i=0;i<temp.length;i++)
        {
            for(let j=0;j<programDet.length;j++)
                if(temp[i] === programDet[j].props.CourseID)
                {
                    selectedCourses.push(<option Program = {programDet[j].props.Program} CourseID = {programDet[j].props.CourseID} 
                        CourseName = {programDet[j].props.CourseName} Professor = {programDet[j].props.Professor} 
                        MeetingTime = {programDet[j].props.MeetingTime} Location = {programDet[j].props.Location} 
                        Contact = {programDet[j].props.Contact} key = {programDet[j].props.Program}>{i}</option>)
                    
                    axios.post("http://localhost:3001/api/course/selected-courses", selectedCourses[i].props)
                }
        }

        selectedCourses.forEach((item) => {
            bodyFormData.append('selectedCourses[]', item);
        });

        var productAdded = newProduct;
        alert("Your courses have been saved")
        
        setNewProduct({
            program: "",
            courseID : "",
            courseName: "",
            term: "",
            description: "",
            professor: "",
            meetingTime: "",
            location: "",
            credits: "",
            contact: "",
        })

        console.log(newProduct)
        console.log(selectedCourses)
    }
    const handleModal = (e) => {
        e.preventDefault();
        
    }
    const handleChange = (e) => {
        e.preventDefault();
        tempVal = e.target.value;
        setSelected(e.value);
        //setShowResults(e.target.value);
        setNewProduct(
            {
                ...newProduct,
                [e.target.name] : e.target.value, //For root-level elements
            }
        );
        console.log(tempVal)
    }

    useEffect(() => {
        axios.get("http://localhost:3001/api/course/get-all-courses").then(res => {
            setCourses(res.data.data)
            console.log(res.data)
            return res.data
    })}, []
    )
    //{console.log(courses)}

    for (let i=0;i<courses.length;i++)
    {
        console.log(programDet.length)
        console.log(courses.length)
        if(programDet.length < courses.length)
            {   programDet.push(<option Program = {courses[i].program} CourseID = {courses[i].courseID} 
                              CourseName = {courses[i].courseName} Description = {courses[i].description} 
                              Professor = {courses[i].professor} MeetingTime = {courses[i].meetingTime} 
                              Location = {courses[i].location} Credits = {courses[i].credits} Contact = {courses[i].contact}
                              Seats = {courses[i].seats} key = {courses[i].program}>{i}</option>)
            }
        else
            break;
    }

    {console.log(programDet)}

    const handleProgramChange = (e) => {
        e.preventDefault();
        console.log(e.target)
        if(e.target.value === 'MIS'){
            prog = 'Information Systems';
        }
        else if (e.target.value === "SES") {
            prog = 'Software Engineering Systems';
        }
        else if (e.target.value === "MEM") {
            prog = 'Engineering Management';
        }
        setSelected(e.target.value);
        setNewProduct(
            {
                ...newProduct,
                // details: {
                //     ...newProduct.details,
                //     [e.target.name] : prog
                // },

                [e.target.name] : e.target.value, //For root-level elements
                
            },
            console.log(prog)
        );
        
    }

    return(
        <div className='' >
        <div className="add-product-container ">
            <Form onSubmit={handleSubmit} autoComplete="off" validate = "true" encType='multipart/form-data' >
                <div>
                    <ul className='form-head'>
                        <li><h4 > Course List </h4></li>
                        <li>
                        <Link className='viewSelected' to= '/view-course' >
                            {console.log(selectedCourses)}
                            View my Courses 
                        </Link>
                        </li>
                    </ul>
                </div>
                {/* <Form.Group className="mb-3" controlId="formBasicEmail" required>
                    <Form.Control type="text" placeholder="Product Name*" name="productName" value={newProduct.productName} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="Price*" name="productPrice" value={newProduct.productPrice} onChange={handleChange}/>
                </Form.Group>
                <h4> Address </h4>
                <Row>
                    <Col>
                        <Form.Control placeholder="Address 1*" name="address1" value={newProduct.location.address1} onChange={handleChange}/>
                    </Col>
                    <Col>
                        <Form.Control placeholder="Address 2" name="address2" value={newProduct.location.address2} onChange={handleChange}/>
                    </Col>
                </Row>
                <br/> */}
                {/* <GetAllCourses/> */}

                <Row>
                    {/* <Col>
                        <Form.Control placeholder="City*" name="city" value={newProduct.location.city} onChange={handleChange}/>
                    </Col> */}
                    <Col>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Select name="term" value={newProduct.term}  onChange={handleChange}>
                                <option>Select a Term*</option>
                                {
                                    terms?.map(
                                        term => {
                                            return(
                                                <option key={term}>
                                                    {term}
                                                </option>
                                            )
                                        }
                                    )
                                }
                            </Form.Select>
                     </Form.Group>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Form.Group as={Col} controlId="formGridState">
                                <Form.Select defaultValue="None" name="program" value={newProduct.program} onChange={handleProgramChange}>
                                    <option>Program Enrolled In*</option>
                                    {
                                        programEnrolled?.map(
                                            program => {
                                                return(
                                                    <option key={program.code} value ={program.code}>
                                                        {program.name}
                                                    </option>
                                                )
                                            }
                                        )
                                    }
                                </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Form.Group>
                             {
                              selected && programDet.map((program) => {
                                console.log(program.key)
                              if (selected === program.key ) {
                                return (
                                <div className="form-check">
                                    <label className='form-comp'>
                                        {console.log(checked[program.props.CourseID])}
                                    <div className='course-check-box'>
                                        <input
                                        type="checkbox"
                                        checked={checked[program.props.CourseID]}
                                        onChange={() => handleCheckBoxChange(program.props.CourseID)}
                                        />
                                    </div>
                                        <div className='course-summary'>
                                            <details>    
                                            <summary><b>{program.props.CourseName}</b></summary>
                                            <ul><b>{'CourseID:'}</b> {program.props.CourseID}</ul>
                                            <ul><b>{'Description:'}</b> {program.props.Description}</ul>
                                            <ul><b>{'Professor:'}</b> {program.props.Professor}</ul>
                                            <ul><b>{'MeetingTime:'}</b> {program.props.MeetingTime}</ul>
                                            <ul><b>{'Location:'}</b> {program.props.Location}</ul>
                                            <ul><b>{'Credits:'}</b> {program.props.Credits}</ul>
                                            <ul><b>{'Contact:'}</b> {program.props.Contact}</ul>
                                            <ul><b>{'Seats Remaining:'}</b> {program.props.Seats}</ul>
                                            </details> 
                                        </div>
                                    </label>
                                </div>
                                )
                              }
                            }
                                )
                             }
                        </Form.Group>
                    </Col>
                </Row>
                <br/>
                <div>
                {/* <h4> Product Description </h4>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Group as={Col} controlId="formGridState">
                            <Form.Select defaultValue="None" name="productCondition" value={newProduct.details.productCondition} onChange={handleChange}>
                                <option>Condition of the Product*</option>
                                {
                                    conditionOfTheProducts.map(
                                        condition => {
                                            return(
                                                <option key={condition} >{condition}</option>
                                            )
                                        }
                                    )
                                }
                            </Form.Select>
                     </Form.Group>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="Material" name="productMaterial" value={newProduct.details.productMaterial} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="Colour" name="colour" value={newProduct.details.colour} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setNewProduct(
                            {
                            ...newProduct,
                            firstPhoto: base64
                            }
                        )}                    />
                </Form.Group> */}
                </div>

                <div className='d-flex justify-content-center'>
                    <Button className='submitButton' variant="danger" type="submit"> Submit </Button>
                </div>   
        </Form>

        <Modal open={flags.showModal}>
            <Modal.Dialog>
            <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
                </Modal.Dialog>
        </Modal>
       
    </div>
    </div>
    )
}

export default BookCourses;