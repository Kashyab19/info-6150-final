import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ListGroup from 'react-bootstrap/ListGroup';
import AuthenticationContext from '../context/AuthenticationContext';
import { useContext } from 'react';
const ProductNavigationBar = () => {

    const [products, setProducts] = useState(
        []
    )

    const {auth} = useContext(AuthenticationContext);

    
    const [flags, setFlags] = useState({
        modalFlag:false
    })
    useEffect(() =>{
        axios.get("http://127.0.0.1:3001/api/products/get-all-products").then(
            response => {
                const responseData = response.data
                setProducts(responseData)
            }
        )
    }, [])

    const handleRequestSubmit = (e) => {
        e.preventDefault();
        console.log("Handling Request")
        alert("Your email request has been sent")
    }
    
    return(
        <>
         <div className="container">\

            <Card className='w-75 justify-content-center align-items-center'>
                 <Card.Body>Hey👋,  {auth.user}&nbsp;Do you want to sell your products? &nbsp;
                    <Button variant="primary" className='request-btn'>
                    <Link to="/add-products" className='text-decoration-none text-light'>
                        Add Products
                    </Link>
                        
                    </Button>
                </Card.Body>
            </Card>
            <Row className='d-flex justify-content-center'>
                {
                products.data?.map(
                    (p) =>{
                        return(
                            <Col className='col-lg-3 col-md-5 col-12 m-2 d-flex justify-content-center' >
                                <Card className = "product-card" style={{ width: '18rem', border: '1px solid black'}}>
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
                                <Button variant="primary" className='request-btn' onClick={handleRequestSubmit}>Request</Button>
                                
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