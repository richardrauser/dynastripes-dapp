import React from 'react';

import Button from 'react-bootstrap/Button';
import ReactSlider from 'react-slider'
import styled from 'styled-components';
import PreviewComponent from './PreviewComponent';
import MintPriceComponent from './MintPriceComponent';


class MintOptions extends React.Component {
    
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

      const StyledOneThumbTrack = styled.div`
        top: 0;
        bottom: 0;
        background: #ddd;
        border-radius: 999px;
      `;
      const OneThumbTrack = (props, state) => <StyledOneThumbTrack {...props} index={state.index} />;

      const StyledTwoThumbTrack = styled.div`
          top: 0;
          bottom: 0;
          background: ${props => props.index === 1 ? '#aaa' : '#ddd'};
          border-radius: 999px;
      `;
      const TwoThumbTrack = (props, state) => <StyledTwoThumbTrack {...props} index={state.index} />;

      return (
        <div>
            Random values will be chosen for each stripe within the range you choose!
            
            <div className="mintRow"> 
              <PreviewComponent className="preview" svg={this.props.svg} />

              <div className="mintInputs">
                <div className="mintInput">
                  Zoom (closer - farther) <br/>

                  <StyledSlider 
                      value={this.props.zoom}
                      renderTrack={OneThumbTrack}
                      renderThumb={Thumb}
                      min={0}
                      max={100}
                      onAfterChange={this.props.zoomChanged}
                  />
                </div>  

                <div className="mintInput">
                  Rotation<br/>

                  <StyledSlider 
                      value={this.props.rotationRange}
                      renderTrack={TwoThumbTrack}
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
                      renderTrack={TwoThumbTrack}
                      renderThumb={Thumb}
                      min={25}
                      max={250}
                      onAfterChange={this.props.widthRangeChanged}
                  />
                </div>
      

              <div className="mintInput">
                Colour palette (darker - lighter)<br/>

                <StyledSlider
                      value={this.props.paletteRange}
                      renderTrack={TwoThumbTrack}
                      renderThumb={Thumb}
                      min={0}
                      max={255}
                      minDistance={20}
                      onAfterChange={this.props.paletteRangeChanged}
                  />

              </div>
              <div className="mintInput">
                Animation speed (faster - slower)<br/>
                <StyledSlider
                      value={this.props.speedRange}
                      renderTrack={TwoThumbTrack}
                      renderThumb={Thumb}
                      min={25}
                      max={250}
                      onAfterChange={this.props.speedRangeChanged}
                  />
              </div>


              </div>
                
            </div>
          
          <MintPriceComponent />
          <Button variant="primary" onClick={this.props.refresh}>New random seed</Button>
          <Button variant="primary" disabled={this.props.mintPrice === null} onClick={this.props.mint}>Mint, baby!</Button>
        </div>
      );
    }
  }
  
  export default MintOptions;