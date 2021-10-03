import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { getContract } from '../utils/blockchain';

class TokenCard extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
      }
  
      this.getSvg = this.getSvg.bind(this);
      this.downloadSvg = this.downloadSvg.bind(this);
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
    
  
    downloadSvg() {
        const svgString = encodeURIComponent(this.state.svg);
        const svgDataUri = `data:image/svg+xml,${svgString}`;

        const link = document.createElement("a");
        link.href = svgDataUri;
        link.download = "DynaStripes" + this.props.tokenId +".svg";
        link.click();
    }
      
    render() {
        if (this.state.loading === true) {
            return (
                <Card key={this.props.tokenId} className="tokenCard">
                <Card.Header>
                Token ID: {this.props.tokenId}
                </Card.Header>
                <Card.Body>
                <Card.Title>
                    Token ID: {this.props.tokenId}            
                </Card.Title>
                <div className="dynaStripesArtwork"> 
                    <Spinner animation="grow" variant="dark" />
                    </div>   
                </Card.Body>
            </Card>        
            );
        } else {
            const svgString = encodeURIComponent(this.state.svg);
            const svgDataUri = `data:image/svg+xml,${svgString}`;

            return (
                <Card key={this.props.tokenId} className="tokenCard">
                    <Card.Header>
                        Token ID: {this.props.tokenId}
                    </Card.Header>
                    <Card.Body>
                    <Card.Title>
                        
                    </Card.Title>
                    <div className="dynaStripesArtwork">
                    <img src ={ svgDataUri } />
                    </div>
                    <Button onClick={ this.downloadSvg } >Save</Button>
                    </Card.Body>
                </Card>        

            );
        }
    }
  }

  export default TokenCard;
