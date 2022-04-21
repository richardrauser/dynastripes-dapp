import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { isCurrentAccountOwner } from '../utils/BlockchainAPI';

import DynaNavLoginDropdown from './DynaNavLoginDropdown';


class DynaNav extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isOwner: false
        };
    
        this.fetchOwnerStatus = this.fetchOwnerStatus.bind(this);
      }
    
      componentDidMount() {
        if (typeof window.ethereum === 'undefined') {
          console.log("No wallet.");
          return;
        }
  
        this.fetchOwnerStatus();
      }
    
      async fetchOwnerStatus() {
        try {    
          const isOwner = await isCurrentAccountOwner();

          this.setState({
            isOwner: isOwner
          });
        } catch (err) {
          this.setState({
            isOwner: false,
          });
        }
      }
      
    render() {
        return (
          // <Navbar bg="light" expand="lg" sticky="top">
          <Navbar bg="light" expand="lg">
          <Container>
                <Navbar.Brand href="/" className="dyna">DynaStripes</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/mint">Mint!</Nav.Link>
                    <Nav.Link href="/gallery">Gallery</Nav.Link>
                    <Nav.Link href="/howto">How to</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/feedback">Feedback</Nav.Link>
                    { this.state.isOwner === true ? <Nav.Link href="/admin">Admin</Nav.Link> : null }
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