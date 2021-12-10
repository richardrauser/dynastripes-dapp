import React from 'react';
import { ethers } from 'ethers';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import matic from '../images/polygon.svg';
import { BigNumber } from '@ethersproject/bignumber';

import MetaMaskLink from '../components/MetaMaskLink';

import { fetchMintPrice, fetchAccountDetails } from '../utils/BlockchainAPI';
import { handleError } from '../utils/ErrorHandler';
import * as Errors from '../utils/ErrorMessages';

class MintPriceComponent extends React.Component { 

    constructor(props) {
        super(props);
  
        this.state = {
            loading: true,
            mintPrice: "?"
        };
  
        this.fetchMintPrice = this.fetchMintPrice.bind(this);
      }
  
      componentDidMount() {
        this.fetchMintPrice();
      }
  
      async fetchMintPrice() {
        try {
          const mintPrice = BigNumber.from(await fetchMintPrice());
          const accountDetails = await fetchAccountDetails();
          const accountBalance = BigNumber.from(accountDetails.weiBalance);

          console.log("Mint price: " + mintPrice);       
          console.log("Account balance: " + accountBalance);       
          
          var hasEnoughEth = true;
          if (mintPrice.gt(accountBalance)) {
            hasEnoughEth = false;
          }

          this.setState({
            loading: false,
            mintPrice: ethers.utils.formatEther(mintPrice),
            hasEnoughEth: hasEnoughEth,
            balance: accountDetails.displayBalance
          });
        } catch (err) {
          if (err.message === Errors.DS_NO_ETH_WALLET) {
            this.setState({
              loading: false,
              hasWallet: false
            });  
          } else {
            handleError(err);
            this.setState({
              hasWallet: true,
              loading: false,
              mintPrice: "?"
            });  
          }
        }
      }

      render() { 
        if (this.state.loading === true) {
          return (
            <div>
              Mint price: <Spinner id="mintSpinner" animation="grow" />
            </div>
          );
        } else if (this.state.hasWallet === false) {
          return (
            <div>
              An ETH wallet is required for minting. Install <MetaMaskLink />.
            </div>
          );    
        } else if (this.state.hasEnoughEth === false) {
          return (
            <div>
              The mint price is <img src={matic} alt="MATIC logo" className='mintMatic'/>{ this.state.mintPrice }, however your balance is <img src={matic} alt="ether logo" className='mintMatic'/>{ this.state.balance }. See the <Link to="/howto">How to guide</Link> for info on acquiring ETH.
            </div>
         );    
        } else {
            return (
                <div>
                  Mint price: <img src={matic} alt="MATIC  logo" className='mintMatic'/>{ this.state.mintPrice }
                </div>
            );    
        }    
    }
}

export default MintPriceComponent;