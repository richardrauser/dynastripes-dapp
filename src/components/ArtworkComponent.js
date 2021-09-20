import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import { getContract } from '../utils/blockchain';

class ArtworkComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        svg: ""
      }
  
      this.getSvg = this.getSvg.bind(this);
    }
  
    async getSvg() {
      console.log("Getting SVG for token ID: " + this.props.tokenId);
  
      const contract = await getContract();
  
      const svg = await contract.generateSvg(this.props.tokenId);
      console.log(svg);
      this.setState({
        loading: false,
        svg: svg
      });
    }
  
    componentDidMount() {
      this.getSvg();
    }
  
    render() {
  
      if (this.state.loading == true) {
        return (
          <div className="dynaStripesArtwork"> 
            <Spinner animation="grow" />
          </div>   
        );
      } else {
          const svgString = encodeURIComponent(this.state.svg);
          const svgDataUri = `url("data:image/svg+xml,${svgString}")`;
    
          return (
            // TODO: workout why Image is not working below, pivot to that instead of setting background
            <div className="dynaStripesArtwork" style={{background: svgDataUri}}>
              {/* <Image source={{uri: svgDataUri}}/> */}
            </div>
          );
      }
    }
  }
  
export default ArtworkComponent;