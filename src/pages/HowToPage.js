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
              This is a <a className="externalLink" href="https://en.wikipedia.org/wiki/Software_release_life_cycle#Beta" target="_blank" rel="noreferrer">beta</a> version of the <DynaSpan/> <a className="externalLink" href="https://en.wikipedia.org/wiki/Decentralized_application" target="_blank" rel="noreferrer">dApp</a> running on the Rinkeby test network, so you will not be using real ETH/$/£.
            </p>

                  <h3>
                  Install Metamask, an ETH wallet
                  </h3>
                    Metamask is the leading Ethereum wallet for browsing the decentralised web.
                  <ol>
                    <li>Visit <MetaMaskLink /> and download the MetaMask wallet. It will be a <a className="externalLink" href="https://en.wikipedia.org/wiki/Browser_extension" target="_blank" rel="noreferrer">browser extension</a> if you're accessing this from a desktop computer, or a mobile app if using a smartphone. The MetaMask website should detect this. Most people will find it easier from a desktop browser rather than mobile. The mobile experience of the decentralised web is still a bit crude!</li> 
                    <li>Unfortnately MetaMask is not supported for Safari on MacOS. 😢 Try the <a className="externalLink" href="https://www.google.com/chrome/Chrome" target="_blank" rel="noreferrer">Chrome</a> browser. You'll love it. It's quick and easy to install.</li>
                    <li>Once installed, open MetaMask. On Chrome, it'll appear as a little fox icon in your extensions toolbar up by the URL bar. </li>
                    <li>Create a new account by following the instructions in MetaMask.</li> 
                    <li>Connect your wallet to the Rinkeby network by tapping the text at top that says "Ethereum Main Network" and then selecting "Rinkeby Test Network". Rinkeby is a test network where you will not be spending real funds.</li>
                  </ol>

                  <h3>Acquire some ETH
                  </h3>
                  <p> The Rinkeby network is a test network and so you can't spend real money on ETH. You can, however, use a "faucet" to pay out some ETH to your wallet!
                  </p>
                  <ol>
                    <li>Ensure you've selected Rinkeby as your network in MetaMask as per the 3rd step above.</li> 
                    <li>Visit <a className="externalLink" href="https://app.mycrypto.com/faucet" target="_blank" rel="noreferrer">MyCrypto faucet</a>.</li>
                    <li>Select your Rinkeby account in the Recipient dropdown. MyCrypto should detect your account. Hit the Request Assets button.</li> 
                    <li>A <a className="externalLink" href="https://en.wikipedia.org/wiki/CAPTCHA" target="_blank" rel="noreferrer">CATCHPA</a> will appear. Enter it and hit submit.</li>
                    <li>Congratulations! you now have some ETH in your wallet. It may take a second to appear. Open your MetaMask wallet and your ETH balance will eventually update.</li>
                  </ol>
                  Notes:
                  <ul>
                    <li>The MyCrypto Faucet only pays out 0.01 ETH at a time to prevent abuse, so refresh the page and do it a few more times if you'd like to collect more ETH.</li>
                    <li>You can request greater amounts of ETH from the <a className="externalLink" href="https://faucet.rinkeby.io/" target="_blank" rel="noreferrer">Rinkeby Authenticated Faucet</a>, however it is unreliable.</li>
                  </ul>



                  <h3>Return to <DynaSpan/>
                  </h3>
                  You're ready to start having some fun! 😁
                  
                  <ol>
                    <li>Return to this website in your browser. If on mobile, you'll need to use the browser in the MetaMask app.</li>
                    <li>Hit the Connect Wallet button at the top right of <DynaSpan/>. If you don't see it or an Install MetaMask button apearrs, refresh your browser.</li>
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