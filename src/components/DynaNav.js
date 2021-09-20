import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import DynaNavLoginDropdown from './DynaNavLoginDropdown';

class DynaNav extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="#home" className="dyna">DynaStripes</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#recent">Gallery</Nav.Link>
                    <Nav.Link href="#mint">Mint!</Nav.Link>
                    <Nav.Link href="#stripes">Your Stripes</Nav.Link>
                    <Nav.Link href="#admin">How to</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                </Nav>
                <Nav>
                    <DynaNavLoginDropdown />
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        );
    }
}

export default DynaNav;