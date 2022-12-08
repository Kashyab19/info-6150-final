import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import '../styles/BookCourses.css'

import "../styles/AddProducts.css"

const ViewCourses = () =>{
    const [courses, setCourses] = useState([])
    const [employees, setEmployees] = useState(courses);

    const handleDelete = (e) => {
        // e.preventDefault();
        axios.delete("http://localhost:3001/api/course/delete-selection", { data: { CourseID: e} })
        
        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/course/saved-courses");
                        // await setCourses(response.data)
                        console.log(response)
            } catch(error) {
                console.log(error);
            }
        }
        console.log(e);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/api/course/saved-courses").then(res => {
            setCourses(res.data.data)
            console.log(res.data)
            return res.data
    })}, []
    )
    
    return(
        <div className="add-product-container ">
            <Form autoComplete="off" validate = "true" encType='multipart/form-data' >
                <div className='display-courses'>
                    <h4> Course List </h4>
                    {console.log(courses)}
                    <div>
                        {courses.map((course) => {
                            return (
                                <div>
                                    <div className='course-selected'>
                                            {/* <details>     */}
                                            <div style={{ width: '25em', padding: 0, backgroundColor: "#FFF", WebkitFilter: "drop-shadow(0px 0px 5px #666)", filter: "drop-shadow(0px 0px 5px #666)", display: "inline-block", margin: "25px"}}>
                                                <Card >
                                                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                                                    <Card.Body style={{ flex: 1}}>
                                                        <Card.Title>{course.CourseName}</Card.Title>
                                                            <Card.Text className='selCourses'>
                                                                <li><b>{'CourseID:'}</b> {course.CourseID}</li>
                                                                <li><b>{'Professor:'}</b> {course.Professor}</li>
                                                                <li><b>{'MeetingTime:'}</b> {course.MeetingTime}</li>
                                                                <li><b>{'Location:'}</b> {course.Location}</li>
                                                                <li><b>{'Contact:'}</b> {course.Contact}</li>
                                                            </Card.Text>
                                                        <Button variant="danger" onClick={() => handleDelete(course.CourseID)}>Drop the course</Button>
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                            {/* <summary><b>{course.CourseName}</b></summary>
                                            <ul><b>{'CourseID:'}</b> {course.CourseID}</ul>
                                            <ul><b>{'Professor:'}</b> {course.Professor}</ul>
                                            <ul><b>{'MeetingTime:'}</b> {course.MeetingTime}</ul>
                                            <ul><b>{'Location:'}</b> {course.Location}</ul>
                                            <ul><b>{'Contact:'}</b> {course.Contact}</ul> */}
                                            {/* </details>  */}
                                        </div>
                                </div>
                            )
                        }
                        
                        )}
                    </div>
                </div>
            </Form>
        </div>
        )
}

export default ViewCourses;