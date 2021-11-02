import React from 'react';

import Button from 'react-bootstrap/Button';
import DynaSpan from '../components/DynaSpan';
import etherscan from '../images/etherscan-logo-light.png';

import {
  Link
} from "react-router-dom";

class MintAnotherComponent extends React.Component {
  

  render() {
    const txLink = "https://rinkeby.etherscan.io/tx/" + this.props.txHash;

    console.log("txLink: " + txLink);

    return (
      <div>
          <p className="success">
            Your <DynaSpan/> have been successfully minted! Once the transaction is complete, your new artwork will appear in the gallery. Vist the gallery to see it, or mint more <DynaSpan/> now!
          </p>

          <Link to="/gallery">
            <Button variant="primary">Visit Gallery</Button>
          </Link>
          <Button variant="primary" onClick={this.props.mintAnother}>Mint Another</Button>
          
          <br/>
          
          <a href={ txLink }  target="_blank" rel="noreferrer"> 
            <img className="etherscan" alt="etherscan" src= { etherscan } />
          </a>
      </div>
    );
  }
}
  
export default MintAnotherComponent;