import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import TokenList from './TokenList';

import { getContract } from '../utils/blockchain';
import { handleError } from '../utils/error';

  class RecentStripesComponent extends React.Component {
  
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
  
        const tokenCount = await contract.totalSupply();
        console.log("Total supply: " + tokenCount);
  
        for (var i = tokenCount - 1; i >= 0 && i >= tokenCount - 7; i--) {
          const tokenId = await contract.tokenByIndex(i);
          tokenIds.push(tokenId);
        }
        
        this.setState({
          loading: false,
          tokenIds: tokenIds
        });
      } catch (err) {
        this.setState({
          loading: false,
          tokenIds: []
        });
        handleError(err);
      }
    }
  
    render() {

      const tokenIds = this.state.tokenIds;
      console.log("RENDER TOKEN IDS: " + tokenIds);

      if (this.state.loading === true) {
        return (
          <div className="content">
            <h1>Recently minted <span className="dyna">DynaStripes</span> NFTs</h1>
            <Spinner animation="grow" variant="dark" />
          </div>
        );
      } else if (tokenIds === null || tokenIds.length === 0) {
        return (
          <div className="mainContent">
            <div className="content">
              <h1>Recently minted <span className="dyna">DynaStripes</span> NFTs</h1>
                No stripes have been minted yet.
            </div>
          </div>
        );
      } else {
        return (
          <div className="mainContent">
            <div className="content">
              <h1>Recently minted <span className="dyna">DynaStripes</span> NFTs</h1>
              <TokenList tokens= { tokenIds } />
            </div>
          </div>
        );  
      }
    }
  }
  
  export default RecentStripesComponent;