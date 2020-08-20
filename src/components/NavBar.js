import React from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
    render() { 
        return (  
            <>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <NavLink to="/" className="navbar-brand">React</NavLink>
                        <Nav className="mr-auto">
                            <NavLink to="/" className="nav-link">Home</NavLink>
                            <NavLink to="/personas" className="nav-link">Personas</NavLink>
                            <NavLink to="/dd" className="nav-link">Direcciones</NavLink>
                        </Nav>
                    </Nav>
                </Navbar>
            </>
        );  
    }
}
 
export default NavBar;