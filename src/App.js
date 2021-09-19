import generateDynaStripes from './dynastripes.js';
import logo from './images/logo.svg';
import dynaSample from './images/dynaStripesBackground.svg';
import ether from './images/ethereum.svg';

import { ReactComponent as DynaStripesComponent } from './images/dynaStripesBackground.svg';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
 
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ethers } from 'ethers';
import ColourPulse from './artifacts/contracts/ColourPulse.sol/ColourPulse.json';

import React, { useState } from 'react';
import {Fragment} from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Spinner from 'react-bootstrap/Spinner';

import { ArrowRight } from 'react-bootstrap-icons';
import { Wallet2 } from 'react-bootstrap-icons';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RangeSlider from 'react-bootstrap-range-slider';
import DOMPurify from 'dompurify';

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
  const svg = generateDynaStripes();
  const listItems = tokens.map((token) =>
    <div className="token" key={token.toString()}>Token ID: {token.toString()} <ArtworkComponent tokenId={token} /> </div>
  )
  return (
    <div>{listItems}</div>
  );
}


// ----- COMPONENTS -----

class AccountComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      accountEthAddress: 'Loading..',
      accountEthBalance: 'Loading..',
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
  
    try {
      const isSenderAdmin = await contract.isSenderAdmin();
      if (isSenderAdmin != null && isSenderAdmin === true) {
        toast("You're an admin. You must have built me! You're awesome. 😘");
      } else {
        toast("You're not an admin. Life must be painful and dull.");
      }

      this.setState({
        isAdmin: isSenderAdmin,
      });  

    } catch (err) {
      handleError(err);
    }

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
      });
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

    this.state = {
      doneSuccess: false,
      stripeCount: 8,
      isVertical: true
    }

    this.stripeCountChanged = this.stripeCountChanged.bind(this);
    this.orientationChanged = this.orientationChanged.bind(this);
    this.mintAnother = this.mintAnother.bind(this);
    this.mint = this.mint.bind(this);
  }

  stripeCountChanged(event) {
    const stripeCount = event.target.value;
    console.log("Stripe count changed to: " + stripeCount);
    this.setState({
      stripeCount: stripeCount
    })
  }

  orientationChanged(event) {
    const orientation = event.target.value;
    console.log("Orientation changed to: " + orientation);
    const isVertical = orientation == "vertical";
    this.setState({
      isVertical: isVertical
    })
  }

  mintAnother() {
    this.setState({
      doneSuccess: false
    })
  }

  async mint() {
    const stripeCount = this.state.stripeCount;
    const isVertical = this.state.isVertical;

    if (stripeCount < 1 || stripeCount > 20) {
      showErrorMessage("Stripe count must be between 1 and 20.")
      return;
    }

    // const dynaStripesSvg = generateDynaStripes();
    // console.log(dynaStripesSvg);
    const contractWithSigner = await getContractWithSigner(); 
    const contract = await getContract();

    if (contractWithSigner === null) {
      showErrorMessage('Could not get signer.');
      return;
    }

    try {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Minting stripes with count: " + stripeCount + ", isVertical: " + isVertical);

      await contractWithSigner.mintStripes(stripeCount, isVertical);

      this.setState({
        doneSuccess: true
      });

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
         { this.state.doneSuccess ? <MintAnotherComponent mintAnother={this.mintAnother} /> : <MintOptions stripeCount={this.state.stripeCount} stripeCountChanged={this.stripeCountChanged} orientationChanged={this.orientationChanged} mint={this.mint} /> }
      </center>
    </Card>
    );
  }
}

class MintOptions extends React.Component {

  constructor(props) {
    super(props);
  }

  updateDuration() {

  }

  render() {
    return (
      <div>
        <form>

          <div className="mintInput">
            Number of stripes (1 - 20)<br/>
            <input type='number' min='1' max='20' value={this.props.stripeCount} onChange={ this.props.stripeCountChanged }/>
          </div>

          <div className="mintInput">
            Stripe orientation <br/>
            <input type='radio' value="vertical" id="vertical" onChange={ this.props.orientationChanged } name="orientation" defaultChecked/>
            <label for="vertical">vertical</label>
            <input type='radio' value="horizontal" id="horizontal" onChange={ this.props.orientationChanged }  name="orientation" />
            <label for="horizontal">horizontal</label>
          </div>
        </form>
        {/* <div className="mintInput">
          Animation duration Ms<br/>
          <RangeSlider
            value={this.state.duration}  
            onChange={this.updateDuration}
            min={200}
            max={2000}
            step={100}
          />
        </div> */}
        
        <Button variant="primary" onClick={this.props.mint}>Mint, baby!</Button>
      </div>
    );
  }
}

class MintAnotherComponent extends React.Component {

  constructor(props) {
    super(props);
    this.refreshPage = this.refreshPage.bind(this);
      // this.stripeCountChanged = this.stripeCountChanged.bind(this);

  }

  refreshPage() {
    window.location.reload(false);
  }

  render() {
    return (
      <div>
          <p className="success">
            Your DynaStripes have been successfully minted! Once the transaction is complete, your new artwork will appear above. Refresh to see it, or mint more DynaStripes now!
          </p>

          <Button variant="primary" onClick={this.refreshPage}>Refresh</Button>
          <Button variant="primary" onClick={this.props.mintAnother}>Mint Another</Button>
      </div>
    );
  }

}

class ArtworkComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      svg: ""
    }

    this.getSvg = this.getSvg.bind(this);
  }

  async getSvg() {
    console.log("Getting SVG for token ID: " + this.props.tokenId);

    const contract = await getContract();

    const svg = await contract.generateSvg(this.props.tokenId);
    console.log(svg);
    this.setState({
      loading: false,
      svg: svg
    });
  }

  componentDidMount() {
    this.getSvg();
  }

  render() {

    if (this.state.loading == true) {
      return (
        <div className="dynaStripesArtwork"> 
          <Spinner animation="grow" />
        </div>   
      );
    } else {
        const svgString = encodeURIComponent(this.state.svg);
        const svgDataUri = `url("data:image/svg+xml,${svgString}")`;
  
        return (
        <div className="dynaStripesArtwork" style={{background: svgDataUri}}>
          {/* <Image source={{uri: svgDataUri}}/> */}
        </div>
      );
    }
  }
}

class RandomArtworkComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      svg: ""
    }

    this.getSvg = this.getSvg.bind(this);
  }

  getSvg() {
    console.log("Getting SVG.");
    const svg = generateDynaStripes();
    console.log(svg);
    this.setState({
      loading: false,
      svg: svg
    });
  }

  componentDidMount() {
    this.getSvg();
  }

  render() {
    if (this.state.loading == true) {
      return (
        <div className="dynaStripesArtwork"> 
          <Spinner animation="grow" />
        </div>   
      );
    } else {
      const svgString = encodeURIComponent(this.state.svg);
      const svgDataUri = `url("data:image/svg+xml,${svgString}")`;
      return (
        <div className="dynaStripesArtwork" style={{background: svgDataUri}}>
          {/* <Image source={{uri: svgDataUri}}/> */}
        </div>
      );
    }
  }
}

class AboutComponent extends React.Component {

  render() {
    return (
      <Card>
        <Card.Title>More About DynaStripes</Card.Title>
        <Card.Text>
            <p>
              DynaStripes is an NFT art project created by the colour-blind, colour-obsessed visual artist, <a className="externalLink" href="http://www.volstrate.com" target="_blank">volstrate</a>. DynaStripes represents the on-chain, generative evolution of volstrate's earlier explorations into NFT art.
            </p>
            <p>
              The DynaStripes project has been heavily influenced by existing on-chain, generative art projects like <a className="externalLink" href="https://www.larvalabs.com/autoglyphs" target="_blank">Autoglyphs</a>, <a className="externalLink" href="https://avastars.io/" target="_blank">Avastars</a>, and <a className="externalLink" href="https://www.artblocks.io/" target="_blank">ArtBlocks</a>, but the most compelling source of inspiration has proven to be Simon de la Rouviere's <a className="externalLink" href="https://neolastics.com/" target="_blank">Neolastics</a> and also his writings, particularly this <a className="externalLink" href='https://blog.simondlr.com/posts/flavours-of-on-chain-svg-nfts-on-ethereum' target="_blank">fascinating piece.</a>
            </p>
        </Card.Text>
      </Card>
    );
  }
}

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

      // TODO: what if more than 1 accout is returned?
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
          <NavDropdown.Item href={this.state.etherscanUrl} target="_blank"><img src={ether} className='navDropdownIcon' />{ this.state.accountEthBalance }</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href={this.state.etherscanUrl}>Logout</NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

}

class DynaNav extends React.Component {
  render() {
    return (
        <Navbar bg="light" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand href="#home">DynaStripes</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#recent">Recently Minted</Nav.Link>
                <Nav.Link href="#mint">Mint!</Nav.Link>
                <Nav.Link href="#stripes">Your Stripes</Nav.Link>
                <Nav.Link href="#admin">How to</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
              </Nav>
              <Nav>
                <DynaNavLoginDropdown />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
  }
}

class DynaHeaderCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <Card id="mainCard">
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
        </Card>

    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
  }

  update() {
    console.log("Updating..");
    this.setState({});
  }
  
  render() {

    const svgString = encodeURIComponent(generateDynaStripes());
    const svgDataUri = `url("data:image/svg+xml,${svgString}")`;

    return (
      <div className="App">
        <DynaNav />
        <header className="App-header"  style={{background: svgDataUri}} onClick={this.update}>
          <DynaHeaderCard />
        </header>

        <div id="mainContent">

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          
          {/* <AccountComponent /> */}

          <YourTokensComponent />

          <MintComponent />

          <AboutComponent />

          <ContractAdminComponent />
        </div>
      </div>

    );
  
  }
}

export default App;
 