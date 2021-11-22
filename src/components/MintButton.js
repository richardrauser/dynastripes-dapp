import React from 'react';

// import { Spinner } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';

import { isAccountConnected, fetchAccount } from '../utils/BlockchainAPI';
import { handleError } from '../utils/ErrorHandler';

class ConnectButton extends React.Component {

    constructor(props) {
        super(props);
  
        this.state = {
          isLoading: true,
          isWalletInstalled: false,
          isAccountConnected: false
        }

        this.checkAccountStatus = this.checkAccountStatus.bind(this);
        this.connectWallet = this.connectWallet.bind(this);
    }

    componentDidMount() {
        if (typeof window.ethereum === 'undefined') {
            this.setState({
                isLoading: false,
                isWalletInstalled: false,
                isAccountConnected: false
            });
            return;
        }

        window.ethereum.on('accountsChanged', (accounts) => {
            this.checkAccountStatus();
        });

        this.checkAccountStatus();
    }

    async checkAccountStatus() {
        this.state = {
            isLoading: true,
          }
  
        try {
            if (typeof window.ethereum === 'undefined') {
                this.setState({
                    isLoading: false,
                    isWalletInstalled: false,
                    isAccountConnected: false
                });
                return;
            }

            const isConnected = await isAccountConnected();

            this.setState({
                isLoading: false,
                isWalletInstalled: true,
                isAccountConnected: isConnected
            });
        } catch (err) {

            this.setState({
                isLoading: false,
                isWalletInstalled: true,
                isAccountConnected: false,
            });

        }
    }

    async connectWallet() {
        if (typeof window.ethereum === 'undefined') {
            this.setState({
                isLoading: false,
                isAccountConnected: false,
                isWalletInstalled: false
            });
            return;
        }

        try {
            await fetchAccount();
            const isConnected = await isAccountConnected();

            this.setState({
                isLoading: false,
                isWalletInstalled: true,
                isAccountConnected: isConnected,
            });

        } catch (err) {

            this.setState({
                isLoading: false,
                isWalletInstalled: true,
                isAccountConnected: false,
            });

            handleError(err);
        }
    }
  
    render() {
        
        return (
            <Button disabled="true" onClick>Minting Disabled</Button>
        );    

        // if (this.state.isLoading === true) {
        //     return (
        //         <Spinner animation="grow" />
        //         );    
        // }
        // if (this.state.isWalletInstalled === false) {
        //     return (
        //         <Button target="_blank" href="https://metamask.io">Install MetaMask</Button>
        //     );    
        // } else if (this.state.isAccountConnected === true) {
        //     return (
        //         <Button variant="primary" onClick={this.props.mint}>Mint, baby!</Button>
        //         );        
        // } else  {
        //     return (
        //         <Button onClick={ this.connectWallet }>Connect wallet</Button>
        //     );    
        // }

    }
}

export default ConnectButton;