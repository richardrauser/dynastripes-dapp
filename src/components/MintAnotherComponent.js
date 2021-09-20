import React from 'react';

import Button from 'react-bootstrap/Button';

  class MintAnotherComponent extends React.Component {
  
    constructor(props) {
      super(props);
      this.refreshPage = this.refreshPage.bind(this);
        // this.stripeCountChanged = this.stripeCountChanged.bind(this);
  
    }
  
    refreshPage() {
      window.location.reload(false);
    }
  
    render() {
      return (
        <div>
            <p className="success">
              Your <span className="dyna">DynaStripes</span> have been successfully minted! Once the transaction is complete, your new artwork will appear above. Refresh to see it, or mint more <span className="dyna">DynaStripes</span> now!
            </p>
  
            <Button variant="primary" onClick={this.refreshPage}>Refresh</Button>
            <Button variant="primary" onClick={this.props.mintAnother}>Mint Another</Button>
        </div>
      );
    }
  
  }
  
export default MintAnotherComponent;