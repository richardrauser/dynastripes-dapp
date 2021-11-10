import React from 'react';

import { Tab, Tabs } from 'react-bootstrap';

import { isMobile } from 'react-device-detect';

import MetaMaskLink from '../components/MetaMaskLink';
import DynaSpan from '../components/DynaSpan';
import { generateRandomStripesDataUri } from '../utils/DynaStripes.js';
import { Link } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';

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
            <Tabs defaultActiveKey={ selectedTab } id="uncontrolled-tab-example" className="mb-3">
              <Tab eventKey="desktop" title="Desktop">
              <h3>
                  Install Metamask, an ETH wallet
                  </h3>
                  <ol>
                    <li>Visit <MetaMaskLink /> in your web browser and download the MetaMask wallet <a className="externalLink" href="https://en.wikipedia.org/wiki/Browser_extension" target="_blank" rel="noreferrer">browser extension</a>. </li>
                    <ul>
                        <li>Unfortunately MetaMask is not supported for Safari on MacOS. 😢 Try the <a className="externalLink" href="https://www.google.com/chrome/Chrome" target="_blank" rel="noreferrer">Chrome</a> browser. It's quick and easy to install.</li>
                      </ul>    
                    <li>Once installed, open MetaMask by tapping the little fox icon in your browser's toolbar (usually at top next to the URL bar). </li>
                    <li>Create a new account by following the instructions in MetaMask.</li> 
                  </ol>

                  <h3>Acquire some ETH
                  </h3>
                  <p> You'll need to purchase some Ethereum in order to acquire a DynaStripes artwork. Network fees are currently very high and represent that vast bulk of the acquisition cost.
                  </p>
                  <ol>
                    <li>Open MetaMask by tapping the fox icon in your browser's toolbar. </li> 
                    <li>Ensure you're connected to the Ethereum Mainnet.</li> 
                    <li>Hit the Buy button in MetaMask and follow the instructions there. </li> 
                    <li>You can also purchase Ethereum on <a className="externalLink" href="https://www.coinbase.com" target="_blank" rel="noreferrer">Coinbase</a>, <a className="externalLink" href="https://www.binance.com" target="_blank" rel="noreferrer">Binance</a>, <a className="externalLink" href="https://www.ftx.com" target="_blank" rel="noreferrer">FTX</a>, or some other exchange and send it to your MetaMask wallet. </li> 
                  </ol>
                  
                  <h3>Return to <DynaSpan/>
                  </h3>
                  Time to start having some fun! 😁
                  
                  <ol>
                    <li>Browse to <DynaSpan link={true}/> in which ever web browser you installed <MetaMaskLink/>. </li>
                    <li>Hit the Connect Wallet button at the top right of the <DynaSpan/> site. If you don't see it or an Install MetaMask button apears, refresh your browser.</li>
                    <li>Follow the MetaMask prompts to connect your ETH wallet to <DynaSpan/>.</li>
                    <li>Browse to the <Link to="/mint">Mint page</Link> to create a new NFT!</li> 
                  </ol>
              </Tab>
              <Tab eventKey="mobile" title="Mobile">
              <h3>
                  Install Metamask, an ETH wallet
                  </h3>
                  <ol>
                    <li>Visit <MetaMaskLink /> and download the MetaMask app. </li>
                    <li>Once installed, open the MetaMask app. </li>
                    <li>Create a new account by following the instructions in MetaMask.</li> 
                  </ol>

                  <h3>Acquire some ETH
                  </h3>
                  <p> You'll need to purchase some Ethereum in order to acquire a DynaStripes artwork. Network fees are currently very high and represent that vast bulk of the acquisition cost.
                  </p>
                  <ol>
                    <li>Open the MetaMask app on your mobile. </li> 
                    <li>Ensure you're connected to the Ethereum Mainnet.</li> 
                    <li>Hit the Buy button in MetaMask and follow the instructions there. </li> 
                    <li>You can also purchase Ethereum on <a className="externalLink" href="https://www.coinbase.com" target="_blank" rel="noreferrer">Coinbase</a>, <a className="externalLink" href="https://www.binance.com" target="_blank" rel="noreferrer">Binance</a>, <a className="externalLink" href="https://www.ftx.com" target="_blank" rel="noreferrer">FTX</a>, or some other exchange and send it to your MetaMask wallet. </li> 
                  </ol>
                  
                  <h3>Return to <DynaSpan/>
                  </h3>
                  Time to start having some fun! 😁
                  
                  <ol>
                    <li>Open the MetaMask app, tap the menu button at top left and select Browser. Then browse to <DynaSpan link={true}/>. </li>
                    <li>Hit the Connect Wallet button at the top right of the <DynaSpan/> site.</li>
                    <li>Follow the MetaMask prompts to connect your ETH wallet to <DynaSpan/>.</li>
                    <li>Browse to the <Link to="/mint">Mint page</Link> to create a new NFT!</li> 
                  </ol>
              </Tab>
            </Tabs>

           </div>


            Having trouble? Get in touch via the links below.
            <SocialLinks/>

            </div>
        </div>
      );
    }
  }

export default HowToPage;