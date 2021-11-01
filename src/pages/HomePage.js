import React from 'react';

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
              <a className="basicLink" href="http://rinkeby.dynastripes.com" target="_blank" rel="noreferrer">Public beta now live on rinkeby testnet</a>
              <br></br> 😎
              </div>		
              <div class ='placeholderAttribution'>
                by <a class="volstrate basicLink" href="http://www.volstrate.com" target="_blank" rel="noreferrer">volstrate</a>
              </div>


            </div>
          </div>
      );
    }
  }
  
  export default HomePage;