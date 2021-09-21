import React from 'react';
import Card from 'react-bootstrap/Card';

import ArtworkComponent from '../components/ArtworkComponent';

import { getContract } from '../utils/blockchain';
import generateDynaStripes from '../dynastripes.js';
import { handleError } from '../utils/error';

function TokenList(props) {
    const tokens = props.tokens;
    const svg = generateDynaStripes();
    const listItems = tokens.map((token) =>
      <div className="token" key={token.toString()}>Token ID: {token.toString()} <ArtworkComponent tokenId={token} /> </div>
    )
    return (
      <div className="tokenList">{listItems}</div>
    );
  }
  
  // ----- COMPONENTS -----
  
  class YourStripesComponent extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        tokenIds: []
      }
    }
  
    componentDidMount() {
      this.fetchTokens();
    }
  
    async fetchTokens() {
      const contract = await getContract();
  
      if (contract === null) {
        return;
      }
  
      try {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        var tokenIds = [];
  
        const tokenCount = await contract.balanceOf(account);
        console.log("TOKEN COUNT: " + tokenCount);
  
        for (var i = 0; i < tokenCount; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(account, i);
          tokenIds.push(tokenId);
        }
        
        this.setState({
          tokenIds: tokenIds
        });
      } catch (err) {
        handleError(err);
      }
    }
  
    render() {

      const tokenIds = this.state.tokenIds;
      console.log("RENDER TOKEN IDS: " + tokenIds);
      if (tokenIds === null || tokenIds.length === 0) {
        return null;
      } else {
        return (
          <div className="mainContent">
            <Card>
              <Card.Title><h1>Your <span className="dyna">DynaStripes</span> NFTs</h1></Card.Title>
              <TokenList tokens= { tokenIds } />
            </Card>
          </div>
        );  
      }
    }
  }
  
  
  export default YourStripesComponent;