import React from 'react';

import { addMumbai } from '../utils/BlockchainAPI';
import { handleError } from '../utils/ErrorHandler';


class ChangeNetworkLink extends React.Component {

    addMumbaiNetwork() {
        try {
          addMumbai();
        } catch (err) {
          handleError(err);
        }
      }
    
    
    render() {
        return (
            <span className="textLink" onClick={ this.addMumbaiNetwork }>tapping here</span>
        );
    }
}

export default ChangeNetworkLink;