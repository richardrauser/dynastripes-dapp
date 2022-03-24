import React from 'react';
import { toast } from 'react-toastify';

import MintOptions from '../components/MintOptions';
import MintAnotherComponent from '../components/MintAnotherComponent';

import { showErrorMessage, showWarningMessage } from '../utils/UIUtils';
import { handleError } from '../utils/ErrorHandler';
import * as Errors from '../utils/ErrorMessages';

import { getContractWithSigner, fetchMintPrice, isOnCorrectNetwork } from '../utils/BlockchainAPI';

import generateDynaStripes from '../utils/DynaStripes';
import DynaSpan from '../components/DynaSpan';
import getTextTraits from '../utils/Traits';
import { DynaStripesMaxTokensPerUser } from '../utils/Constants';

class MintPage extends React.Component {

    constructor(props) {
      super(props);

      const defaultColour = { r: 200, g: 200, b: 200, a: 0.2 };

      const randomSeed = this.randomSeed();
      this.state = {
        doneSuccess: false,
        randomSeed: randomSeed,
        rotationDegrees: 0,
        rotationRange: 0,
        zoom: 50,
        tintColour: defaultColour,
        widthRange: [25, 250],
        speedRange: [25, 250],
        mintPrice: null
      }
  
      this.randomIntFromInterval = this.randomIntFromInterval.bind(this);
      this.zoomChanged = this.zoomChanged.bind(this);
      this.tintColourChanged = this.tintColourChanged.bind(this);
      this.tintAlphaChanged = this.tintAlphaChanged.bind(this);
      this.rotationDegreesChanged = this.rotationDegreesChanged.bind(this);
      this.rotationRangeChanged = this.rotationRangeChanged.bind(this);
      this.widthRangeChanged = this.widthRangeChanged.bind(this);
      this.speedRangeChanged = this.speedRangeChanged.bind(this);
      this.mintAnother = this.mintAnother.bind(this);
      this.generateRandomSeed = this.generateRandomSeed.bind(this);
      this.generateRandomParams = this.generateRandomParams.bind(this);
      this.mint = this.mint.bind(this);
      this.fetchMintPrice = this.fetchMintPrice.bind(this);
    }

    componentDidMount() {
      this.fetchMintPrice();
      this.generateRandomParams();
    }

    randomIntFromInterval(min, max) { 
      if (max <= min) {
          return min;
      }
      min = Math.ceil(min);
      max = Math.floor(max);
      const randomVal =  Math.floor(Math.random() * (max - min + 1)) + min;
      return Math.round(randomVal);
    }

    generateRandomParams() {
      const randomZoom = this.randomIntFromInterval(0, 100);

      const randomRed = this.randomIntFromInterval(0, 255);
      const randomBlue = this.randomIntFromInterval(0, 255);
      const randomGreen = this.randomIntFromInterval(0, 255);
      const randomAlpha = Math.random() * 0.9;
      const randomColour = { r: randomRed, g: randomGreen, b: randomBlue, a: randomAlpha };
            
      const randomRotationDegrees = this.randomIntFromInterval(0, 360);
      const randomRotationRange = this.randomIntFromInterval(0, 180);

      const randomWidthA = this.randomIntFromInterval(25, 250);
      const randomWidthB = this.randomIntFromInterval(25, 250);
      console.log("randomWidthA " + randomWidthA + " randomWidthB " + randomWidthB);
      const randomWidthMin = randomWidthA < randomWidthB ? randomWidthA : randomWidthB;
      const randomWidthMax = randomWidthA >= randomWidthB ? randomWidthA : randomWidthB;

      const randomSpeedA = this.randomIntFromInterval(25, 250);
      const randomSpeedB = this.randomIntFromInterval(25, 250);
      const randomSpeedMin = (randomSpeedA < randomSpeedB) ? randomSpeedA : randomSpeedB;
      const randomSpeedMax = (randomSpeedA >= randomSpeedB) ? randomSpeedA : randomSpeedB;

      let state = {
        zoom: randomZoom,
        tintColour: randomColour,
        rotationDegrees: randomRotationDegrees,
        rotationRange: randomRotationRange,
        widthRange: [randomWidthMin, randomWidthMax],
        speedRange: [randomSpeedMin, randomSpeedMax],
      };

      this.setState(state);
    }
  
    randomSeed() {
      return Math.trunc(Math.random() * 5_000_000);
    }

    generateRandomSeed() {
      const randomSeed = this.randomSeed();
      this.setState({
        randomSeed: randomSeed
      });
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

      var newAlpha = newTintColour.rgb.a;
      
      if (newAlpha > 0.9) {
        newAlpha = 0.9;
        showWarningMessage("Max tint is 90%. ");
      }
      // Update alpha and preserver colour
      tintColour.a = newAlpha;
      
      this.setState({
        tintColour: tintColour
      })
    }


    rotationDegreesChanged(value, index) {
      console.log("Rotation range changed to: " + value);
      this.setState({
        rotationDegrees: value
      });
    }  
    rotationRangeChanged(value, index) {
      console.log("Rotation variation changed to: " + value);
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

      this.generateRandomParams();
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
      const rotationDegrees = this.state.rotationDegrees;
      const rotationRange = this.state.rotationRange;
      const tintRed = this.state.tintColour.r;
      const tintGreen = this.state.tintColour.g;
      const tintBlue = this.state.tintColour.b;
      const tintAlpha = Math.round(this.state.tintColour.a * 255);
      const widthMin = this.state.widthRange[0];
      const widthMax = this.state.widthRange[1];
      const speedMin = this.state.speedRange[0];
      const speedMax = this.state.speedRange[1];

      // TODO: validation needs to check range
      // const rotationDegrees = this.state.rotationDegrees;
      // const stripeWidth = this.state.stripeWidth;

      if (this.randomSeed < 0 || this.randomSeed >= 5_000_000) {
        showErrorMessage("Random seed invalid.");
        return;
      }
      if (zoom < 0 || zoom > 100) {
        showErrorMessage("Zoom must be between 0 and 100.");
        return;
      } 
      if (tintRed < 0 || tintRed > 255 || tintGreen < 0 || tintGreen > 255 || tintBlue < 0 || tintBlue > 255) {
        showErrorMessage("Tint color not valid");
        return;
      }
      if (tintAlpha >= 230) {
        showErrorMessage("Tint percentage is too high.");
        return;
      }
      if (rotationDegrees < 0 || rotationDegrees > 360) {
        showErrorMessage("Rotation degrees must be between 0 and 360.");
        return;
      }
      if (rotationRange < 0 || rotationRange > 360) {
        showErrorMessage("Rotation range must be between 0 and 360.");
        return;
      }
      if (widthMin < 25 || widthMin > widthMax || widthMax > 250) {
          showErrorMessage("Stripe width must be between 25 and 250.")
          return;
      } 
      if (speedMin < 25 || speedMin > speedMax || speedMax > 250) {
        showErrorMessage("Speed must be between 25 and 250.")
        return;
      }
    
      if (this.state.mintPrice === undefined || this.state.mintPrice === null) {
        // TODO
      }

      try {
        const correctNetwork = await isOnCorrectNetwork();
        if (!correctNetwork) {    
          console.log("Not on right network");
          throw Error(Errors.DS_WRONG_ETH_NETWORK);
        }
        const contractWithSigner = await getContractWithSigner(); 

        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const tokenCount = await contractWithSigner.balanceOf(account);
        console.log("User's token count: " + tokenCount);
        if (tokenCount >= DynaStripesMaxTokensPerUser) {
          showErrorMessage("You already have " + tokenCount + " DynaStripes artworks. You've reached the mint limit!");
          return;
        }

        console.log("Minting dynastripes: " + rotationDegrees + " " + zoom + " " + widthMin + " " + widthMax + " " + speedMin + " " + speedMax)

        const overrides = {
          value: this.state.mintPrice, 
          gasLimit: 270000
        }
        
        const transaction = await contractWithSigner.mintStripes(this.state.randomSeed, zoom, tintRed, tintGreen, tintBlue, tintAlpha, rotationDegrees, rotationRange, widthMin, widthMax, speedMin, speedMax, overrides);
        console.log("Tx hash: " + transaction.hash);
        this.setState({
          doneSuccess: true,
          txHash: transaction.hash,
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
      const zoom = this.state.zoom;
      const tintColour = this.state.tintColour;
      const rotationDegrees = this.state.rotationDegrees; 
      const rotationRange = this.state.rotationRange;
      const widthMin = this.state.widthRange[0];
      const widthMax = this.state.widthRange[1];
      const speedMin = this.state.speedRange[0];
      const speedMax = this.state.speedRange[1];

      const traits = getTextTraits(zoom, tintColour.r, tintColour.g, tintColour.b, Math.round(tintColour.a * 255), rotationDegrees, rotationRange, widthMin, widthMax, speedMin, speedMax);

      const svg = generateDynaStripes(this.state.randomSeed, zoom, tintColour, rotationDegrees, rotationRange, widthMin, widthMax, speedMin, speedMax, false);
      const encodedSvg = encodeURIComponent(svg);
      const svgDataUri = `data:image/svg+xml,${encodedSvg}`;

      return (
        <div className="mainContent">
          <div id="mint" className="content">
            <h1>Mint your own <DynaSpan/> NFT</h1>
            <center>
              { this.state.doneSuccess ? <MintAnotherComponent txHash={this.state.txHash} mintAnother={this.mintAnother} svgDataUri={svgDataUri} /> : <MintOptions svg={svg} traits={traits} mintPrice={this.state.mintPrice} rotationDegrees={this.state.rotationDegrees} rotationDegreesChanged={this.rotationDegreesChanged} rotationRange={this.state.rotationRange} rotationRangeChanged={this.rotationRangeChanged} zoom={this.state.zoom} zoomChanged={this.zoomChanged} tintColour={this.state.tintColour} tintColourChanged={this.tintColourChanged} tintAlphaChanged={this.tintAlphaChanged}  widthRange={this.state.widthRange} widthRangeChanged={this.widthRangeChanged} speedRange={this.state.speedRange} speedRangeChanged={this.speedRangeChanged} mint={this.mint} refreshSeed={this.generateRandomSeed} refreshParams={this.generateRandomParams} /> }
            </center>
          </div>
        </div>
      );
    }
  }
  

  export default MintPage;