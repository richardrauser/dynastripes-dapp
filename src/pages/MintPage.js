import React from 'react';
import { toast } from 'react-toastify';

import MintOptions from '../components/MintOptions';
import MintAnotherComponent from '../components/MintAnotherComponent';

import { showErrorMessage, showWarningMessage } from '../utils/UIUtils';
import { handleError } from '../utils/ErrorHandler';
import * as Errors from '../utils/ErrorMessages';

import { getContractWithSigner, fetchMintPrice } from '../utils/BlockchainAPI';

import generateDynaStripes from '../utils/DynaStripes';
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
  
      this.randomIntFromInterval = this.randomIntFromInterval.bind(this);
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
      this.setRandomInputs();
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


    setRandomInputs() {
      const randomZoom = this.randomIntFromInterval(0, 100);

      const randomRed = this.randomIntFromInterval(0, 255);
      const randomBlue = this.randomIntFromInterval(0, 255);
      const randomGreen = this.randomIntFromInterval(0, 255);
      const randomAlpha = Math.random() * 0.9;
      const randomColour = { r: randomRed, g: randomGreen, b: randomBlue, a: randomAlpha };
            
      const randomRotationMin = this.randomIntFromInterval(0, 180);
      const randomRotationMax = this.randomIntFromInterval(randomRotationMin, 180);

      const randomWidthMin = this.randomIntFromInterval(25, 250);
      const randomWidthMax = this.randomIntFromInterval(randomWidthMin, 250);

      const randomSpeedMin = this.randomIntFromInterval(25, 250);
      const randomSpeedMax = this.randomIntFromInterval(randomSpeedMin, 250);

      let state = {
        zoom: randomZoom,
        tintColour: randomColour,
        rotationRange: [randomRotationMin, randomRotationMax],
        widthRange: [randomWidthMin, randomWidthMax],
        speedRange: [randomSpeedMin, randomSpeedMax],
      };

      console.log(JSON.stringify(state));

      this.setState(state);

      
      
      
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

      this.setRandomInputs();
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
      const rotationMin = this.state.rotationRange[0];
      const rotationMax = this.state.rotationRange[1];
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
      if (rotationMin < 0 || rotationMin > rotationMax || rotationMax > 180) {
        showErrorMessage("Rotation angle must be between 0 and 180.");
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

      try {
        const contractWithSigner = await getContractWithSigner(); 
    

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
      const zoom = this.state.zoom;
      const tintColour = this.state.tintColour;
      const rotationMin = this.state.rotationRange[0];
      const rotationMax = this.state.rotationRange[1];
      const widthMin = this.state.widthRange[0];
      const widthMax = this.state.widthRange[1];
      const speedMin = this.state.speedRange[0];
      const speedMax = this.state.speedRange[1];

      const traits = this.getDescriptiveTraits(zoom, tintColour.r, tintColour.g, tintColour.b, tintColour.a * 155, rotationMin, rotationMax, widthMin, widthMax, speedMin, speedMax);

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

    getDescriptiveTraits(zoom, tintRed, tintGreen, tintBlue, tintAlpha, rotationMin, rotationMax, stripeWidthMin, stripeWidthMax, speedMin, speedMax) {
      var form;

      if (rotationMin == rotationMax) {
          if (zoom > 50 && rotationMax % 90 == 0) {
              form = "perfect square";
          } else if ((rotationMax == 45 || rotationMax == 135) && zoom > 91) {
              form = "perfect diamond";
          } else if (zoom <= 50 && rotationMax == 90) {
              form = "horizontal stripes";
          } else if (zoom <= 50 && rotationMax % 180 == 0) {
              form = "vertical stripes";
          } else if (zoom <= 25) {
              form = "diagonal stripes";
          } else {
              form = "rotated square";
          }
      } else if (rotationMax - rotationMin < 30 && stripeWidthMin > 200 && zoom < 20) {
          form = "big fat stripes";
      } else if (stripeWidthMax < 60 && rotationMax - rotationMin < 30) {
          form = "match sticks";
      } else if (stripeWidthMax < 60 && rotationMax - rotationMin > 130 && zoom < 30) {
          form = "laser beams";
      } else if (stripeWidthMax < 60 && rotationMax - rotationMin > 130 && zoom > 80) {
          form = "birds nest";
      } else if (zoom > 60 && stripeWidthMin > 180 && rotationMax - rotationMin < 30 && rotationMax - rotationMin > 5 && (rotationMin > 160 || rotationMax < 30)) {
          form = "cluttered books";
      } else if (stripeWidthMin > 180 && rotationMax - rotationMin <= 30 && rotationMin > 75 && rotationMax < 105) {
          form = "stacked books";
      } else if (stripeWidthMin > 50 && stripeWidthMax < 150 && rotationMax - rotationMin < 50 && rotationMin > 35 &&  rotationMax < 145 && zoom > 55) {
          form = "broken ladder";
      } else if (stripeWidthMin > 200 && zoom > 70) {
          form = "giant pillars";
      } else if (stripeWidthMin > 70 && zoom < 20 && rotationMax - rotationMin < 60 && rotationMax - rotationMin > 10) {
          form = "ribbons";
      } else if (stripeWidthMax < 75 && zoom < 20 && rotationMax - rotationMin < 60 && rotationMax - rotationMin > 10) {
          form = "streamers";
      } else if (stripeWidthMin > 25 && stripeWidthMax < 200 && rotationMax - rotationMin < 15) {
          form = "jittery";
      } else if (stripeWidthMax < 40) {
          form = "twiglets";
      } else if (rotationMax - rotationMin < 60 && rotationMin >= 50 && rotationMax <= 130 && stripeWidthMax - stripeWidthMin >= 150) {
          form = "collapsing";
      } else if (stripeWidthMin > 200 && zoom > 50) {
          form = "blocky";
      } else if (rotationMax - rotationMin > 100 && stripeWidthMax < 150) {
          form = "wild";
      } else if (rotationMax - rotationMin < 100 && stripeWidthMin > 150) {
          form = "tame";
      } else if (stripeWidthMin > 150) {
          form = "thick";
      } else if (stripeWidthMax < 100) {
          form = "thin";
      } else {
          form = "randomish";
      }

      var colourWay; 

      if (tintAlpha > 127) {
          const difference = 150;
          if (tintAlpha > 200 && tintRed < 50 && tintGreen < 50 && tintBlue < 50) {
              colourWay = "doom and gloom";
          } else if (tintAlpha > 200 && tintRed > 200 && tintGreen > 200 && tintBlue > 200) {
              colourWay = "seen a ghost";
          } else if (tintRed > tintGreen && tintRed - tintGreen >= difference && tintRed > tintBlue && tintRed - tintBlue >= difference) {
              colourWay = "reds";
          } else if (tintGreen > tintRed && tintGreen - tintRed >= difference && tintGreen > tintBlue && tintGreen - tintBlue >= difference) {
              colourWay = "greens";
          } else if (tintBlue > tintRed && tintBlue - tintRed >= difference && tintBlue > tintGreen && tintBlue - tintGreen >= difference) {
              colourWay = "blues";
          } else if (tintRed > tintGreen && tintRed - tintGreen >= difference && tintBlue > tintGreen && tintBlue - tintGreen >= difference) {
              colourWay = "violets";
          } else if (tintRed > tintBlue && tintRed - tintBlue >= difference && tintGreen > tintBlue && tintGreen - tintBlue >= difference) {
              colourWay = "yellows";
          } else if (tintBlue > tintRed && tintBlue - tintRed >= difference && tintGreen > tintRed && tintGreen - tintRed >= difference) {
              colourWay = "cyans";
          } else {
              colourWay = "heavy tint";
          }
      } else if (tintAlpha == 0) {
          colourWay = "super dynamic";
      } else if (tintAlpha < 60) {
          colourWay = "light tint";
      } else {
          colourWay = "medium tint";
      }

      var speed;

      if (speedMax <= 25 && tintAlpha < 180) {
          speed = "call the police";
      } else if (speedMin == speedMax && speedMax < 30) {
          speed = "blinking";
      } else if (speedMin == speedMax && speedMax > 200) {
          speed = "slow pulse";
      } else if (speedMin == speedMax) {
          speed = "pulse";        
      } else if (speedMax < 50) {
          speed = "flickering";
      } else if (speedMax < 100) {
          speed = "zippy";
      } else if (speedMin > 200) {
          speed = "pedestrian";
      } else if (speedMin > 150) {
          speed = "sleepy";
      } else {
          speed = "shifting";
      }
      
      var descriptiveTraits;

      if (form.length > 0) {
          descriptiveTraits = form + ", ";
      }
      if (speed.length > 0) {
          descriptiveTraits += speed + ", "; 
      }
      if (colourWay.length > 0) {
          descriptiveTraits += colourWay; 
      }

      return descriptiveTraits;
  }

  }
  

  export default MintPage;