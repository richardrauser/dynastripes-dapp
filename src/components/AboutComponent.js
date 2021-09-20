import React from 'react';
import Card from 'react-bootstrap/Card';

class AboutComponent extends React.Component {

    render() {
      return (
        <Card>
          <Card.Title>More About <span className="dyna">DynaStripes</span>
          </Card.Title>
          <Card.Text>
              <p>
              <span className="dyna">DynaStripes</span> is an NFT art project created by the colour-blind, colour-obsessed visual artist, <a className="externalLink volstrate" href="http://www.volstrate.com" target="_blank">volstrate</a>. <span className="dyna">DynaStripes</span> represents the on-chain, generative evolution of volstrate's earlier explorations into NFT art.
              </p>
              <p>
                The DynaStripes project has been heavily influenced by existing on-chain, generative art projects like <a className="externalLink" href="https://www.larvalabs.com/autoglyphs" target="_blank">Autoglyphs</a>, <a className="externalLink" href="https://avastars.io/" target="_blank">Avastars</a>, and <a className="externalLink" href="https://www.artblocks.io/" target="_blank">ArtBlocks</a>, but the most compelling source of inspiration has proven to be Simon de la Rouviere's <a className="externalLink" href="https://neolastics.com/" target="_blank">Neolastics</a> and also his writings, particularly this <a className="externalLink" href='https://blog.simondlr.com/posts/flavours-of-on-chain-svg-nfts-on-ethereum' target="_blank">fascinating piece.</a>
              </p>
          </Card.Text>
        </Card>
      );
    }
  }

export default AboutComponent;