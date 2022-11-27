import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import "../styles/AddProducts.css"

const usaStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
const conditionOfTheProducts = ['Bad','Good', 'Better', 'Best']


const AddProducts = () =>{

    return(
        <div className="add-product-container ">
            <Form>
                <h4> Product Details </h4>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Product Name*" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="text" placeholder="Price*" />
                </Form.Group>
                <h4> Address </h4>
                <Row>
                    <Col>
                        <Form.Control placeholder="Address 1*" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Address 2" />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Form.Control placeholder="City*" />
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Select defaultValue="State">
                                <option>State*</option>
                                {
                                    usaStates.map(
                                        state => {
                                            return(
                                                <option>{state}</option>
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
                        <Form.Control placeholder="Zipcode*" />
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                <br/>
                <h4> Product Description </h4>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Group as={Col} controlId="formGridState">
                            <Form.Select defaultValue="State">
                                <option>Condition of the Product*</option>
                                {
                                    conditionOfTheProducts.map(
                                        condition => {
                                            return(
                                                <option>{condition}</option>
                                            )
                                        }
                                    )
                                }
                            </Form.Select>
                     </Form.Group>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="number" placeholder="Material" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="number" placeholder="Colour" />
                </Form.Group>

                <div className='d-flex justify-content-center'>
                    <Button className='' variant="primary" type="submit"> Submit </Button>
                </div>
        </Form>
    </div>
    )
}

export default AddProducts;