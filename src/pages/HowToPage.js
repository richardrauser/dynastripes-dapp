import React from 'react';

import { generateRandomStripesDataUri } from '../dynastripes.js';

class HowToPage extends React.Component {

    render() {
      const svgDataUri = generateRandomStripesDataUri();

      return (
        <div className="mainContent"  style={{background: svgDataUri}}>
          <div className="content">
            <h1>How to buy a <span className="dyna">DynaStripes</span>NFT</h1>
            It's not easy! Purchasing NFTs is not exactly straight-forward. This guide spells out how to buy a <span className="dyna">DynaStripes</span> NFT.
            <div className="deepContent">
                  <p>
                  </p>

                  <h3>
                  Setup Metamask
                  </h3>

                  <ol>
                    <li>TODO.</li> 
                    <li>TODO. </li>
                  </ol>

                  <h3>Buy some ETH
                  </h3>
                  <p> TODO.
                  </p>
           </div>


            Still having trouble? Shoot an email to <a className="externalLink" href="mail:volstrate@gmail.com">volstrate@gmail.com</a>.
            </div>
        </div>
      );
    }
  }

export default HowToPage;