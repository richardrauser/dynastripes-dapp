import React from 'react';

import TokenList from './TokenList';

import { getContract } from '../utils/blockchain';
import { handleError } from '../utils/error';

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
        return (
            <div className="content">
              <h1>Your <span className="dyna">DynaStripes</span> NFTs</h1>
                You have no DynaStripes yet.
            </div>
        );
      } else {
        return (
            <div className="content">
              <h1>Your <span className="dyna">DynaStripes</span> NFTs</h1>
              <TokenList tokens= { tokenIds } />
            </div>
        );  
      }
    }
  }
  
  export default YourStripesComponent;