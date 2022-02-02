import React, {useContext} from 'react';
import {NavbarCollapse} from "react-bootstrap/NavbarCollapse";
import {Navbar,Container,Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Contexst} from "../../Contexst/Contexst";

const Header = () => {
    const [admins]=useContext(Contexst)
    return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">React-Develop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/Posts">PostAction</Nav.Link>
                            {admins ?  <Nav.Link href='/Admins/:id'>Admins</Nav.Link>: <Nav.Link href="/Admins">Admins</Nav.Link> }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    );
};

export default Header;