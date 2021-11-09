
import React from 'react';
import DynaSpan from '../components/DynaSpan';
import { Spinner } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { getContract } from '../utils/BlockchainAPI';
import { handleError } from '../utils/ErrorHandler';
import { Form } from 'react-bootstrap';

class TokenPage extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
          loading: true,
          tokenId: this.props.match.params.tokenId,
        }
    
        this.fetchMetadata = this.fetchMetadata.bind(this);
        this.downloadSvg = this.downloadSvg.bind(this);
    }
    
    componentDidMount() {
        this.fetchMetadata();
    }

    async fetchMetadata() {
        console.log("Getting SVG for token ID: " + this.state.tokenId);
  
        try {
          const contract = await getContract();
    
          const tokenOwner = await contract.ownerOf(this.state.tokenId);
          const metadataDataUri = await contract.tokenURI(this.state.tokenId);
          const metadataJson = metadataDataUri.replace("data:text/plain,", "");
          
          console.log(metadataJson);
  
          const metadataObject = JSON.parse(metadataJson);
  
          // const tokenData = await contract.tokenURI(this.props.tokenId);
          // console.log(tokenData);
  
          const svg = metadataObject.image.replace("data:image/svg+xml,", "");
          const encodedSvg = encodeURIComponent(svg);
          const svgDataUri = `data:image/svg+xml,${encodedSvg}`;
          console.log("SVG: " + svgDataUri);

          const attributes = metadataObject.attributes;
  
          var descriptiveTraits = "";

          const formAttribute = attributes.filter(trait => trait.trait_type === "form")[0];
          if (formAttribute !== undefined) {
            descriptiveTraits += formAttribute["value"];            
          }

          const speedAttribute = attributes.filter(trait => trait.trait_type === "speed")[0];
          if (speedAttribute !== undefined) {
            if (descriptiveTraits !== "") {
              descriptiveTraits += ", ";
            }
            descriptiveTraits += speedAttribute["value"];            
          }

          const colourWayAttribute = attributes.filter(trait => trait.trait_type === "colour way")[0];
          if (colourWayAttribute !== undefined) {
            if (descriptiveTraits !== "") {
              descriptiveTraits += ", ";
            }
            descriptiveTraits += colourWayAttribute["value"];            
          }

  
          this.setState({
            loading: false,
            tokenOwner: tokenOwner,
            tokenSvgDataUri: svgDataUri,
            descriptiveTraits: descriptiveTraits,
            tokenTraits: attributes
          });
  
        } catch (err) {
          handleError(err);
        }
    }

    downloadSvg() {
        const link = document.createElement("a");
        link.href = this.state.tokenSvgDataUri;
        link.download = "DynaStripes" + this.state.tokenId +".svg";
        link.click();
    }
    

      render() {

        if (this.state.loading === true) {
            return (
                <div className="mainContent">
                    <div className="content">
                    <h1><DynaSpan/> token #{this.state.tokenId}</h1>
                    <div className="deepContent">
                        <center>
                        <Spinner animation="grow" />                  
                        </center>
                    </div>  
                    </div>
                </div>
            );
        }

        var ethAddress = this.state.tokenOwner;
        const etherscanLink = "https://rinkeby.etherscan.io/address/" + ethAddress;

        if (ethAddress.length > 10) {
          ethAddress = ethAddress.substring(0, 6) +  "..." + ethAddress.slice(-4);        
        }


        return (
            <div className="mainContent">
            <div className="content">
              <h1><DynaSpan/> token #{this.props.match.params.tokenId}</h1>
              <div className="deepContent">

                  <div className="singleArtwork">
                      <img alt={"DynaStripes token " + this.state.tokenId} src={ this.state.tokenSvgDataUri } />
                  </div>
    
                  Owner: <a href={etherscanLink}  target="_blank" rel="noreferrer">  { ethAddress } </a> <br/>

                  { this.state.descriptiveTraits } <br/>

                  Traits: <br/>
                  <Form.Control className="traits" as="textarea" rows={5}>
                      { JSON.stringify(this.state.tokenTraits, null, 2) }
                  </Form.Control>
                  <br/>
                  <center>
                    <Button onClick={ this.downloadSvg } >Save</Button>
                  </center>

              </div>  
            </div>

            </div>
        );
    }
}

export default TokenPage;