import React from 'react';

import { generateRandomStripesDataUri } from '../dynastripes.js';

class FeedbackPage extends React.Component {

    render() {
      const svgDataUri = generateRandomStripesDataUri();

      return (
        <div className="mainContent"  style={{background: svgDataUri}}>
          <div className="content">
            <h1>Feedback on <span className="dyna">DynaStripes</span></h1>

            This is just a beta version of <span className="dyna">DynaStripes</span> running on the Rinkeby Ethereum network. If you'be got thoughts of any sort, it would be great to hear them. 😎

            <div className="deepContent">
            <ol>
              Things that would be useful to get feedback on:
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