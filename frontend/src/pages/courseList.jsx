import {react, useEffect, useState} from "react";
import axios from 'axios';

const GetAllCourses = () => {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/api/course/get-all-courses").then(res => {
            setCourses(res.data.data)
            console.log(res.data)
            return res.data
    })}, []
    )

    return (
    <div>
        {
            courses && courses.map(course => 
            {
                return <div>{course.courseName}</div>
            }
            )
        }
    </div>
    )
}

export default GetAllCourses;

//commenting to add my contributions