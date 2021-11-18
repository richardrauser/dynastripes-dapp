import React from 'react';

import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { getContract } from '../utils/BlockchainAPI';
import { handleError } from '../utils/ErrorHandler';
import { buildDescriptiveTextFromMetadata } from '../utils/Metadata';

class TokenCard extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
      }
  
      this.fetchMetadata = this.fetchMetadata.bind(this);
    }

    async fetchMetadata() {
        console.log("Getting SVG for token ID: " + this.props.tokenId);
  
        try {
          const contract = await getContract();
    
          const metadataDataUri = await contract.tokenURI(this.props.tokenId);
          const metadataJson = metadataDataUri.replace("data:text/plain,", "");
          
          const metadataObject = JSON.parse(metadataJson);
  
          const svg = metadataObject.image.replace("data:image/svg+xml,", "");
          const encodedSvg = encodeURIComponent(svg);
          const svgDataUri = `data:image/svg+xml,${encodedSvg}`;
          
          const descriptiveText = buildDescriptiveTextFromMetadata(metadataObject);

          this.setState({
            loading: false,
            tokenSvgDataUri: svgDataUri,
            descriptiveTraits: descriptiveText,
          });
  
        } catch (err) {
          handleError(err);
        }
      }
    
      componentDidMount() {
        this.fetchMetadata();
      }
    
      render() {
        const link = "/token/" + this.props.tokenId;

        if (this.state.loading === true) {
              return (
                  <Card key={this.props.tokenId} className="tokenCard">
                  <Card.Header>
                  <Link to={link}>
                  Token ID: {this.props.tokenId}
                  </Link>
                  </Card.Header>
                  <Card.Body>
                  <Card.Title>
                  </Card.Title>
                  <Link to= {link}>
                      <div className="cardArtwork"> 
                        <Spinner animation="grow" />
                      </div>   
                    </Link>
                  </Card.Body>
              </Card>        
              );
          } else {
                      

              return (
                  <Card key={this.props.tokenId} className="tokenCard">
                      <Card.Header>
                          <Link to= {link}>
                            Token ID: {this.props.tokenId}
                          </Link>
                      </Card.Header>
                      <Card.Body>
                      <Card.Title>
                      </Card.Title>
                      <Link to= {link}>
                        <div className="cardArtwork">
                            <img className="galleryImage" alt={ "DynaStripes token " + this.props.tokenId } src={ this.state.tokenSvgDataUri } />
                        </div>
                      </Link>
                      <div className="cardTraits">
                      { this.state.descriptiveTraits }
                      </div>
                      </Card.Body>
                  </Card>        

              );
          }
      }
  }

  export default TokenCard;
