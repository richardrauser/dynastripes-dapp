import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { getContract } from '../utils/Blockchain';

class TokenCard extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
      }
  
      this.fetchMetadata = this.fetchMetadata.bind(this);
      this.downloadSvg = this.downloadSvg.bind(this);
    }

    async fetchMetadata() {
        console.log("Getting SVG for token ID: " + this.props.tokenId);
    
        const contract = await getContract();
    
        const metadataDataUri = await contract.tokenURI(this.props.tokenId);
        const metadataJson = metadataDataUri.replace("data:text/plain,", "");
        
        console.log(metadataJson);

        const metadataObject = JSON.parse(metadataJson);


        // const tokenData = await contract.tokenURI(this.props.tokenId);
        // console.log(tokenData);

        this.setState({
          loading: false,
          tokenMetadata: metadataObject
        });
      }
    
      componentDidMount() {
        this.fetchMetadata();
      }
    
  
      downloadSvg() {
          // const svgString = encodeURIComponent(this.state.tokenMetadata.image);

          const svgDataUri = this.state.tokenMetadata.image; // `data:image/svg+xml,${svgString}`;

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
            const svg = this.state.tokenMetadata.image.replace("data:image/svg+xml,", "");
            const encodedSvg = encodeURIComponent(svg);
              const svgDataUri = `data:image/svg+xml,${encodedSvg}`;
              console.log("SVG: " + svgDataUri);

              return (
                  <Card key={this.props.tokenId} className="tokenCard">
                      <Card.Header>
                          Token ID: {this.props.tokenId}
                      </Card.Header>
                      <Card.Body>
                      <Card.Title>
                          
                      </Card.Title>
                      <div className="dynaStripesArtwork">
                      <img  alt={"DynaStripes token " + this.props.tokenId}   src={ svgDataUri } />
                      </div>
                      Form: { this.props.tokenMetadata.traits }
                      <Button onClick={ this.downloadSvg } >Save</Button>
                      </Card.Body>
                  </Card>        

              );
          }
      }
  }

  export default TokenCard;
