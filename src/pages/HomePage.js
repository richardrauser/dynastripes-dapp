import React from 'react';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';
import sample1 from '../images/dynasample3.svg';
import sample2 from '../images/dynasample2.svg';
import sample3 from '../images/dynasample1.svg';
import sample4 from '../images/dynasample9.svg';
import sample5 from '../images/dynasample4.svg';
import sample6 from '../images/dynasample6.svg';


import {
  Link
} from "react-router-dom";

import { generateRandomStripesDataUri } from '../utils/DynaStripes.js';
import SocialLinks from '../components/SocialLinks';
import DynaSpan from '../components/DynaSpan';

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
        <div className="mainContent" style={{backgroundImage: svgDataUri}} onClick={this.update}>
            <Alert variant="info">
              This is a presale of <DynaSpan/> for special people like you. 😉 You get 5 free mints! The actual sale will start on April 19/20.
            </Alert>
            <div className="content">

              <h1 className="homeTitle">
              <DynaSpan/> is <b>user-directed</b>, generative, on-chain NFT art where <b>you</b> earn all royalties 
              </h1>
              <div className="homeAbout">
                <div className="samples">
                  <img className="sample" alt="sample dyna stripes 1" src={sample1}/>
                  <img className="sample" alt="sample dyna stripes 2" src={sample2}/>
                  <img className="sample" alt="sample dyna stripes 3" src={sample3}/>
                  <img className="sample" alt="sample dyna stripes 4" src={sample4}/>
                  <img className="sample" alt="sample dyna stripes 5" src={sample5}/>
                  <img className="sample" alt="sample dyna stripes 6" src={sample6}/>
                </div>
                <div className="featureList">
                  <ul>
                    <li>
                      <b>User-directed:</b> you select the input parameters
                    </li>              
                    <li>
                      <b>Generative:</b> artwork created by an algorithm
                    </li>              
                    <li>
                    <b>On-chain:</b> artwork & metadata stored 100% on the blockchain
                    </li>              
                    <li>
                      <b>NFT:</b> ERC-721 compliant non-fungible token smart contract
                    </li>              
                    <li>
                      <b>Royalties:</b> EIP-2981 compliant, you earn all royalties
                    </li>              
                  </ul>
                </div>
                <div className="actions">
                  <Link to="/mint">
                    <Button variant="primary">Create an Artwork!</Button>
                  </Link>
                  <Link to="/gallery">
                    <Button variant="primary">Browse recent NFTs</Button>
                  </Link>
                </div>
              </div>
              <br/>
              <SocialLinks/>
            </div>
          </div>
      );
    }
  }
  
  export default HomePage;