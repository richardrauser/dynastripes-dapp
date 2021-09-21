import React from 'react';
import Card from 'react-bootstrap/Card';

import { toast } from 'react-toastify';

import MintOptions from './MintOptions';
import MintAnotherComponent from './MintAnotherComponent';

import { getContract, getContractWithSigner } from '../utils/blockchain';
import { showErrorMessage } from '../utils/ui.js';
import { handleError } from '../utils/error';

import generateDynaStripes from '../dynastripes.js';

class MintComponent extends React.Component {

    constructor(props) {
      super(props);
  
      console.log("MINT COMPONET CONSTRUCTOR");
  
      this.state = {
        doneSuccess: false,
        rotationDegrees: 0,
        stripeWidth: 50,
        speed: 50,
        palette: 50,
        isVertical: true
      }
  
      this.rotationDegreesChanged = this.rotationDegreesChanged.bind(this);
      this.stripeWidthChanged = this.stripeWidthChanged.bind(this);
      this.speedChanged = this.speedChanged.bind(this);
      this.paletteChanged = this.paletteChanged.bind(this);
      this.mintAnother = this.mintAnother.bind(this);
      this.mint = this.mint.bind(this);
    }
  
    rotationDegreesChanged(event) {
      const degrees = event.target.value;
      console.log("Rotation degrees changed to: " + degrees);
      this.setState({
        rotationDegrees: degrees,
      })
    }
  
    stripeWidthChanged(event) {
      const stripeWidth = event.target.value;
      console.log("Stripe width changed to: " + stripeWidth);
      this.setState({
        stripeWidth: stripeWidth
      })
    }
  
    paletteChanged(event) {
      const palette = event.target.value;
      console.log("Palette changed to: " + palette);
      this.setState({
        palette: palette,
      })
    }
  
    speedChanged(event) {
      const speed = event.target.value;
      console.log("Speed changed to: " + speed);
      this.setState({
        speed: speed,
      })
    }
    
    mintAnother() {
      this.setState({
        doneSuccess: false
      })
    }
  
    async mint() {
      const rotationDegrees = this.state.rotationDegrees;
      const stripeWidth = this.state.stripeWidth;
      const palette = this.state.palette;
      const speed = this.state.speed;
  
      if (stripeWidth < 0 || stripeWidth > 100) {
        showErrorMessage("Stripe count must be between 0 and 100.")
        return;
      }
      // TODO: validate other params
  
      const contractWithSigner = await getContractWithSigner(); 
      const contract = await getContract();
  
      if (contractWithSigner === null) {
        showErrorMessage('Could not get signer.');
        return;
      }
  
      try {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Minting stripes with degrees: " + rotationDegrees + ", width: " + stripeWidth);
        
        await contractWithSigner.mintStripes(rotationDegrees, stripeWidth, palette, speed);
  
        this.setState({
          doneSuccess: true
        });
  
        toast.success("Successfully minted your DynaStripes NFT!");
      } catch (err) {
        handleError(err);
      }
    }
  
    render() {
      const svgString = encodeURIComponent(generateDynaStripes());
      const svgDataUri = `url("data:image/svg+xml,${svgString}")`;

      return (
        <div className="mainContent"  style={{background: svgDataUri}}>
          <Card>
            <Card.Title><h1>Mint your own <span className="dyna">DynaStripes</span> NFT</h1></Card.Title>
            <center>
              { this.state.doneSuccess ? <MintAnotherComponent mintAnother={this.mintAnother} /> : <MintOptions  rotationDegrees={this.state.rotationDegrees} stripeWidth={this.state.stripeWidth} palette={this.state.palette} speed={this.state.speed} rotationDegreesChanged={this.rotationDegreesChanged} stripeWidthChanged={this.stripeWidthChanged} orientationChanged={this.orientationChanged} paletteChanged={this.paletteChanged} speedChanged={this.speedChanged} mint={this.mint} /> }
            </center>
          </Card>
        </div>
      );
    }
  }
  

  export default MintComponent;