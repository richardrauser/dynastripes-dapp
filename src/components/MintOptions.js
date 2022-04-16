import React from 'react';

import Button from 'react-bootstrap/Button';
import ReactSlider from 'react-slider'
import styled from 'styled-components';
import { HuePicker, AlphaPicker } from 'react-color'

import PreviewComponent from './PreviewComponent';
import MintPriceComponent from './MintPriceComponent';
import TokenCountComponent from './TokenCountComponent';
import MintButton from './MintButton';

class MintOptions extends React.Component {

    render() {

      const StyledSlider = styled(ReactSlider)`
          width: 100%;
          height: 20px;
      `;

      const StyledThumb = styled.div`
          height: 20px;
          line-height: 20px;
          width: 20px;
          text-align: center;
          background-color: #777;
          color: #fff;
          font-size: 10px;
          border-radius: 50%;
          cursor: grab;
      `;

      const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;
      const AlphaThumb = (props, state) => <StyledThumb {...props}>{Math.trunc(this.props.tintColour.a * 100)}</StyledThumb>;

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
                  Rotation Degrees<br/>

                  <StyledSlider 
                      value={this.props.rotationDegrees}
                      renderTrack={OneThumbTrack}
                      renderThumb={Thumb}
                      min={0}
                      max={360}
                      step={1}
                      onAfterChange={this.props.rotationDegreesChanged}
                  />
                </div>  
      
                <div className="mintInput">
                  Rotation Range<br/>

                  <StyledSlider 
                      value={this.props.rotationRange}
                      renderTrack={OneThumbTrack}
                      renderThumb={Thumb}
                      min={0}
                      max={180}
                      step={1}
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

                <div className="mintInput">
                  Tint colour<br/>
                  <HuePicker className="mintPicker" width="100%" height="20px" pointer={Thumb} color={this.props.tintColour} onChange={this.props.tintColourChanged} />
                </div>

                <div className="mintInput">
                  Tint % <br/>
                  <AlphaPicker className="mintPicker" width="100%" height="20px" pointer={AlphaThumb} color={this.props.tintColour} onChange={this.props.tintAlphaChanged} />
                </div>

              </div>
            </div>
            <div className="textTraits">{this.props.traits}</div> 
            <Button variant="primary" onClick={this.props.refreshSeed}>New seed</Button>
            <Button variant="primary" onClick={this.props.refreshParams}>Randomize params</Button>
            <MintButton mint={this.props.mint}/>

          <MintPriceComponent />
          <TokenCountComponent />
        </div>
      );
    }
  }
  
  export default MintOptions;