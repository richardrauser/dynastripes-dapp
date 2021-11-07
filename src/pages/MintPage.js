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

      const defaultColour = { r: 200, g: 200, b: 200, a: 0.2 };

      const randomSeed = this.randomSeed();
      this.state = {
        doneSuccess: false,
        randomSeed: randomSeed,
        rotationRange: [0, 180],
        zoom: 50,
        tintColour: defaultColour,
        widthRange: [25, 250],
        speedRange: [25, 250],
        mintPrice: null
      }
  
      this.zoomChanged = this.zoomChanged.bind(this);
      this.tintColourChanged = this.tintColourChanged.bind(this);
      this.tintAlphaChanged = this.tintAlphaChanged.bind(this);
      this.rotationRangeChanged = this.rotationRangeChanged.bind(this);
      this.widthRangeChanged = this.widthRangeChanged.bind(this);
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

    tintColourChanged(newTintColour) {
      
      const tintColour = this.state.tintColour;

      // Update colour but preserve alpha
      tintColour.r = newTintColour.rgb.r;
      tintColour.g = newTintColour.rgb.g;
      tintColour.b = newTintColour.rgb.b;
      
      this.setState({
        tintColour: tintColour
      })
    }
    

    tintAlphaChanged(newTintColour) {
      
      const tintColour = this.state.tintColour;

      // Update alpha and preserver colour
      tintColour.a = newTintColour.rgb.a;
      
      this.setState({
        tintColour: tintColour
      })
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
      // if (speed < 20 || speed > 255) {
      //   showErrorMessage("Speed must be between 20 and 255.")
      //   return;
      // }
  
  
      try {
        const contractWithSigner = await getContractWithSigner(); 
    
        const rotationMin = this.state.rotationRange[0];
        const rotationMax = this.state.rotationRange[1];
        const zoom = this.state.zoom;
        const tintRed = this.state.tintColour.r;
        const tintGreen = this.state.tintColour.g;
        const tintBlue = this.state.tintColour.b;
        const tintAlpha = Math.round(this.state.tintColour.a * 255);
        const widthMin = this.state.widthRange[0];
        const widthMax = this.state.widthRange[1];
        const speedMin = this.state.speedRange[0];
        const speedMax = this.state.speedRange[1];
        
        console.log("Minting dynastripes: " + rotationMin + " "  + rotationMax + " " + zoom + " " + widthMin + " " + widthMax + " " + speedMin + " " + speedMax)

        const overrides = {
          value: this.state.mintPrice, 
          gasLimit: 270000
        }
      
        // TODO: get tint colour into contract
  
        const transaction = await contractWithSigner.mintStripes(this.state.randomSeed, zoom, tintRed, tintGreen, tintBlue, tintAlpha, rotationMin, rotationMax, widthMin, widthMax, speedMin, speedMax, overrides);
  
        console.log("Tx hash: " + transaction.hash);
        this.setState({
          doneSuccess: true,
          txHash: transaction.hash
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
      const tintColour = this.state.tintColour;
      const widthMin = this.state.widthRange[0];
      const widthMax = this.state.widthRange[1];
      const speedMin = this.state.speedRange[0];
      const speedMax = this.state.speedRange[1];

      
      const svg = generateDynaStripes(this.state.randomSeed, zoom, tintColour, rotationMin, rotationMax, widthMin, widthMax, speedMin, speedMax, false);

      console.log("MintComponent render rotation range: " + this.state.rotationRange);

      return (
        <div className="mainContent">
          <div id="mint" className="content">
            <h1>Mint your own <DynaSpan/> NFT</h1>
            <center>
              { this.state.doneSuccess ? <MintAnotherComponent txHash={this.state.txHash} mintAnother={this.mintAnother} /> : <MintOptions svg={svg} mintPrice={this.state.mintPrice} rotationRange={this.state.rotationRange} rotationRangeChanged={this.rotationRangeChanged} zoom={this.state.zoom} zoomChanged={this.zoomChanged} tintColour={this.state.tintColour} tintColourChanged={this.tintColourChanged} tintAlphaChanged={this.tintAlphaChanged}  widthRange={this.state.widthRange} widthRangeChanged={this.widthRangeChanged} speedRange={this.state.speedRange} speedRangeChanged={this.speedRangeChanged} mint={this.mint} refresh={this.refresh} /> }
            </center>
          </div>
        </div>
      );
    }
  }
  

  export default MintPage;