import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import ListGroup from 'react-bootstrap/ListGroup';

const ProductNavigationBar = () => {

    const [products, setProducts] = useState(
        []
    )
    
    const [flags, setFlags] = useState({
        modalFlag:false
    })
    useEffect(() =>{
        axios.get("http://127.0.0.1:3001/api/products/get-all-products").then(
            response => {
                const responseData = response.data
                console.log(responseData)
                setProducts(responseData)
            }
        )
    }, [])

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        console.log("Handling Request")
        alert("Your email request has been sent")
    }
    
    console.log(products)
    console.log(flags)
    return(
        <>
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">Northeastern</Navbar.Brand>
            <Nav className="me-auto">
                    <LinkContainer to="/add-products">
                        <Nav.Link>Add Product</Nav.Link>
                    </LinkContainer>
                
                    <Nav.Link>Contact us</Nav.Link>
                
                    <Nav.Link>Logout</Nav.Link>
                
            </Nav>
        </Navbar>
         <div className="container">
         <Row>
            {
            products.data?.map(
                (p) =>{
                    return(
                        <Col className='col-3'>
                            <Card style={{ width: '18rem', border: '1px solid black', margin: '10px' }}>
                            <Card.Body>
                            <Card.Title>{p.productName}</Card.Title>
                            <Card.Text>${p.productPrice}</Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>{p.location.address1}&nbsp;{p.location.address2}</ListGroup.Item>
                                <ListGroup.Item>{p.location.city},&nbsp;{p.location.state}, &nbsp;{p.location.zipcode}</ListGroup.Item>
                                <ListGroup.Item>Condition: {p.details.productCondition}</ListGroup.Item>
                                <ListGroup.Item>Material: {p.details.productMaterial}</ListGroup.Item>
                                <ListGroup.Item>Colour: {p.details.colour}</ListGroup.Item>
                            </ListGroup>
                            <Button variant="primary" onClick={handleRequestSubmit}>Request</Button>
                            
                            </Card>
                        </Col>
                    )
                }
            )
        }
        </Row>
         
        
        </div>
    </>
    )
}

export default ProductNavigationBar;