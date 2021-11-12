
import React from 'react';
import DynaSpan from '../components/DynaSpan';
import { Accordion, Button, Spinner } from 'react-bootstrap';
import { getContract } from '../utils/BlockchainAPI';
import { handleError } from '../utils/ErrorHandler';
import { Form } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';

// import toImg from 'react-svg-to-image';
import DynaStripesContractAddress, { DynaStripesEtherscanLink } from '../utils/Constants';
import { buildDescriptiveTextFromMetadata } from '../utils/Metadata';
import { showInfoMessage } from '../utils/UIUtils';
import opensea from '../images/opensea.svg';
import twitter from '../images/twitter.png';

class TokenPage extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
          loading: true,
          tokenId: this.props.match.params.tokenId,
        }
    
        this.fetchMetadata = this.fetchMetadata.bind(this);
        this.downloadSvg = this.downloadSvg.bind(this);
        this.downloadPng = this.downloadPng.bind(this);
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
          const descriptiveText = buildDescriptiveTextFromMetadata(metadataObject);
  
          this.setState({
            loading: false,
            tokenOwner: tokenOwner,
            tokenSvgDataUri: svgDataUri,
            descriptiveTraits: descriptiveText,
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

    downloadPng() {

      showInfoMessage("Save PNG functionality coming soon!");

      // const pngFileName = "Dynastripes" + this.state.tokenId + ".png";
      // toImg('svg', pngFileName , {
      //   scale: 3,
      //   format: 'webp',
      //   quality: 0.01,
      //   download: false,
      //   ignore: '.ignored'
      // }).then(fileData => {
      //    console.log("PNG DATA: " + fileData);
      // });      
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
        const etherscanLink =  DynaStripesEtherscanLink + "address/" + ethAddress;

        if (ethAddress.length > 10) {
          ethAddress = ethAddress.substring(0, 6) +  "..." + ethAddress.slice(-4);        
        }

        const openSeaLink = "https://opensea.io/assets/" + DynaStripesContractAddress + "/" + this.state.tokenId;
        
        const renderSvgTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
            Scalable Vector Image -- best quality at various sizes
          </Tooltip>
        );
        
        const renderPngTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
            fixed-size raster image -- good for web, but won't scale well
          </Tooltip>
        );

        const tokenPageLink = encodeURIComponent("https://www.dynastripes.com/token/" + this.state.tokenId);
        const tweetText = encodeURIComponent("Check out this generative, 100% on-chain DynaStripes #NFT artwork!");
        const tweetRelated = encodeURIComponent("volstrate,richardrauser");
        const tweetUrl = "https://twitter.com/intent/tweet?url=" + tokenPageLink + "&text=" + tweetText + "&related=" + tweetRelated; 

        return (
            <div className="mainContent">
            <div className="content">
              <h1><DynaSpan/> token #{this.state.tokenId}</h1>
              <div className="deepContent">
                  <div className="singleArtwork">
                      <img alt={"DynaStripes token " + this.state.tokenId} src={ this.state.tokenSvgDataUri } />
                  </div>
    
                  <div className="singleArtworkDetail">
                  { this.state.descriptiveTraits } <br/>
                  Owned by: <a href={etherscanLink}  target="_blank" rel="noreferrer">  { ethAddress } </a> <br/>
                  </div>


                  {/* <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Accordion Item #1</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Accordion Item #2</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                        est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion> */}
                  
                  <div className="actions">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        Save Image
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 50, hide: 400 }} 
                          overlay={renderSvgTooltip}> 
                          <Dropdown.Item onClick={ this.downloadSvg }>SVG vector image</Dropdown.Item>
                        </OverlayTrigger> 
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 50, hide: 400 }}
                          overlay={renderPngTooltip}> 
                          <Dropdown.Item onClick={ this.downloadPng }>PNG raster image</Dropdown.Item>
                        </OverlayTrigger>
                      </Dropdown.Menu>
                    </Dropdown>

                    <Button href={openSeaLink}  target ="_blank" rel="noreferrer">
                      <img className="buttonLogo" alt="opensea logo" src={opensea}/>
                      OpenSea
                    </Button>

                    <a href={tweetUrl} target ="_blank" rel="noreferrer">
                      <Button>
                        <img className="buttonLogo" alt="twitter logo" src={twitter}/>
                        Tweet
                      </Button>
                    </a>
                </div>

                <Accordion className="singleArtworkTraitsAccordion">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Traits JSON</Accordion.Header>
                    <Accordion.Body>
                    <Form.Control className="traits" as="textarea" rows={10}>
                        { JSON.stringify(this.state.tokenTraits, null, 2) }
                    </Form.Control>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

              </div>  
            </div>

            </div>
        );
    }
}

export default TokenPage;