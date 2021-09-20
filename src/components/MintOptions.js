import React from 'react';

import Button from 'react-bootstrap/Button';
import RangeSlider from 'react-bootstrap-range-slider';

class MintOptions extends React.Component {
  
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
  
            <div className="mintInput">
              Rotation degrees (0 = horizontal, 90 = vertical) <br/>
              <RangeSlider
                value={this.props.rotationDegrees}  
                onChange={this.props.rotationDegreesChanged}
                min={0}
                max={180}
                step={45}
                />
            </div>  
  
            <div className="mintInput">
              Stripe width (thinner - fatter) <br/>
              <RangeSlider
                value={this.props.stripeWidth}  
                onChange={this.props.stripeWidthChanged}
                min={0}
                max={100}
                step={1}
                />
            </div>
  
  
          <div className="mintInput">
            Colour palette (darker - lighter)<br/>
            <RangeSlider
              value={this.props.palette}  
              onChange={this.props.paletteChanged}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div className="mintInput">
            Animation speed (slower - faster)<br/>
            <RangeSlider
              value={this.props.speed}  
              onChange={this.props.speedChanged}
              min={0}
              max={100}
              step={1}
            />
          </div>
          
          <Button variant="primary" onClick={this.props.mint}>Mint, baby!</Button>
        </div>
      );
    }
  }
  

  export default MintOptions;