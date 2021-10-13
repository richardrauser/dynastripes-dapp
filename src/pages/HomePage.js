import React from 'react';
import Button from 'react-bootstrap/Button';

import {
  Link
} from "react-router-dom";

import { generateRandomStripesDataUri } from '../dynastripes.js';
 
class HomePage extends React.Component {
    constructor(props) {
      super(props);
      
      this.update = this.update.bind(this);
    }
    
    update() {
      console.log("Updating Stripes..");
      this.setState({});
    }
  
  
    render() {
      const svgDataUri = generateRandomStripesDataUri();
  
      return (
        <div className="mainContent"  style={{background: svgDataUri}} onClick={this.update}>

            <div className="content">

              <h1 className="homeTitle">
              <span className="dyna">DynaStripes</span> is <b>user-directed</b>, generative, on-chain NFT art where <b>you</b> earn all royalties 
              </h1>
              <div className="featureList">
              <ul>
                <li>
                  <b>User-directed:</b> you select the input parameters
                </li>              
                <li>
                  <b>Generative:</b> the artwork is created by an algorithm
                </li>              
                <li>
                <b>On-chain</b>: artwork is stored entirely on the Ethereum blockchain
                </li>              
                <li>
                  <b>NFT:</b> ERC-721 compliant non-fungible token smart contract
                </li>              
                <li>
                  <b>Royalties:</b> ERC-2981 compliant, and you earn all royalties
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
  
  export default HomePage;