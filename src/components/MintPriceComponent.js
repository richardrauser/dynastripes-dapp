import React from 'react';
import { ethers } from 'ethers';
import Spinner from 'react-bootstrap/Spinner';

import ether from '../images/ethereum.svg';

import { getContract } from '../utils/blockchain';
import { handleError } from '../utils/error';

class MintPriceComponent extends React.Component { 

    constructor(props) {
        super(props);
  
        this.state = {
            loading: true,
            mintPrice: null
        };
  
        this.fetchMintPrice = this.fetchMintPrice.bind(this);
      }
  
      componentDidMount() {
        this.fetchMintPrice();
      }
  
      async fetchMintPrice() {
        const contract = await getContract();
    
        if (contract === null) {
          return;
        }
    
        try {
  
          const mintPrice = await contract.currentMintPrice();
          console.log("Mint price: " + mintPrice);
       
          this.setState({
            loading: false,
            mintPrice: mintPrice
          });
        } catch (err) {
          handleError(err);
          this.setState({
            loading: false,
            mintPrice: null
          });
        }
      }

      render() { 
        if (this.state.loading === true) {
            return (
                <p>
                    Mint price: <Spinner id="mintSpinner" animation="grow" />
                </p>
            );
    
        } else {
            return (
                <p>
                  Mint price: { this.state.mintPrice === null ? "-" :  ethers.utils.formatEther(this.state.mintPrice) }<img src={ether} alt="ether logo" className='mintEther'/> 
                </p>
            );    
        }    
    }
}

export default MintPriceComponent;