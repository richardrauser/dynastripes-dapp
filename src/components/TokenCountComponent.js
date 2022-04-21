import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import { getContract } from '../utils/BlockchainAPI';
import { handleError } from '../utils/ErrorHandler';
import * as Errors from '../utils/ErrorMessages';

class MintPriceComponent extends React.Component { 

    constructor(props) {
        super(props);
  
        this.state = {
            loading: true,
            tokenCount: "?",
        };
  
        this.fetchTokenCountDetails = this.fetchTokenCountDetails.bind(this);
      }
  
      componentDidMount() {
        this.fetchTokenCountDetails();
      }
      
      async fetchTokenCountDetails() {

        try {
            const contract = await getContract();  
            const tokenCount = Number(await contract.totalSupply());
      
            console.log("Token count: " + tokenCount);       
            
            this.setState({
              loading: false,
              tokenCount: tokenCount,
            });
          } catch (err) {
            if (err.message === Errors.DS_NO_ETH_WALLET) {
            } else {
              handleError(err);
              this.setState({
                hasWallet: true,
                loading: false,
                tokenCount: "?"
              });  
            }
          }
  
      }
  

      render() { 
        if (this.state.loading === true) {
          return (
            <div>
                <Spinner id="mintSpinner" animation="grow" />
            </div>
          );
        } else {
            return (
                <div>
                  Tokens minted: { this.state.tokenCount } / 1119
                </div>
            );    
        }    
    }
}

export default MintPriceComponent;