import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import TokenList from './TokenList';

import { getContract } from '../utils/blockchain';
import { handleError } from '../utils/error';

class YourStripesComponent extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
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
          loading: false,
          tokenIds: tokenIds
        });
      } catch (err) {
        handleError(err);
        this.setState({
          loading: false,
          tokenIds: []
        });
      }
    }
  
    render() {

      const tokenIds = this.state.tokenIds;
      console.log("RENDER TOKEN IDS: " + tokenIds);
      if (this.state.loading === true) {
        return (
          <div className="content">
            <h1>Your <span className="dyna">DynaStripes</span> NFTs</h1>
            <Spinner animation="grow" variant="dark" />
          </div>
        );
      } else if (tokenIds === null || tokenIds.length === 0) {
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