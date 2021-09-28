import React from 'react';

import Button from 'react-bootstrap/Button';
import RangeSlider from 'react-bootstrap-range-slider';
import ReactSlider from 'react-slider'
import styled from 'styled-components';
import PreviewComponent from './PreviewComponent';


class MintOptions extends React.Component {
    constructor(props) {
      super(props);

      console.log("MintOptions constructor rotation range: " + props.rotationRange);
    }

    render() {

      const StyledSlider = styled(ReactSlider)`
          width: 100%;
          height: 25px;
      `;

      const StyledThumb = styled.div`
          height: 25px;
          line-height: 25px;
          width: 25px;
          text-align: center;
          background-color: #777;
          color: #fff;
          font-size: 12px;
          border-radius: 50%;
          cursor: grab;
      `;

      const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

      const StyledTrack = styled.div`
          top: 0;
          bottom: 0;
          background: ${props => props.index === 1 ? '#aaa' : '#ddd'};
          border-radius: 999px;
      `;

      const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

      return (
        <div>
            Random values will be chosen for each stripe within the range you choose!
            
            <PreviewComponent svg={this.props.svg} />

            <div className="mintInput">
              Rotation degrees (0 = horizontal, 90 = vertical) <br/>

              <StyledSlider 
                  value={this.props.rotationRange}
                  renderTrack={Track}
                  renderThumb={Thumb}
                  min={0}
                  max={180}
                  onAfterChange={this.props.rotationRangeChanged}
              />
            </div>  
  
            <div className="mintInput">
              Stripe width (thinner - fatter) <br/>

              <StyledSlider
                  value={this.props.widthRange}
                  renderTrack={Track}
                  renderThumb={Thumb}
                  min={0}
                  max={255}
                  onAfterChange={this.props.widthRangeChanged}
              />
            </div>
  
  
          <div className="mintInput">
            Colour palette (darker - lighter)<br/>

            <StyledSlider
                  value={this.props.paletteRange}
                  renderTrack={Track}
                  renderThumb={Thumb}
                  min={0}
                  max={255}
                  onAfterChange={this.props.paletteRangeChanged}
              />

          </div>
          <div className="mintInput">
            Animation speed (faster - slower)<br/>
            <StyledSlider
                  value={this.props.speedRange}
                  renderTrack={Track}
                  renderThumb={Thumb}
                  min={20}
                  max={255}
                  onAfterChange={this.props.speedRangeChanged}
              />
          </div>
          
          <Button variant="primary" onClick={this.props.refresh}>New random seed</Button>
          <Button variant="primary" onClick={this.props.mint}>Mint, baby!</Button>
        </div>
      );
    }
  }
  

  export default MintOptions;