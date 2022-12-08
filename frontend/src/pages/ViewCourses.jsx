import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation } from 'react-router-dom';

import "../styles/AddProducts.css"

const ViewCourses = () =>{
    const location = useLocation();
    console.log(location.state)
    const {from} = location.state?.from;
    
    return(
        <div className="add-product-container ">
            <Form autoComplete="off" validate = "true" encType='multipart/form-data' >
                <div className='form-head'>
                    <h4> Course List </h4>
                    {console.log({from})}
                </div>
            </Form>
        </div>
        )
}

export default ViewCourses;