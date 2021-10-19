import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import { getContract } from '../utils/blockchain';

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
        this.fetchOwnerStatus();
      }
    
      async fetchOwnerStatus() {
        const contract = await getContract();
      
        if (contract === null) {
          return;
        }
    
        try {    
          const isOwner = await contract.isSenderOwner();
          console.log("DynaNav isOwner: " + isOwner);
    
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
            <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/" className="dyna">DynaStripes</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/mint">Mint!</Nav.Link>
                    <Nav.Link href="/gallery">Gallery</Nav.Link>
                    <Nav.Link href="/howto">How to</Nav.Link>
                    <Link to="/about"><Nav.Link>About</Nav.Link></Link>
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