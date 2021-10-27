import React from 'react';

import MetaMaskLink from '../components/MetaMaskLink';
import DynaSpan from '../components/DynaSpan';
import { generateRandomStripesDataUri } from '../dynastripes.js';
import { Link } from 'react-router-dom';

class HowToPage extends React.Component {

    render() {
      const svgDataUri = generateRandomStripesDataUri();

      return (
        <div className="mainContent"  style={{background: svgDataUri}}>
          <div className="content">
            <h1>How to acquire a <DynaSpan/> NFT</h1>
            <div className="deepContent">
            <p>
               This is a <a className="externalLink" href="https://en.wikipedia.org/wiki/Software_release_life_cycle#Beta" target="_blank" rel="noreferrer">beta</a> version of the <DynaSpan/> <a className="externalLink" href="https://en.wikipedia.org/wiki/Decentralized_application" target="_blank" rel="noreferrer">dApp</a> running on the Rinkeby test network, so you will not be using real ETH/$/£. While there are instructions here for both desktop computers (e.g. laptops, PCs, etc) and mobile phones, <b>most people will find it easier from a desktop browser rather than mobile. </b> The mobile experience of web3 is still a bit crude!
            </p>

                  <h3>
                  Install Metamask, an ETH wallet
                  </h3>
                  <ol>
                    <li>Visit <MetaMaskLink /> and download the MetaMask wallet. </li>
                    <ul>
                        <li>On desktop, It will be a <a className="externalLink" href="https://en.wikipedia.org/wiki/Browser_extension" target="_blank" rel="noreferrer">browser extension</a>.</li>
                        <li>On mobile, it is an app you need to download from the app store. </li>
                        <li> The <MetaMaskLink /> website should detect this and direct you accordingly.</li>
                        <li>Unfortunately MetaMask is not supported for Safari on MacOS. 😢 Try the <a className="externalLink" href="https://www.google.com/chrome/Chrome" target="_blank" rel="noreferrer">Chrome</a> browser. It's quick and easy to install.</li>
                      </ul>    
                    <li>Once installed, open MetaMask. </li>
                    <ul>
                        <li>On desktop, tap the little fox icon in your browser's toolbar (usually at top next to the URL bar). </li>
                        <li>On mobile, open the MetaMask app you downloaded in the previous step. </li>
                      </ul>    
                    <li>Create a new account by following the instructions in MetaMask.</li> 
                    <li>Connect your wallet to the Rinkeby network. Rinkeby is a test network where you will not be spending real funds.</li>
                      <ul>
                        <li>On desktop, tap the "Ethereum Main Network" text at the top of the MetaMask window and select "Rinkeby Test Network". </li>
                        <li>On mobile, tap the top left menu button in the MetaMask app and select "Wallet". Then tap the "Ethereum Main Network" text at the top and select "Rinkeby Test Network". </li>
                      </ul>    
                  </ol>

                  <h3>Acquire some ETH
                  </h3>
                  <p> Rinkeby is a test network and so you can't spend real money on ETH. You can, however, use a "faucet" to pay out some ETH to your wallet for free.
                  </p>
                  <ol>
                  <li>If using a desktop browser, ensure MetaMask is unlocked. To check this, open MetaMask by tapping the fox icon in your browser's toolbar. </li> 
                  <li>Ensure you've selected Rinkeby as your network in MetaMask as per the final step above.</li> 
                    <li> Copy your wallet address from MetaMask: </li>
                    <ul>
                      <li>On desktop, open MetaMask by tapping the Metamask logo (the fox in your browser toolbar) and then tap your account name or address under the network selector. </li>
                      <li>On mobile, tap the top left menu button in the MetaMask mobile app, select Wallet, then tap your address (starts with "0x"). It appears under your account name.</li>
                    </ul>    
                    <li>Visit one of the following ETH faucet sites and request some ETH:</li>
                    <ul>
                      <li>On desktop or mobile, visit <a className="externalLink" href="https://rinkeby-faucet.com/" target="_blank" rel="noreferrer">Rinkeby faucet</a>. </li>
                      <li>In a desktop browser, try <a className="externalLink" href="https://app.mycrypto.com/faucet" target="_blank" rel="noreferrer">MyCrypto faucet</a> which will pay out more.</li>
                      <li>On desktop or mobile, visit <a className="externalLink" href="https://faucet.rinkeby.io/" target="_blank" rel="noreferrer">Rinkeby Authenticated Faucet</a>. This one pays out the most, however requires authentication and can be unreliable.</li>
                    </ul>    
                    <li>Follow the steps for whatever faucet you chose. </li> 
                    <li>Congratulations! you now have some ETH in your wallet. It may take a second to appear. Open your MetaMask wallet and your ETH balance will eventually update.</li>
                  </ol>
                  Note:
                  <ul>
                    <li>You may wish to repeat a few times to collect more ETH.</li>
                  </ul>
                  
                  <h3>Return to <DynaSpan/>
                  </h3>
                  You're ready to start having some fun! 😁
                  
                  <ol>
                    <li>Return to this website in your browser. </li>
                    <ul>
                      <li>On desktop, simply browse to <DynaSpan link={true}/> in which ever browser you installed <MetaMaskLink/>. </li>
                      <li>On mobile, open the MetaMask app, tap the menu button at top left and select Browser. Then browse to <DynaSpan link={true}/>.</li>
                    </ul>    
                    <li>Hit the Connect Wallet button at the top right of the <DynaSpan/> site. If you don't see it or an Install MetaMask button apears, refresh your browser.</li>
                    <li>Follow the MetaMask prompts to connect your ETH wallet to <DynaSpan/>.</li>
                    <li>Browse to the <Link to="/mint">Mint page</Link> to create a new NFT!</li> 
                  </ol>
           </div>


            Having trouble? Shoot an email to <a className="externalLink" href="mail:volstrate@gmail.com">volstrate@gmail.com</a>
            </div>
        </div>
      );
    }
  }

export default HowToPage;