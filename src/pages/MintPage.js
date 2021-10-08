import React from 'react';

import { ethers } from 'ethers';

import { toast } from 'react-toastify';

import MintOptions from '../components/MintOptions';
import MintAnotherComponent from '../components/MintAnotherComponent';

import { getContractWithSigner } from '../utils/blockchain';
import { showErrorMessage } from '../utils/ui.js';
import { handleError } from '../utils/error';

import { getContract } from '../utils/blockchain';

import generateDynaStripes from '../dynastripes.js';
import { generateRandomStripesDataUri } from '../dynastripes.js';

class MintPage extends React.Component {

    constructor(props) {
      super(props);

      const randomSeed = this.randomSeed();
      this.state = {
        doneSuccess: false,
        randomSeed: randomSeed,
        rotationRange: [0, 180],
        widthRange: [25, 250],
        paletteRange: [0, 255],
        speedRange: [25, 250],
        mintPrice: null
      }
  
      this.rotationRangeChanged = this.rotationRangeChanged.bind(this);
      this.widthRangeChanged = this.widthRangeChanged.bind(this);
      this.paletteRangeChanged = this.paletteRangeChanged.bind(this);
      this.speedRangeChanged = this.speedRangeChanged.bind(this);
      this.mintAnother = this.mintAnother.bind(this);
      this.refresh = this.refresh.bind(this);
      this.mint = this.mint.bind(this);
      this.fetchMintPrice = this.fetchMintPrice.bind(this);
    }

    componentDidMount() {
      this.fetchMintPrice();
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
      const randomSeed = this.randomSeed();
      this.setState({
        doneSuccess: false,
        randomSeed: randomSeed
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
  
    async fetchMintPrice() {
      const contract = await getContract();
  
      if (contract === null) {
        return;
      }
  
      try {

        const mintPrice = await contract.currentMintPrice();
        console.log("Mint price: " + mintPrice);
     
        this.setState({
          mintPrice: mintPrice
        });
      } catch (err) {
        handleError(err);
        this.setState({
          mintPrice: null
        });
      }
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

        const overrides = {
          value: ethers.utils.parseEther("0.01"), 
          gasLimit: 300000
      }
  
        await contractWithSigner.mintStripes(this.state.randomSeed, rotationMin, rotationMax, widthMin, widthMax, paletteMin, paletteMax, speedMin, speedMax, overrides);
  
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
          <div id="mint" className="content">
            <h1>Mint your own <span className="dyna">DynaStripes</span> NFT</h1>
            <center>
              { this.state.doneSuccess ? <MintAnotherComponent mintAnother={this.mintAnother} /> : <MintOptions svg={svg} mintPrice={this.state.mintPrice} rotationRange={this.state.rotationRange} rotationRangeChanged={this.rotationRangeChanged} widthRange={this.state.widthRange} widthRangeChanged={this.widthRangeChanged}  paletteRange={this.state.paletteRange} paletteRangeChanged={this.paletteRangeChanged}  speedRange={this.state.speedRange} speedRangeChanged={this.speedRangeChanged} mint={this.mint} refresh={this.refresh} /> }
            </center>
          </div>
        </div>
      );
    }
  }
  

  export default MintPage;