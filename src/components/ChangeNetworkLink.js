import React from 'react';

import { switchToCurrentNetwork } from '../utils/BlockchainAPI';
import { handleError } from '../utils/ErrorHandler';


class ChangeNetworkLink extends React.Component {

  switchToCurrentNetwork() {
      try {
        switchToCurrentNetwork();
      } catch (err) {
        handleError(err);
      }
    }
    
    render() {
        return (
            <span className="textLink" onClick={ this.switchToCurrentNetwork }>tapping here</span>
        );
    }
}

export default ChangeNetworkLink;