import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import "../styles/AddProducts.css"
import { useState } from 'react';

const usaStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
const conditionOfTheProducts = ['Bad','Good', 'Better', 'Best']


const AddProducts = () =>{
    const [newProducts, setNewProducts] = useState( {
        productName : "",
        productPrice: "",
        location:{
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: ""
        },
        details:{
            productCondition: "",
            productMaterial: "",
            colour: ""
        }
      });
    
    const handleSubmit =(e) => {
        e.preventDefault();
        console.log("Handling submit");
    }

    const handleChange = (e) => {
        e.preventDefault();
    }
    return(
        <div className="add-product-container ">
            <Form onSubmit={handleSubmit}>
                <h4> Product Details </h4>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Product Name*" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="Price*" onChange={handleChange}/>
                </Form.Group>
                <h4> Address </h4>
                <Row>
                    <Col>
                        <Form.Control placeholder="Address 1*" onChange={handleChange}/>
                    </Col>
                    <Col>
                        <Form.Control placeholder="Address 2" onChange={handleChange}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Form.Control placeholder="City*" onChange={handleChange}/>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Select defaultValue="State"  onChange={handleChange}>
                                <option>State*</option>
                                {
                                    usaStates.map(
                                        state => {
                                            return(
                                                <option key={state}>{state}</option>
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
                        <Form.Control placeholder="Zipcode*" onChange={handleChange}/>
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                <br/>
                <h4> Product Description </h4>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Group as={Col} controlId="formGridState">
                            <Form.Select defaultValue="State" onChange={handleChange}>
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
                    <Form.Control type="text" placeholder="Material" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="Colour" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="file" accept='.png, .jpg, .jpeg' placeholder="Images" />
                </Form.Group>

                <div className='d-flex justify-content-center'>
                    <Button className='' variant="primary" type="submit"> Submit </Button>
                </div>
        </Form>
    </div>
    )
}

export default AddProducts;