import React from 'react';

import Button from 'react-bootstrap/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class MintAnotherComponent extends React.Component {

  constructor(props) {
    super(props);
  
  }
  
  render() {
    return (
      <div>
          <p className="success">
            Your <span className="dyna">DynaStripes</span> have been successfully minted! Once the transaction is complete, your new artwork will appear in the gallery. Vist the gallery to see it, or mint more <span className="dyna">DynaStripes</span> now!
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