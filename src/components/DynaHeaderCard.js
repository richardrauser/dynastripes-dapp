import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class DynaHeaderCard extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
            <Card id="mainCard">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <h1 className="homeTitle">
              <span className="dyna">DynaStripes</span> is the world's first <b><i>user directed</i></b>, generative, on-chain NFT art project. 
              </h1>
              <div className="featureList">
              <ul>
                <li>
                  <b>User directed:</b> the NFT artwork is minted using inputs that <b>you</b> select.
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
                <div className="mainCardActions">
                  <Button variant="primary">Create an Artwork!</Button>
                  <Button variant="primary">Browse recent NFTs</Button>
                </div>
  
              </div>
          </Card>
  
      );
    }
  }
  
  export default DynaHeaderCard;