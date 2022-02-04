import React from 'react';
import {NavbarCollapse} from "react-bootstrap/NavbarCollapse";
import {Navbar, Container, Nav, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


const Header = () => {

    const navigate = useNavigate();
    const admins = useSelector(state => state.admins.value)
    console.log(admins);
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#">React-Develop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/Posts' className="nav-link ">PostAction</Link>
                        </li>

                        <li className="nav-item">
                            {admins.isAdmin ? <Button onClick={() => navigate(`/Admins/${admins.id}`)}
                                                      className="nav-link active"> Hallo {admins.name}</Button> :
                                <Link to='/Admins' className="nav-link active">Admins</Link>}
                        </li>
                    </ul>

                </Navbar.Collapse>
            </Container>
        </Navbar>


    );
};

export default Header;