import React from 'react';
import SocialLinks from '../components/SocialLinks.js';

import { generatePlaceholderStripesDataUri } from '../dynastripes.js';
 
class HomePage extends React.Component {
    constructor(props) {
      super(props);
      
      this.update = this.update.bind(this);
    }
    
    update() {
      console.log("Updating Stripes..");
      this.setState({});
    }
  
  
    render() {
      const svgDataUri = generatePlaceholderStripesDataUri();
      
  
      return (
        <div className="mainContent"  style={{backgroundImage: svgDataUri, backgroundColor: "#FFFFFF"}} onClick={this.update}>

            <div className="content">
              <div className='placeholderTitle'>
                DynaStripes
              </div>
              <div id='placeholderContent'>
                A first-in-kind generative, on-chain NFT art project.
              </div>		
              <div id='placeholderContent'>
              <a className="basicLink" href="http://mumbai.dynastripes.com" target="_blank" rel="noreferrer">Public beta now live on Polygon Mumbai testnet!</a>
              </div>		
              <div id='placeholderContent'>
                Mainnet launch early 2022.
              </div>		
              😎<br/>
              <SocialLinks/>
              {/* <div class ='placeholderAttribution'>
                <a class="volstrate basicLink" href="https://twitter.com/RichardRauser" target="_blank" rel="noreferrer">RR</a>
              </div> */}


            </div>
          </div>
      );
    }
  }
  
  export default HomePage;