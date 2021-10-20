import React from 'react';

import twitterLogo from '../images/twitter.png';
import discordLogo from '../images/discord_logo1600.png';

import { generateRandomStripesDataUri } from '../dynastripes.js';

class AboutPage extends React.Component {

    render() {
      const svgDataUri = generateRandomStripesDataUri();

      return (
        <div className="mainContent"  style={{background: svgDataUri}}>
          <div className="content">
            <h1>About <span className="dyna">DynaStripes</span></h1>
            <div className="deepContent">
              <h3>
                  Overview
              </h3>
                  <p>
                  <span className="dyna">DynaStripes</span> is a novel animated NFT art project created by the colour-blind, colour-obsessed visual artist, <a className="externalLink volstrate" rel="noreferrer" href="http://www.volstrate.com" target="_blank">volstrate</a>. <span className="dyna">DynaStripes</span> NFTs are both <b>generative</b>, meaning that the artwork is created programatically via the use of an algorithm, and <b>on-chain</b>, meaning that the creation algorithm, user inputs, metadata and the artwork itself are stored directly on the Ethereum blockchain in the <span className="dyna">DynaStripes</span> smart contract. Uniquely, the minter chooses the input parameters, previews the artwork prior to minting, and collects all royalties on secondary sales in perpetuity. Full copyright and commercial property rights are ascribed to the NFT owner.
                  </p>

                  <h3>
                  User-directed mint
                  </h3>

                  <p>Minting refers to the process of creating an NFT, i.e. immutably committing an artwork to a blockchain. Nearly all NFT art projects issue newly minted artwork in one of two ways: </p>
                  <ol>
                    <li>Blindly and pseudorandomly allow end-users to mint artwork generated during the minting process, the user only knowing what they've bought after the work has been paid for and fully minted.</li> 
                    <li>The artwork is generated in advance and then offered for sale either after a private mint, or via a minting process during which the artwork may be selected, but not generated. </li>
                  </ol>
                  <p> When the artist informs the generative process in the latter method, it is usually referred to as "<b>artist-directed</b>" generative art as the artist can tweak the generation algorithm and its parameters before the artwork's creation, discard poor quality work, and keep the work that has some subjective quality. Conversely, <span className="dyna">DynaStripes</span> is among the first generative, on-chain NFT art projects that are "<b>user-directed</b>," allowing end-users themselves to have control over the input parameters used in the minting process and preview the artwork prior to minting.
                  </p>

                  <h3>
                  Random seed & artwork uniqueness
                  </h3>
                  <p> The input parameters selected by the user are modulated by a random seed created on the <span className="dyna">DynaStripes</span> server. This is then injected into the smart contract along with the user-selected values in order to allow generation of the artwork. So that duplicates are prevented, the <span className="dyna">DynaStripes</span> server ensures that each random seed has never been previously used and cryptographically signs it. This signature is then verified by the smart contract to ensure that the DynaStripes server has authorised the mint, thereby ensuring that duplicate artworks are an impossibility. An unknown actor cannot submit its own random seed to the smart contract because this would be detected when the signature is analysed.
                  </p>
                  <h3>
                Artwork generation
              </h3>

                <p>
                  Each <span className="dyna">DynaStripes</span> artwork takes the form of an SVG image created using input values from the user and a random seed value submitted to the smart contract. These user inputs are stored directly in the contract upon minting, while the pseudorandom values are derived deterministically when generating the artwork's SVG. The artwork is generated by the smart contract populating an SVG template with these values. This is done via a gas-free view operaton when the SVG is rendered by the contract. The SVG image format is a W3 open standard for scalable vector graphics, and is supported by nearly all web browsers.
                </p>

                  <h3>
                Royalties
                </h3>
                  <p>The <span className="dyna">DynaStripes</span> smart contract implements the newly ratified ERC-2981 royalty standard of August 2021 in an unconventional way. Most NFT creators use this standard to collect royalties for themselves in perpetuity, however <span className="dyna">DynaStripes</span> instead assigns the minter (i.e. the person who creates the work via this dApp) to be the permanent and perpetual recipient of all royalties. The royalty rate is fixed at 10% of all secondary sales.
                  </p>

                  <p>ERC-2981 is a new but incredibly popular new Ethereum standard that is likely to be supported by many NFT marketplaces in future as its adoption proliferates. The standard was ratified in August 2021, whith Known Origin supporting it as of October 2021, and plans for OpenSea to support it in 2022.
                  </p>

                  <h3>
                Copyright and commercial rights
                </h3>

                  <p>Whoever owns the the NFT for a given artwork is its legal owner and holds its copyright. The token owner is entitled to commercial and property rights for that NFT. Selling the NFT to someone else such that they become recorded as its owner on the Ethereum blockchain confers these rights for that artwork, including copyright and commercial rights, to the new owner. By purchasing the artwork, any new owner agrees for future royalties to be paid out to the original minter on any future sales. This is written directly into the <span className="dyna">DynaStripes</span> smart contract, and so is simply being reiterated here.
                  </p>

              <h3>
                Influences
              </h3>

              <p>
                The <span className="dyna">DynaStripes</span> project has been heavily influenced by existing on-chain, generative art projects like <a className="externalLink" href="https://www.larvalabs.com/autoglyphs" target="_blank" rel="noreferrer">Autoglyphs</a>, <a className="externalLink" href="https://avastars.io/" target="_blank" rel="noreferrer">Avastars</a>, <a className="externalLink" href="https://www.artblocks.io/" target="_blank" rel="noreferrer">ArtBlocks</a>, and more. There are, however, a few projects that have served as particularly strong inspiration for <span className="dyna">DynaStripes</span>:                    
              </p>
              <ol>
                <li> 
                    <a className="externalLink" href="https://tinybox.shop/" target="_blank" rel="noreferrer">TinyBoxes</a>: This "proto-generative," on-chain generative NFT project forged a new path by allowing users to select input parameters that influence the minted work. The artwork is entirely on-chain, and metadata is served from a Tiny Boxes web server.
                </li>
                <li> 
                  <a className="externalLink" href="https://neolastics.com/" target="_blank" rel="noreferrer">Neolastics</a>: this project by <a className="externalLink" href="https://twitter.com/simondlr" target="_blank" rel="noreferrer">Simon de la Rouviere</a> is entirely on chain and generative, forging an early path in on-chain SVG art. Metadata is served from a Neolastics endpoint. Simon's extensive writing has also been hugely influential, particularly this <a className="externalLink" href='https://blog.simondlr.com/posts/flavours-of-on-chain-svg-nfts-on-ethereum' target="_blank" rel="noreferrer">fascinating piece.</a>
                </li>
                <li> 
                  <a className="externalLink" href="https://mandalas.eth.link/" target="_blank" rel="noreferrer">Mandala Tokens</a>: this project from <a className="externalLink" href="https://twitter.com/wighawag" target="_blank" rel="noreferrer">Ronan Sandford</a> pioneered serving base64 encoded bitmap images directly from the Ethereum blockchain. And not only is the artwork stored on chain, but the metadata as well! 😍
                </li>
              </ol>

              <h3>
                Socials
              </h3>

              <div className="socialLinks">
                  <img className="socialLogo" alt="twitter logo" src={twitterLogo}/>
                  <img className="socialLogo" alt="discord logo" src={discordLogo}/>
              </div>
              <a className="externalLink" href="mail:volstrate@gmail.com">volstrate@gmail.com</a>

            </div>


            </div>
        </div>
      );
    }
  }

export default AboutPage;