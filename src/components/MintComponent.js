import React from 'react';

import { toast } from 'react-toastify';

import MintOptions from './MintOptions';
import MintAnotherComponent from './MintAnotherComponent';

import { getContractWithSigner } from '../utils/blockchain';
import { showErrorMessage } from '../utils/ui.js';
import { handleError } from '../utils/error';

import generateDynaStripes from '../dynastripes.js';

class MintComponent extends React.Component {

    constructor(props) {
      super(props);

      const randomSeed = this.randomSeed();
      this.state = {
        doneSuccess: false,
        randomSeed: randomSeed,
        rotationRange: [0, 180],
        widthRange: [0, 255],
        paletteRange: [0, 255],
        speedRange: [20, 255],
      }
  
      this.rotationRangeChanged = this.rotationRangeChanged.bind(this);
      this.widthRangeChanged = this.widthRangeChanged.bind(this);
      this.paletteRangeChanged = this.paletteRangeChanged.bind(this);
      this.speedRangeChanged = this.speedRangeChanged.bind(this);
      this.mintAnother = this.mintAnother.bind(this);
      this.refresh = this.refresh.bind(this);
      this.mint = this.mint.bind(this);
    }
  
    rotationRangeChanged(value, index) {
      console.log("Rotation range changed to: " + value);
      this.setState({
        rotationRange: value
      });
    }
  
    widthRangeChanged(value, index) {
      this.setState({
        widthRange: value
      })
    }
  
    paletteRangeChanged(value, index) {
      this.setState({
        paletteRange: value,
      })
    }
  
    speedRangeChanged(value, index) {
      this.setState({
        speedRange: value,
      })
    }
    
    mintAnother() {
      this.setState({
        doneSuccess: false
      })
    }

    randomSeed() {
      const max16bitInt = 500000000 - 1;
      return Math.trunc(Math.random() * max16bitInt);
    }

    refresh() {
      const randomSeed = this.randomSeed();
      this.setState({
        randomSeed: randomSeed
      });
    }
  
    async mint() {
      const rotationDegrees = this.state.rotationDegrees;
      const stripeWidth = this.state.stripeWidth;
      const palette = this.state.palette;
      const speed = this.state.speed;
  
      if (rotationDegrees < 0 || rotationDegrees > 180) {
        showErrorMessage("Rotation angle must be a factor of 45.");
        return;
      } else if (stripeWidth < 0 || stripeWidth > 255) {
          showErrorMessage("Stripe width must be between 0 and 255.")
          return;
      } else if (palette < 0 || palette > 255) {
        showErrorMessage("Palette must be between 0 and 255.")
        return;
      } else if (speed < 20 || speed > 255) {
        showErrorMessage("Speed must be between 20 and 255.")
        return;
      }
  
      const contractWithSigner = await getContractWithSigner(); 
  
      if (contractWithSigner === null) {
        showErrorMessage('Could not get signer.');
        return;
      }
  
      try {

        const rotationMin = this.state.rotationRange[0];
        const rotationMax = this.state.rotationRange[1];
        const widthMin = this.state.widthRange[0];
        const widthMax = this.state.widthRange[1];
        const paletteMin = this.state.paletteRange[0];
        const paletteMax = this.state.paletteRange[1];
        const speedMin = this.state.speedRange[0];
        const speedMax = this.state.speedRange[1];
  
        console.log("Minting dynastripes: " + rotationMin + " "  + rotationMax + " " + widthMin + " " + widthMax + " " + paletteMin + " " + paletteMax + " " + speedMin + " " + speedMax)

        await contractWithSigner.mintStripes(this.state.randomSeed, rotationMin, rotationMax, widthMin, widthMax, paletteMin, paletteMax, speedMin, speedMax);
  
        this.setState({
          doneSuccess: true
        });
  
        toast.success("Successfully minted your DynaStripes NFT!");
      } catch (err) {
        handleError(err);
      }
    }
  
    render() {
      const rotationMin = this.state.rotationRange[0];
      const rotationMax = this.state.rotationRange[1];
      const widthMin = this.state.widthRange[0];
      const widthMax = this.state.widthRange[1];
      const paletteMin = this.state.paletteRange[0];
      const paletteMax = this.state.paletteRange[1];
      const speedMin = this.state.speedRange[0];
      const speedMax = this.state.speedRange[1];
      
      const svg = generateDynaStripes(this.state.randomSeed, rotationMin, rotationMax, widthMin, widthMax, paletteMin, paletteMax, speedMin, speedMax);
      const encodedSvg = encodeURIComponent(svg);
      const svgDataUri = `url("data:image/svg+xml,${encodedSvg}")`;

      console.log("MintComponent render rotation range: " + this.state.rotationRange);

      return (
        <div className="mainContent"  style={{backgroundImage: svgDataUri, backgroundColor: "#FFFFFF"}}>
          <div className="content">
            <h1>Mint your own <span className="dyna">DynaStripes</span> NFT</h1>
            <center>
              { this.state.doneSuccess ? <MintAnotherComponent mintAnother={this.mintAnother} /> : <MintOptions svg={svg} rotationRange={this.state.rotationRange} rotationRangeChanged={this.rotationRangeChanged} widthRange={this.state.widthRange} widthRangeChanged={this.widthRangeChanged}  paletteRange={this.state.paletteRange} paletteRangeChanged={this.paletteRangeChanged}  speedRange={this.state.speedRange} speedRangeChanged={this.speedRangeChanged} mint={this.mint} refresh={this.refresh} /> }
            </center>
          </div>
        </div>
      );
    }
  }
  

  export default MintComponent;