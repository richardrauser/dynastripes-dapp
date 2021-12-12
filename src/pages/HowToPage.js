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
          <h1>How to acquire a <DynaSpan/> NFT</h1>
          <div className="deepContent">
          <p>
              If you're new to NFTs, this is a good place to get started. While there are instructions here for both desktop computers (e.g. laptops, PCs, etc) and mobile phones, <b>most people will find it easier from a desktop browser rather than mobile. </b> The mobile experience of web3 is still a bit crude!
          </p>
          <p>
              In order to acquire a <DynaSpan/> artwork, you'll need some MATIC tokens on the Polygon Mumbai testnet. Polygon is a complementary blockchain to Ethereum that is much, much cheaper, and way faster. Creating a <DynaSpan/> NFT will cost you nothing as this is a beta test version of <DynaSpan/>.
          </p>
          <Tabs defaultActiveKey={ selectedTab } id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="desktop" title="Desktop">
            <h3>
                Install Metamask & configure Mumbai network
                </h3>
                <ol>
                  <li>Visit <MetaMaskLink /> in your web browser and download the MetaMask wallet <a className="externalLink" href="https://en.wikipedia.org/wiki/Browser_extension" target="_blank" rel="noreferrer">browser extension</a>. </li>
                  <ul>
                      <li>Unfortunately MetaMask is not supported for Safari on MacOS. 😢 Try the <a className="externalLink" href="https://www.google.com/chrome/Chrome" target="_blank" rel="noreferrer">Chrome</a> browser. It's quick and easy to install.</li>
                    </ul>    
                  <li>Once installed, open MetaMask by tapping the little fox icon in your browser's toolbar (usually at top next to the URL bar). </li>
                  <li>Add Polygon's Mumbai Testnet to MetaMask by <ChangeNetworkLink/>.</li>
                  <li>Create a new account by following the instructions in MetaMask.</li> 
                </ol>

                <h3>Acquire some MATIC
                </h3>
                <p> You'll need to get some MATIC on the Polygon network in order to acquire a DynaStripes artwork. This wont cost you anything as this is only a beta test.
                </p>
                <ol>
                  <li>Open MetaMask by tapping the fox icon in your browser's toolbar. </li> 
                  <li>If not already on Polygon's Mumbai Testnet in MetaMask, switch to it by <ChangeNetworkLink/>.</li>
                  <li>Use the <a className="externalLink" href="https://faucet.polygon.technology/" target="_blank" rel="noreferrer">Polygon Faucet</a> to send some test MATIC tokens to your wallet for free. Simply copy your wallet's address from MetaMask and paste into the faucet website. </li> 
                </ol>
                
                <h3>Return to <DynaSpan/>
                </h3>
                Time to start having some fun! 😁
                
                <ol>
                  <li>Browse to <DynaSpan link={true}/> in which ever web browser you installed <MetaMaskLink/>. </li>
                  <li>Ensure you're connected to the Polygon Mumbai testnet in Metamask.</li>
                  <li>Hit the Connect Wallet button at the top right of the <DynaSpan/> site. If you don't see it or an Install MetaMask button apears, refresh your browser.</li>
                  <li>Follow the MetaMask prompts to connect your wallet to <DynaSpan/>.</li>
                  <li>Browse to the <Link to="/mint">Mint page</Link> to create a new NFT!</li> 
                </ol>
            </Tab>
            <Tab eventKey="mobile" title="Mobile">
            <h3>
            Install Metamask & configure Mumbai network
                </h3>
                <ol>
                  <li>Visit <MetaMaskLink /> and download the MetaMask app. </li>
                  <li>Once installed, open the MetaMask app. </li>
                  <li>Add Polygon's Mumbai Testnet to MetaMask by <ChangeNetworkLink/>.</li>
                  <li>Create a new account by following the instructions in MetaMask.</li> 
                </ol>

                <h3>Acquire some MATIC
                </h3>
                <p> You'll need to get some MATIC on the Polygon network in order to acquire a DynaStripes artwork. This wont cost you anything as this is only a beta test.
                </p>
                <ol>
                  <li>Open the MetaMask app on your mobile. </li> 
                  <li>If not already on Polygon's Mumbai Testnet in MetaMask, switch to it by <ChangeNetworkLink/>.</li>
                  <li>Use the <a className="externalLink" href="https://faucet.polygon.technology/" target="_blank" rel="noreferrer">Polygon Faucet</a> to send some test MATIC tokens to your wallet for free. Simply copy your wallet's address from MetaMask and paste into the faucet website. </li> 
                </ol>
                
                <h3>Return to <DynaSpan/>
                </h3>
                Time to start having some fun! 😁
                
                <ol>
                  <li>Open the MetaMask app, tap the menu button at top left and select Browser. Then browse to <DynaSpan link={true}/>. </li>
                  <li>Ensure you're connected to the Polygon Mumbai testnet in Metamask.</li>
                  <li>Hit the Connect Wallet button at the top right of the <DynaSpan/> site.</li>
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