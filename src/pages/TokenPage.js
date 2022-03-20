
import React from 'react';
import DynaSpan from '../components/DynaSpan';
import { Accordion, Button, Spinner } from 'react-bootstrap';
import { getContract } from '../utils/BlockchainAPI';
import { handleError } from '../utils/ErrorHandler';
import { Form } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Tooltip } from 'react-bootstrap';
import { create } from 'ipfs-http-client';
import { Helmet } from 'react-helmet';

import DynaStripesContractAddress, { DynaStripesCurrentNetworkExplorerUrl } from '../utils/Constants';
import buildTraitsText from '../utils/TraitsMetadata';
import { convertSvgToPng } from '../utils/UIUtils';
import opensea from '../images/opensea.svg';
import twitter from '../images/twitter.png';

import ImageStore from '../utils/ImageStore';

class TokenPage extends React.Component {

    constructor(props) {
        super(props);
  
        this.imageStore = new ImageStore();

        this.state = {
          loading: true,
          tokenId: this.props.match.params.tokenId,
        }
    
        this.fetchMetadata = this.fetchMetadata.bind(this);
        // this.downloadSvg = this.downloadSvg.bind(this);
        // this.downloadPng = this.downloadPng.bind(this);
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

          console.log("Metadata JSON: " + metadataJson);

          const metadataObject = JSON.parse(metadataJson);
          const svgDataUri = metadataObject.image;
          const svg = svgDataUri.replace("data:image/svg+xml,", "");
          const encodedSvgDataUri = "data:image/svg+xml," + encodeURIComponent(svg);

          const pngDataUri = await convertSvgToPng(svg);
          const png = pngDataUri.replace("data:image/png;base64,", "");
          const encodedPngDataUri = "data:image/png;base64" + encodeURIComponent(png);

          console.log(pngDataUri);
          console.log("-----");
          console.log(encodedPngDataUri);

          var imageData = await this.imageStore.fetchImageDataForTokenId(this.state.tokenId);

          if (imageData === undefined || imageData === null) {
            console.log("Image data not in ImageStore.. getting and persisting..");

            const ipfsClient = create('https://ipfs.infura.io:5001/api/v0');
            const createdSvg = await ipfsClient.add(svg);
            const svgUrl = `https://ipfs.infura.io/ipfs/${createdSvg.path}`;  

            const pngData = this.convertDataURIToBinary(pngDataUri);
            const createdPng = await ipfsClient.add(pngData);
            const pngUrl = `https://ipfs.infura.io/ipfs/${createdPng.path}`;

            imageData = this.imageStore.setImageDataForTokenId(this.state.tokenId, svgUrl, pngUrl);
          }

          console.log("IMAGE DATA: " + JSON.stringify(imageData));

          const filePrefix = "DynaStripes" + this.state.tokenId;
          const svgFileName = filePrefix + ".svg";
          const pngFileName = filePrefix + ".png";
        
          const attributes = metadataObject.attributes;
          const descriptiveText = buildTraitsText(metadataObject);
  
          this.setState({
            loading: false,
            tokenOwner: tokenOwner,
            tokenSvgUrl: imageData.svgUrl,
            tokenSvgDataUri: encodedSvgDataUri,
            tokenSvgFileName: svgFileName,
            tokenPngUrl: imageData.pngUrl,
            tokenPngDataUri: pngDataUri,
            tokenPngFileName: pngFileName,
            descriptiveTraits: descriptiveText,
            tokenTraits: attributes
          });
  
        } catch (err) {
          handleError(err);
        }
    }

    convertDataURIToBinary(dataURI) {
      var BASE64_MARKER = ';base64,';
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));
    
      for(var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    };

    // downloadSvg() {
    //     const link = document.createElement("a");
    //     link.href = this.state.tokenSvgDataUri;
    //     link.download = "DynaStripes" + this.state.tokenId +".svg";
    //     link.click();
    // }

    // downloadPng() {

    //   // showInfoMessage("Save PNG functionality coming soon!");

    //   const link = document.createElement("a");
    //   link.href = this.state.tokenPngUrl;
    //   link.download = "DynaStripes" + this.state.tokenId +".png";
    //   link.click();

    // }
    

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
        const etherscanLink =  DynaStripesCurrentNetworkExplorerUrl + "address/" + ethAddress;

        if (ethAddress.length > 10) {
          ethAddress = ethAddress.substring(0, 6) +  "..." + ethAddress.slice(-4);        
        }

        const openSeaLink = "https://opensea.io/assets/" + DynaStripesContractAddress + "/" + this.state.tokenId;
        
        const renderSvgTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
            animated scalable vector image -- best quality at various sizes
          </Tooltip>
        );
        
        const renderPngTooltip = (props) => (
          <Tooltip id="button-tooltip" {...props}>
            still, fixed-size raster image -- nonanimated first frame of image, good for web, but won't scale well
          </Tooltip>
        );

        const tokenPageLink = encodeURIComponent("https://www.dynastripes.com/token/" + this.state.tokenId);
        const tweetText = encodeURIComponent("Check out this generative, 100% on-chain DynaStripes #NFT artwork!");
        const tweetRelated = encodeURIComponent("volstrate,richardrauser");
        const tweetUrl = "https://twitter.com/intent/tweet?url=" + tokenPageLink + "&text=" + tweetText + "&related=" + tweetRelated; 

        return (
            <div className="mainContent">
              <Helmet>
                <meta data-rh="true" name="twitter:title" content="DynaStripes Artwork" />
                <meta data-rh="true" name="twitter:image:src" content={ this.state.tokenPngUrl }/>
                <meta data-rh="true" name="twitter:image:alt" content="DynaStripes Artwork"/>
                <meta property="og:title" content="DynaStripes Artwork"/>
                <meta property="og:image" content={ this.state.tokenPngUrl }/>
                <title>DynaStripes Artwork {this.state.tokenId }</title>
              </Helmet>
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
                            <Dropdown.Item href={this.state.tokenSvgDataUri} download={this.state.tokenSvgFileName}>animated SVG</Dropdown.Item>
                          </OverlayTrigger> 
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 50, hide: 400 }}
                            overlay={renderPngTooltip}> 
                            <Dropdown.Item href={this.state.tokenPngDataUri} download={this.state.tokenPngFileName}>still PNG</Dropdown.Item>
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
                        <Form.Control className="traits" as="textarea" readOnly={true} rows={10} value={ JSON.stringify(this.state.tokenTraits, null, 2) }/>
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