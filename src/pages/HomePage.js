import React from 'react';
import Button from 'react-bootstrap/Button';

import sample1 from '../images/dynasample2.svg';
import sample2 from '../images/dynasample3.svg';
import sample3 from '../images/dynasample8.svg';
import sample4 from '../images/dynasample6.svg';
import sample5 from '../images/dynasample9.svg';
import sample6 from '../images/dynasample7.svg';

import {
  Link
} from "react-router-dom";

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
                by <a class="volstrate" href="http://www.volstrate.com" target="_blank">volstrate</a>
              </div>


            </div>
          </div>
      );
    }
  }
  
  export default HomePage;