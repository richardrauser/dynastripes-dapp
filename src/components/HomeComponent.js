import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import generateDynaStripes from '../dynastripes.js';
 
class HomeComponent extends React.Component {
    constructor(props) {
      super(props);
      
      this.update = this.update.bind(this);
    }
    
    update() {
      console.log("Updating Stripes..");
      this.setState({});
    }
  
  
    render() {
      const svgString = encodeURIComponent(generateDynaStripes());
      const svgDataUri = `url("data:image/svg+xml,${svgString}")`;
  
      return (
        <div className="mainContent"  style={{background: svgDataUri}} onClick={this.update}>

            <div className="content home">

              <h1 className="homeTitle">
              <span className="dyna">DynaStripes</span> is a novel <b>user-directed</b>, generative, on-chain NFT art project. 
              </h1>
              <div className="featureList">
              <ul>
                <li>
                  <b>User-directed:</b> the NFT artwork is minted using inputs that <b>you</b> select.
                </li>              
                <li>
                  <b>Generative:</b> your inputs and a set of random values are used to programatically create the artwork.
                </li>              
                <li>
                <b>On-chain</b>: the creation algorithm, the inputs, and the artwork are stored on the Ethereum blockchain.
                </li>              
                <li>
                  <b>NFT:</b> fully ERC-721 compliant non-fungible token smart contract. 
                </li>              
                </ul>
                <div className="homeActions">
                  <Link to="/mint">
                    <Button variant="primary">Create an Artwork!</Button>
                  </Link>
                  <Link to="/gallery">
                    <Button variant="primary">Browse recent NFTs</Button>
                  </Link>
                </div>
  
              </div>
          </div>
        </div>

      );
    }
  }
  
  export default HomeComponent;