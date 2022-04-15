import React from 'react';

import { Tab, Tabs } from 'react-bootstrap';

import { isMobile } from 'react-device-detect';

import MetaMaskLink from '../components/MetaMaskLink';
import DynaSpan from '../components/DynaSpan';
import { generateRandomStripesDataUri } from '../utils/DynaStripes.js';
import { Link } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';
import ChangeNetworkLink from '../components/ChangeNetworkLink';

class HowToPage extends React.Component {

  render() {
    const svgDataUri = generateRandomStripesDataUri();
    const selectedTab = isMobile ? "mobile" : "desktop";

    return (
      <div className="mainContent"  style={{background: svgDataUri}}>
        <div className="content">
          <h1>How to buy a <DynaSpan/> NFT</h1>
          <div className="deepContent">
          <p>
              If you're new to NFTs, this is a good place to get started. While there are instructions here for both desktop computers (e.g. laptops, PCs, etc) and mobile phones, <b>most people will find it easier from a desktop browser rather than mobile. </b> The mobile experience of web3 is still a bit crude!
          </p>
          <p>
              In order to buy a <DynaSpan/> artwork, you'll need some MATIC tokens on the Polygon network. Polygon is a complementary blockchain to Ethereum that is much, much cheaper, and way faster. 
          </p>
          <Tabs defaultActiveKey={ selectedTab } id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="desktop" title="Desktop">
            <h3>
                Install Metamask & configure Polygon network
                </h3>
                <ol>
                  <li>Visit <MetaMaskLink /> in your web browser and download the MetaMask wallet <a className="externalLink" href="https://en.wikipedia.org/wiki/Browser_extension" target="_blank" rel="noreferrer">browser extension</a>. </li>
                  <ul>
                      <li>Unfortunately MetaMask is not supported for Safari on MacOS. 😢 Try the <a className="externalLink" href="https://www.google.com/chrome/Chrome" target="_blank" rel="noreferrer">Chrome</a> browser. It's quick and easy to install.</li>
                    </ul>    
                  <li>Once installed, open MetaMask by tapping the little fox icon in your browser's toolbar (usually at top next to the URL bar). </li>
                  <li>Add Polygon Network to MetaMask by <ChangeNetworkLink/>.</li>
                  <li>If you have an account already in Metamask, you can use this immediately on Polygon. If not, create a new account by following the instructions in MetaMask.</li> 
                </ol>

                <h3>Buy some MATIC
                </h3>
                <p> You'll need to get some MATIC on the Polygon network in order to acquire a DynaStripes artwork.
                </p>
                <ol>
                  <li>Open MetaMask by tapping the fox icon in your browser's toolbar. </li> 
                  <li>If not already on Polygon network in MetaMask, switch to it by <ChangeNetworkLink/>.</li>
                  <li> Copy your wallet address from MetaMask by tapping your account name or address under the network selector. </li> 
                  <li>Buy some MATIC from within MetaMask, or transfer some in from an exchange. </li> 
                </ol>
                
                <h3>Return to <DynaSpan/>
                </h3>
                Time to start having some fun! 😁
                
                <ol>
                  <li>Browse to <DynaSpan link={true}/> in which ever web browser you installed <MetaMaskLink/>. </li>
                  <li>Ensure you're connected to the Polygon network in Metamask.</li>
                  <li>Hit the Connect Wallet button at the top right of the <DynaSpan/> site. If you don't see it or an Install MetaMask button apears, refresh your browser.</li>
                  <li>Follow the MetaMask prompts to connect your wallet to <DynaSpan/>.</li>
                  <li>Browse to the <Link to="/mint">Mint page</Link> to create a new NFT!</li> 
                </ol>
            </Tab>
            <Tab eventKey="mobile" title="Mobile">
            <h3>
            Install Metamask & configure Polygon network
                </h3>
                <ol>
                  <li>Visit <MetaMaskLink /> and download the MetaMask app. </li>
                  <li>Once installed, open the MetaMask app. </li>
                  <li>Add Polygon network to MetaMask by <ChangeNetworkLink/>.</li>
                  <li>If you have an account already in Metamask, you can use this immediately on Polygon. If not, create a new account by following the instructions in MetaMask.</li> 
                </ol>

                <h3>Buy some MATIC
                </h3>
                <p> You'll need to get some MATIC on the Polygon network in order to acquire a DynaStripes artwork. 
                </p>
                <ol>
                  <li>Open the MetaMask app on your mobile. </li> 
                  <li>If not already on Polygon network in MetaMask, switch to it by <ChangeNetworkLink/>.</li>
                  <li>Buy some MATIC from within MetaMask, or transfer some in from an exchange. </li> 
                </ol>
                
                <h3>Return to <DynaSpan/>
                </h3>
                Time to start having some fun! 😁
                
                <ol>
                  <li>Open the MetaMask app, tap the menu button at top left and select Browser. Then browse to <DynaSpan link={true}/>. </li>
                  <li>Ensure you're connected to the Polygon network in Metamask.</li>
                  <li>Tap the menu button at the top right of the <DynaSpan/> site, and then tap the Connect Wallet button at the bottom of the menu.</li>
                  <li>Follow the MetaMask prompts to connect your wallet to <DynaSpan/>.</li>
                  <li>Browse to the <Link to="/mint">Mint page</Link> to create a new NFT!</li> 
                </ol>
            </Tab>
          </Tabs>

          </div>


          Having trouble? Get in touch via the links below.<br/>
          <SocialLinks/>

          </div>
      </div>
    );
  }
}

export default HowToPage;