import React from 'react';

import ether from '../images/ethereum.svg';

import NavDropdown from 'react-bootstrap/NavDropdown';
import { ethers } from 'ethers';

import { Wallet2 } from 'react-bootstrap-icons';

import '../utils/blockchain.js';
import '../utils/ui.js';

class DynaNavLoginDropdown extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
          isLoading: true,
      };
  
      this.fetchAccountDetails = this.fetchAccountDetails.bind(this);
  }
  
    componentDidMount() {
      this.fetchAccountDetails();
    }
    
    async fetchAccountDetails() {
      if (typeof window.ethereum !== 'undefined') {
  
        this.setState({
          isLoading: true,
          accountEthAddress: "",
          accountEthBalance: "",
          etherscanUrl: ""  
        });
  
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        var ethAddress = account.toString();
  
        if (ethAddress.length > 10) {
          ethAddress = ethAddress.substring(0, 6) +  "..." + ethAddress.slice(-4);        
        }
  
        const weiBalance = await provider.getBalance(account);
        const ethBalance = Number(ethers.utils.formatEther(weiBalance)).toFixed(4);
  
        // TODO: what if more than 1 account is returned?
        // const balance = await account[0].getBalance();
        this.setState({
          isLoading: false,
          accountEthAddress: ethAddress,
          accountEthBalance: ethBalance.toString(),
          etherscanUrl: "https://etherscan.io/address/" + account.toString(),
          minterAddress: ''
        });
  
  
        console.log('Address: ', this.state.accountEthAddress);
        console.log('Balance: ', this.state.accountEthBalance);
      }
    }
  
    render() {
      if (this.state.isLoading) {
        return null;
      } else {
        return (
          <NavDropdown title="Your ETH Details" id="basic-nav-dropdown">
            <NavDropdown.Item href={this.state.etherscanUrl} target="_blank"><Wallet2 className='navDropdownIcon' />{ this.state.accountEthAddress }</NavDropdown.Item>
            <NavDropdown.Item href={this.state.etherscanUrl} target="_blank"><img src={ether} alt="ether logo" className='navDropdownIcon' />{ this.state.accountEthBalance }</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={this.state.etherscanUrl}>Logout</NavDropdown.Item>
          </NavDropdown>
        );
      }
    }
  
  }

  export default DynaNavLoginDropdown;