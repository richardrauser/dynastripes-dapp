import generateDynaStripes from './dynastripes.js';
import logo from './images/logo.svg';
import background from './images/dynaStripesBackground.svg';
import { ReactComponent as DynaStripesComponent } from './images/dynaStripesBackground.svg';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ethers } from 'ethers';
import ColourPulse from './artifacts/contracts/ColourPulse.sol/ColourPulse.json';

import React, { useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const colourPulseAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const initialState = {
    accountEthAddress: 'Loading..',
    accountEthBalance: 'Loading..'  
}

// ----- CONTRACT FUNCTIONS -----

async function getContract() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(colourPulseAddress, ColourPulse.abi, provider);
    return contract;
  } else {
    showErrorMessage('Could not get contract.');
    console.log('Could not get contract. Returning null..');
    return null;
  }
}

async function getContractWithSigner() {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(colourPulseAddress, ColourPulse.abi, provider);
    const signer = provider.getSigner();

    const contractWithSigner = contract.connect(signer);
    return contractWithSigner;
  } else {
    showErrorMessage('Could not get signer.');
    console.log('Could not get contract with signer. Returning null..');
    return null;
  }
}

function handleError(err) {
  console.log('Handling error ' + err.code + ': ' + err.message);

  if (err.code === 4001) {
    showErrorMessage('You rejected the transaction. :-(');
  } else if (err.code === -32603) {
    // Internal JSON RPC error
    if (err.data != null && err.data.message != null) {
      showErrorMessage('Oops, an error ocurred. ' + err.data.message);
    } else {
      showErrorMessage('Oops, an Internal JSON RPC error occurred. ');
    }
  } else if (err.code != null) {
    showErrorMessage('An Error occurred: ' + err.code);
  } else {
    showErrorMessage('An Error occurred.');
  }
}


// ----- UI FUNCTIONS -----

function showErrorMessage(message) {
  console.log('Displaying error message: ' + message);
  // toast.error('⚠️ ' + message, {
  toast.error(message, {
      position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}

function TokenList(props) {
  const tokens = props.tokens;
  const listItems = tokens.map((token) =>
    <li>{token.toString()}</li>
  )
  return (
    <ul>{listItems}</ul>
  );
}


// ----- COMPONENTS -----

class AccountComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      accountEthAddress: 'Loading..',
      accountEthBalance: 'Loading..',
      errorMessage: ''
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
        accountEthBalance: ""  
      });

      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const weiBalance = await provider.getBalance(account);
      const ethBalance = ethers.utils.formatEther(weiBalance);

      // TODO: what if more than 1 accout is returned?
      // const balance = await account[0].getBalance();
      this.setState({
        isLoading: false,
        accountEthAddress: account.toString(),
        accountEthBalance: ethBalance.toString(),
        minterAddress: ''
      });


      console.log('Address: ', this.state.accountEthAddress);
      console.log('Balance: ', this.state.accountEthBalance);
    }
  }

  render() {

    if (this.props.isLoading) {
      return (
        <Spinner animation="grow" />
      );
    }  else {
      return (
        <Card variant="top" className="appCard">
          <Card.Title>
            Your ETH Account Details
          </Card.Title>
        <div id='accountDetails'>
          <Card.Body>
          🏠 { this.state.accountEthAddress } <br/>
          💰 { this.state.accountEthBalance } <br/> 

          </Card.Body>

          </div>
          <center>
          <Button variant="primary" onClick={this.props.fetchAccountDetails}>Reload Account</Button>

          </center>

        </Card>
      );
    }
  }
}

class ContractAdminComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    }
    this.fetchAdminStatus = this.fetchAdminStatus.bind(this);

  }

  componentDidMount() {
    this.fetchAdminStatus();
  } 

  async pauseContract() {
    const contractWithSigner = await getContractWithSigner();

    if (contractWithSigner === null) {
      return;
    }

    try {
      await contractWithSigner.pause();
      console.log('Contract paused.');
      toast.success('Contract paused.');
    } catch (err) {
      handleError(err);
    }
  }

  async unpauseContract() {
    const contractWithSigner = await getContractWithSigner();

    if (contractWithSigner === null) {
      return;
    }

    try {
      await contractWithSigner.unpause();
      console.log('Contract unpaused.');
      toast.success('Contract unpaused.');
    } catch (err) {
      handleError(err);
    }
  }

  async fetchAdminStatus() {
    const contract = await getContract();

    if (contract === null) {
      return;
    }
  
    const isSenderAdmin = contract.isSenderAdmin();
    if (isSenderAdmin) {
      toast("YES");
    } else {
      toast("NO");
    }

    this.setState({
      isAdmin: isSenderAdmin,
    });  
  }

  render() {

    if (!this.state.isAdmin) {
      return null;
    }  else {
      return (
        <Card>
        <Card.Title> Admin Settings </Card.Title>
        <center>
          <Button variant="primary" onClick={this.pauseContract}>Pause</Button>
          <Button variant="primary" onClick={this.unpauseContract}>Unpause</Button>
          <br/><hr/>
          <input value={this.minterAddress} onChange={this.handleChange} /><br/>
          <Button variant="primary" onClick={this.pauseContract}>Update minter</Button>
        </center>
      </Card>
      );
    }
  }
}

class YourTokensComponent extends React.Component {

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
      })
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
        <Card>
        <Card.Title>Your DynaStripes NFTs</Card.Title>
        <TokenList tokens= { tokenIds } />
      </Card>
      );  
    }
  }
}

class MintComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  async mint() {


    const dynaStripesSvg = generateDynaStripes();
    console.log(dynaStripesSvg);
    const contractWithSigner = await getContractWithSigner();

    if (contractWithSigner === null) {
      showErrorMessage('Could not get signer.');
      return;
    }

    try {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      await contractWithSigner.safeMint(account);
      toast.success("Successfully minted your DynaStripes NFT!");
    } catch (err) {
      handleError(err);
    }
  }

  render() {

    return (
      <Card>
      <Card.Title>Mint your own DynaStripes NFT</Card.Title>
      <center>
        <Button variant="primary" onClick={this.mint}>Mint, baby!</Button>
      </center>
    </Card>
    );
  }
}



class App extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="homeTitle">
            DynaStripes is the world's first <b><i>user directed</i></b>, generative, on-chain NFT art project. 
          </h1>
          <div className="featureList">
          <ul>
            <li>
              <b>User directed:</b> the NFT artwork is minted using inputs that <b>you</b> select.
            </li>              
            <li>
              <b>Generative:</b> your inputs and a set of random values are used to programatically create the artwork.
            </li>              
            <li>
            <b>On-chain</b>: the creation algorithm, the inputs, and the artwork are stored on the Ethereum blockchain.
            </li>              
            <li>
              <b>NFT:</b> fully ERC-721 compliant non-fungible token smart contract. 
            </li>              
            </ul>

          </div>
          </header>

        <div id="mainContent">

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          
          <AccountComponent />

          <YourTokensComponent />

          <MintComponent />

          <ContractAdminComponent />

          {/* <img src={background} />; */}
          
          <a className="App-link" href="http://www.volstrate.com" target="_blank" rel="noopener noreferrer">
            by volstrate
          </a>

        </div>
      </div>

    );
  
  }
}

export default App;
