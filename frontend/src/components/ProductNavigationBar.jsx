import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
         {
            products.data?.map(
                (p) =>{
                    return(
                        <Card style={{ margin:'10px' ,width: '20rem', border:'1px solid black' }}>
                                <Card.Body>
                                    <Card.Title>{p.productName}</Card.Title>
                                    <Card.Text>{p.productPrice}
                                    </Card.Text>
                                    <Button variant="primary" onClick={handleRequestSubmit}>Request</Button>
                                </Card.Body>
                        </Card>
                    )
                }
            )
        }
        
        </div>
    </>
    )
}

export default ProductNavigationBar;