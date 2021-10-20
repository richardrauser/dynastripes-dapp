import React from 'react';
import DynaSpan from '../components/DynaSpan';

import { generateRandomStripesDataUri } from '../dynastripes.js';

class FeedbackPage extends React.Component {

    render() {
      const svgDataUri = generateRandomStripesDataUri();

      return (
        <div className="mainContent"  style={{background: svgDataUri}}>
          <div className="content">
            <h1>Feedback on <span className="dyna">DynaStripes</span></h1>

         
            <div className="deepContent">
              <p> 
                This is a <a className="externalLink" href="https://en.wikipedia.org/wiki/Software_release_life_cycle#Beta" target="_blank" rel="noreferrer">beta</a> version of the <DynaSpan/> <a className="externalLink" href="https://en.wikipedia.org/wiki/Decentralized_applicationdApp" target="_blank" rel="noreferrer">dApp</a> running on the Rinkeby testnet. Any feedback so that improvements can be made before going live on the Ethereum mainnnet would be greatly appreciated! 😁
                </p>
            <h5>
              Things that would be useful to get feedback on:
            </h5>
            <ol>
              <li>Ease of use of this website</li>
              <li>Ease of the NFT purchase process</li>
              <li>Mint interface options. Enough? Too many options? Desired options?</li>
              <li>Design of this website</li>
              <li>Are explanations clear enough?</li>
            </ol>

            <form name="contact" method="post">
            <input type="hidden" name="form-name" value="contact" />
              <p>
                <label>Email (optional): <input type="email" name="email"/></label>
              </p>
              <p>
                <label>Message: <textarea name="message"></textarea></label>
              </p>
              <p>
                <button type="submit">Send</button>
              </p>
            </form>
          </div>
            You can also email to <a className="externalLink" href="mail:volstrate@gmail.com">volstrate@gmail.com</a>.
          </div>
        </div>
      );
    }
  }

export default FeedbackPage;