import React from 'react';
import { ethers } from 'ethers';
import Spinner from 'react-bootstrap/Spinner';

import ether from '../images/ethereum.svg';

import { fetchMintPrice } from '../utils/blockchain';
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
        try {
          const mintPrice = await fetchMintPrice();       
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
              <div>
                Mint price: <Spinner id="mintSpinner" animation="grow" />
              </div>
            );
    
        } else {
            return (
                <div>
                  Mint price: { this.state.mintPrice === null ? "-" :  ethers.utils.formatEther(this.state.mintPrice) }<img src={ether} alt="ether logo" className='mintEther'/> 
                </div>
            );    
        }    
    }
}

export default MintPriceComponent;