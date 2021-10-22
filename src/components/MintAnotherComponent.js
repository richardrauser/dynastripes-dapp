import React from 'react';

import Button from 'react-bootstrap/Button';
import DynaSpan from '../components/DynaSpan';

import {
  Link
} from "react-router-dom";

class MintAnotherComponent extends React.Component {
  
  render() {
    return (
      <div>
          <p className="success">
            Your <DynaSpan/> have been successfully minted! Once the transaction is complete, your new artwork will appear in the gallery. Vist the gallery to see it, or mint more <DynaSpan/> now!
          </p>

          <Link to="/gallery">
            <Button variant="primary">Visit Gallery</Button>
          </Link>
          <Button variant="primary" onClick={this.props.mintAnother}>Mint Another</Button>
      </div>
    );
  }
}
  
export default MintAnotherComponent;