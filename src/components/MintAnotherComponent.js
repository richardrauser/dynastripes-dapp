import React from 'react';

import Button from 'react-bootstrap/Button';
import DynaSpan from '../components/DynaSpan';
import polygonscan from '../images/polygonscan.svg';
import twitter from '../images/twitter.png';

import {
  Link
} from "react-router-dom";
import { DynaStripesCurrentNetworkExplorerUrl } from '../utils/Constants';

class MintAnotherComponent extends React.Component {
  

  render() {
    const txLink = DynaStripesCurrentNetworkExplorerUrl + "tx/" + this.props.txHash;

    console.log("txLink: " + txLink);
    // const tokenLink = "https://www.dynastripes.com/token/" + this.state.tokenId;

    const tokenPageLink = encodeURIComponent("https://www.dynastripes.com/");
    const tweetText = encodeURIComponent("I just minted a DynaStripes #NFT artwork. It's 100% on-chain, generative art! Check it out.");
    const tweetRelated = encodeURIComponent("volstrate,richardrauser");
    const tweetUrl = "https://twitter.com/intent/tweet?url=" + tokenPageLink + "&text=" + tweetText + "&related=" + tweetRelated; 

    return (
      <div>
          <div className="singleArtwork">
              <img alt={"DynaStripes token"} src={ this.props.svgDataUri } />
          </div>

          <p className="success">
            Your <DynaSpan/> have been successfully minted! Once the transaction is complete, your new artwork will appear in the gallery. Vist the gallery to see it, or mint more <DynaSpan/> now!
          </p>

          <Link to="/gallery">
            <Button variant="primary">Visit Gallery</Button>
          </Link>
          <Button variant="primary" onClick={this.props.mintAnother}>Mint Another</Button>
          <a href={tweetUrl} target ="_blank" rel="noreferrer">
            <Button>
              <img className="buttonLogo" alt="twitter logo" src={twitter}/>
              Tweet
            </Button>
          </a>
          <br/>

          <a href={ txLink }  target="_blank" rel="noreferrer"> 
            <img className="polygonscan" alt="polygonscan" src= { polygonscan } />
          </a>
      </div>
    );
  }
}
  
export default MintAnotherComponent;