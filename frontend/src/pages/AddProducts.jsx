import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import {Row, Col} from 'react-bootstrap';
import "../styles/AddProducts.css"
import { useState } from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const usaStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
const conditionOfTheProducts = ['Bad','Good', 'Better', 'Best']


const AddProducts = () =>{
    
    const [flags, setFlags] = useState({
        showModal : false
    })
    const [newProduct, setNewProduct] = useState( {
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
            colour: "",
            firstPhoto:""
        }
      });
    
    const handleSubmit =(e) => {
        e.preventDefault();
        
        console.log("At Handle Submit");

        var productAdded = newProduct;
        alert("Your product has been added")
        axios.post("http://127.0.0.1:3001/api/products/add-product", productAdded)
            .then(response =>{
                console.log(response);
            })

            setFlags({
                showModal: true
            })
        setNewProduct({
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
        })

        console.log(newProduct);
    }
    const handleModal = (e) => {
        e.preventDefault();
        
    }
    const handleChange = (e) => {
        e.preventDefault();
        setNewProduct(
            {
                ...newProduct,
                location: {
                    ...newProduct.location,
                    [e.target.name] : e.target.value
                },
                details: {
                    ...newProduct.details,
                    [e.target.name] : e.target.value
                },

                [e.target.name] : e.target.value, //For root-level elements
                
            }
        );
        
    }
    return(
        <div className="add-product-container ">
            <Form onSubmit={handleSubmit} autoComplete="off" validate = "true" encType='multipart/form-data' >
                <h4> Product Details </h4>
                <Form.Group className="mb-3" controlId="formBasicEmail" required>
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
                <br/>
                <Row>
                    <Col>
                        <Form.Control placeholder="City*" name="city" value={newProduct.location.city} onChange={handleChange}/>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="formGridState">
                            <Form.Select name="state" value={newProduct.location.state}  onChange={handleChange}>
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
                        <Form.Control placeholder="Zipcode*" name="zipcode" value={newProduct.location.zipcode} onChange={handleChange}/>
                    </Col>
                    <Col>
                        
                    </Col>
                </Row>
                <br/>
                <h4> Product Description </h4>
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
                </Form.Group>

                <div className='d-flex justify-content-center'>
                    <Button className='' variant="primary" type="submit"> Submit </Button>
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
    )
}

export default AddProducts;