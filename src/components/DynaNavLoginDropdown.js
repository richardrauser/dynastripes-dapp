import React from 'react';

import ether from '../images/ethereum.svg';

import NavDropdown from 'react-bootstrap/NavDropdown';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { ethers } from 'ethers';

import { Wallet2 } from 'react-bootstrap-icons';

import '../utils/blockchain.js';
import '../utils/ui.js';
import { handleError } from '../utils/error';

const accountAddressKey = "accountAddress";
const accountBalanceKey = "accountBalance";

class DynaNavLoginDropdown extends React.Component {

    constructor(props) {
      super(props);
      
      this.state = {
        isLoading: false,
        isWalletConnected: false
      };        
  
      this.connectWallet = this.connectWallet.bind(this);
      this.disconnectWallet = this.disconnectWallet.bind(this);
      this.refreshWallet = this.refreshWallet.bind(this);
      this.fetchAccountDetails = this.fetchAccountDetails.bind(this);
  }
  
    componentDidMount() {
      window.ethereum.on('accountsChanged', (accounts) => {
        this.fetchAccountDetails();
      });
      
      window.ethereum.on('chainChanged', (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        window.location.reload();
        this.disconnectWallet();
      });

      const accountAddress = localStorage.getItem(accountAddressKey);
      const accountBalance = localStorage.getItem(accountBalanceKey);

      if (accountAddress && accountBalance) {
        console.log("Got legit address (" + accountAddress + ") and balance (" + accountBalance + ").");
        this.updateAccountDetails(accountAddress, accountBalance);
      } else {
        this.setState({
          isLoading: false,
          isWalletConnected: false
        });        
      }
    }

    componentWillUnmount() {
      // window.ethereum.removeListener('accountsChanged', func);
      // window.ethereum.removeListener('chainChanged', func);
    }

    // async checkWalletConnection() {
    //   ethereum.isConnected()
    // }
    
    async connectWallet() {
      // console.log("Attempting to connect wallet..");
      // const metaMaskUnlocked = (await window.ethereum._metamask.isUnlocked());
      // console.log("Metamask unlocked? " + metaMaskUnlocked);

      // if (window.ethereum.isMetaMask && !metaMaskUnlocked) {
      //   console.log("Metamask lockiepooed.");
      //   showErrorMessage("Please unlock MetaMask.");
      // } else {
        this.fetchAccountDetails();
      // }
    }

    disconnectWallet() {
      console.log("Disconnecting wallet..");

      localStorage.removeItem(accountAddressKey);
      localStorage.removeItem(accountBalanceKey);

      this.setState({
        isLoading: false,
        isWalletConnected: false,
        accountEthAddress: "",
        accountEthBalance: "",
        etherscanUrl: ""  
      });
    }

    refreshWallet() {
      this.fetchAccountDetails();
    }

    async fetchAccountDetails() {
      console.log("Fetching account details..");
      if (typeof window.ethereum === 'undefined') {

        this.setState({
          isLoading: false,
          isWalletConnected: false
        });

        return;
      }
  
      this.setState({
        isLoading: true,
        isWalletConnected: false,
        accountEthAddress: "",
        accountEthBalance: "",
        etherscanUrl: ""  
      });

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        var ethAddress = account.toString();

        console.log("Getting details of account: " + ethAddress); 
  
        if (ethAddress.length > 10) {
          ethAddress = ethAddress.substring(0, 6) +  "..." + ethAddress.slice(-4);        
        }
  
        const weiBalance = await provider.getBalance(account);
        const ethBalance = Number(ethers.utils.formatEther(weiBalance)).toFixed(4);

        localStorage.setItem(accountAddressKey, ethAddress);
        localStorage.setItem(accountBalanceKey, ethBalance);
        this.updateAccountDetails(ethAddress, ethBalance);
      
      } catch (err) {
        console.log("Error occurred fetching account details.");

        handleError(err);
        // showErrorMessage("Error connecting wallet.");

        this.setState({
          isLoading: false,
          isWalletConnected: false
        });
      };
    }

    updateAccountDetails(ethAddress, ethBalance) {
      this.setState({
        isLoading: false,
        isWalletConnected: true,
        accountEthAddress: ethAddress,
        accountEthBalance: ethBalance.toString(),
        etherscanUrl: "https://etherscan.io/address/" + ethAddress.toString(),
      });

      console.log('Address: ', ethAddress);
      console.log('Balance: ', ethBalance);
    }
  
    render() {
      if (this.state.isLoading) {
        return (
        <Spinner></Spinner>
        );
      } else if (!this.state.isWalletConnected) {
        return (
        <Button onClick={ this.connectWallet }>Connect wallet</Button>
        );
      } else {
        return (
          <NavDropdown title="Your ETH Details" id="basic-nav-dropdown">
            <NavDropdown.Item href={this.state.etherscanUrl} target="_blank"><Wallet2 className='navDropdownIcon'/>{ this.state.accountEthAddress }</NavDropdown.Item>
            <NavDropdown.Item href={this.state.etherscanUrl} target="_blank"><img src={ether} alt="ether logo" className='navDropdownIcon' />{ this.state.accountEthBalance }</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={this.refreshWallet}>Refresh</NavDropdown.Item>
            <NavDropdown.Item onClick={this.disconnectWallet}>Disconnect</NavDropdown.Item>
          </NavDropdown>
        );
      }
    }
  
  }

  export default DynaNavLoginDropdown;