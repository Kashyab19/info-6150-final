import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';

const ProductNavigationBar = () => {
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
      
        </div>  

    </>
    )
}

export default ProductNavigationBar;