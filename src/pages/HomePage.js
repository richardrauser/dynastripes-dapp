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
                Coming soon.
              </div>		
              <div class ='placeholderAttribution'>
                by <a class="volstrate" href="http://www.volstrate.com" target="_blank" rel="noreferrer">volstrate</a>
              </div>


            </div>
          </div>
      );
    }
  }
  
  export default HomePage;