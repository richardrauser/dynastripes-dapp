import generateDynaStripes from './dynastripes.js';
import logo from './images/logo.svg';
import dynaSample from './images/dynaStripesBackground.svg';

import { ReactComponent as DynaStripesComponent } from './images/dynaStripesBackground.svg';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
 
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react';
import {Fragment} from 'react'

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import ArtworkComponent from './components/ArtworkComponent';
import AboutComponent from './components/AboutComponent';
import ContractAdminComponent from './components/ContractAdminComponent';
import DynaHeaderCard from './components/DynaHeaderCard';
import DynaNav from './components/DynaNav';
import MintComponent from './components/MintComponent';

import { getContract, getContractWithSigner } from './utils/blockchain.js';
import { handleError } from './utils/error';

// ----- UI FUNCTIONS -----

  
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
        <Card.Title>Your <span className="dyna">DynaStripes</span> NFTs</Card.Title>
        <TokenList tokens= { tokenIds } />
      </Card>
      );  
    }
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
 