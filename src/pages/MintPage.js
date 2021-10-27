import React from 'react';
import { toast } from 'react-toastify';

import MintOptions from '../components/MintOptions';
import MintAnotherComponent from '../components/MintAnotherComponent';

import { showErrorMessage } from '../utils/ui.js';
import { handleError } from '../utils/error';
import * as Errors from '../utils/errors.js';

import { getContractWithSigner, fetchMintPrice } from '../utils/blockchain';

import generateDynaStripes from '../dynastripes.js';
import DynaSpan from '../components/DynaSpan';

class MintPage extends React.Component {

    constructor(props) {
      super(props);

      const randomSeed = this.randomSeed();
      this.state = {
        doneSuccess: false,
        randomSeed: randomSeed,
        rotationRange: [0, 180],
        zoom: 50,
        widthRange: [25, 250],
        paletteRange: [0, 255],
        speedRange: [25, 250],
        mintPrice: null
      }
  
      this.zoomChanged = this.zoomChanged.bind(this);
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
  
    zoomChanged(value, index) {
      console.log("Zoom changed to: " + value);
      this.setState({
        zoom: value
      });
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
      return Math.trunc(Math.random() * 5_000_000);
    }

    refresh() {
      const randomSeed = this.randomSeed();
      this.setState({
        randomSeed: randomSeed
      });
    }
  
    async fetchMintPrice() {
      try {
        const mintPrice = await fetchMintPrice();
        console.log("Mint price: " + mintPrice);
     
        this.setState({
          mintPrice: mintPrice
        });
      } catch (err) {
        if (err === Errors.DS_NO_ETH_WALLET) {
          showErrorMessage("You don't appear to have an Ethereum wallet like Metamask installed.");
        }
        handleError(err);
        this.setState({
          mintPrice: null
        });
      }
    }

    async mint() {
      const zoom = this.state.zoom;
      // TODO: validation needs to check range
      // const rotationDegrees = this.state.rotationDegrees;
      // const stripeWidth = this.state.stripeWidth;
      // const palette = this.state.palette;
      // const speed = this.state.speed;
  
      if (zoom < 0 || zoom > 100) {
        showErrorMessage("Zoom must be between 0 and 100.");
        return      
      } 
      // if (rotationDegrees < 0 || rotationDegrees > 180) {
      //   showErrorMessage("Rotation angle must be a factor of 45.");
      //   return
      // } 
      // if (stripeWidth < 0 || stripeWidth > 255) {
      //     showErrorMessage("Stripe width must be between 0 and 255.")
      //     return;
      // } 
      // if (palette < 0 || palette > 255) {
      //   showErrorMessage("Palette must be between 0 and 255.")
      //   return;
      // } 
      // if (speed < 20 || speed > 255) {
      //   showErrorMessage("Speed must be between 20 and 255.")
      //   return;
      // }
  
  
      try {
        const contractWithSigner = await getContractWithSigner(); 
    
        const rotationMin = this.state.rotationRange[0];
        const rotationMax = this.state.rotationRange[1];
        const zoom = this.state.zoom;
        const widthMin = this.state.widthRange[0];
        const widthMax = this.state.widthRange[1];
        const paletteMin = this.state.paletteRange[0];
        const paletteMax = this.state.paletteRange[1];
        const speedMin = this.state.speedRange[0];
        const speedMax = this.state.speedRange[1];
        
        console.log("Minting dynastripes: " + rotationMin + " "  + rotationMax + " " + zoom + " " + widthMin + " " + widthMax + " " + paletteMin + " " + paletteMax + " " + speedMin + " " + speedMax)

        const overrides = {
          value: this.state.mintPrice, 
          gasLimit: 270000
      }
  
        await contractWithSigner.mintStripes(this.state.randomSeed, zoom, rotationMin, rotationMax, widthMin, widthMax, paletteMin, paletteMax, speedMin, speedMax, overrides);
  
        this.setState({
          doneSuccess: true
        });
  
        toast.success("Successfully minted your DynaStripes NFT!");
      } catch (err) {
        if (err.code === "UNSUPPORTED_OPERATION" && err.message.startsWith("unknown account")) {
          showErrorMessage("You need to connect an account to MetaMask. Read the 'How to' guide for more info.");
        } else {
          handleError(err);
        }
      }
    }
  
    render() {
      const rotationMin = this.state.rotationRange[0];
      const rotationMax = this.state.rotationRange[1];
      const zoom = this.state.zoom;
      const widthMin = this.state.widthRange[0];
      const widthMax = this.state.widthRange[1];
      const paletteMin = this.state.paletteRange[0];
      const paletteMax = this.state.paletteRange[1];
      const speedMin = this.state.speedRange[0];
      const speedMax = this.state.speedRange[1];
      
      const svg = generateDynaStripes(this.state.randomSeed, zoom, rotationMin, rotationMax, widthMin, widthMax, paletteMin, paletteMax, speedMin, speedMax, false);
      const encodedSvg = encodeURIComponent(svg);
      const svgDataUri = `url("data:image/svg+xml,${encodedSvg}")`;

      console.log("MintComponent render rotation range: " + this.state.rotationRange);

      return (
        <div className="mainContent singleArtworkBackground"  style={{backgroundImage: svgDataUri}}>
          <div id="mint" className="content">
            <h1>Mint your own <DynaSpan/> NFT</h1>
            <center>
              { this.state.doneSuccess ? <MintAnotherComponent mintAnother={this.mintAnother} /> : <MintOptions svg={svg} mintPrice={this.state.mintPrice} rotationRange={this.state.rotationRange} rotationRangeChanged={this.rotationRangeChanged} zoom={this.state.zoom} zoomChanged={this.zoomChanged} widthRange={this.state.widthRange} widthRangeChanged={this.widthRangeChanged}  paletteRange={this.state.paletteRange} paletteRangeChanged={this.paletteRangeChanged}  speedRange={this.state.speedRange} speedRangeChanged={this.speedRangeChanged} mint={this.mint} refresh={this.refresh} /> }
            </center>
          </div>
        </div>
      );
    }
  }
  

  export default MintPage;