import React from 'react';
import { ethers } from 'ethers';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

import ether from '../images/ethereum.svg';

import { getContract, getContractWithSigner, fetchMintPrice, isCurrentAccountOwner } from '../utils/blockchain';
import { handleError } from '../utils/error';

import { generateRandomStripesDataUri } from '../dynastripes.js';

import DynaSpan from '../components/DynaSpan';

class AdminPage extends React.Component {

    constructor(props) {
      super(props);
      this.mintPriceInput = React.createRef();
      this.tokenLimitInput = React.createRef();
      this.paymentInput = React.createRef();
      this.ownerInput = React.createRef();

      this.state = {
        isLoading: true,
        isSenderOwner: false,
        ownerAddress: null,
        mintPrice: null
      }

      this.updateMintPrice = this.updateMintPrice.bind(this);
      this.updateTokenLimit = this.updateTokenLimit.bind(this);
      this.makePayment = this.makePayment.bind(this);
      this.updateOwner = this.updateOwner.bind(this);
    }
  
    componentDidMount() {
      this.fetchOwnerStatus();
    } 
  
    async fetchOwnerStatus() {
      console.log("Fetching owner status..");
      try {
        const isSenderOwner = await isCurrentAccountOwner();
        
        if (isSenderOwner === true) {
          toast("You're the owner. You must have built me! You're awesome. 😘");
          this.fetchMintPrice();
          this.fetchTokenLimit();
          this.fetchOwner();    
        } else {
          toast("You're not the owner. Life must be painful and dull. And this page is definitely not for you.");
        }
  
        this.setState({
          isLoading: false,
          isSenderOwner: isSenderOwner
        });  
  
      } catch (err) {
        handleError(err);
        this.setState({
          isLoading: false,
          isSenderOwner: false
        });  
      }
    }

    async pauseContract() {
  
      try {
        const contractWithSigner = await getContractWithSigner();
        await contractWithSigner.pause();
        console.log('Contract paused.');
        toast.success('Contract paused.');
      } catch (err) {
        handleError(err);
      }
    }
  
    async unpauseContract() {  
      try {
        const contractWithSigner = await getContractWithSigner();
        await contractWithSigner.unpause();
        console.log('Contract unpaused.');
        toast.success('Contract unpaused.');
      } catch (err) {
        handleError(err);
      }
    }

    async fetchMintPrice() {
      this.setState({
        mintPrice: "-"
      });
      try {
        const mintPrice = await fetchMintPrice();       
        const formattedEthPrice = ethers.utils.formatEther(mintPrice);
        console.log("Got formatted ETH price: " + mintPrice);

        this.setState({
          mintPrice: formattedEthPrice
        });
      } catch (err) {
        handleError(err);
      }
    }

    async updateMintPrice() {
      const newMintPrice = this.mintPriceInput.current.value;  
      console.log("Updating ETH price: " + newMintPrice);
  
      const wei = ethers.utils.parseEther(newMintPrice);
      console.log("Updating ETH price: " + wei);
  
      try {
        const contractWithSigner = await getContractWithSigner();
        await contractWithSigner.setMintPrice(wei);

        this.setState({
          mintPrice: newMintPrice
        });

        toast.success('Mint price set to: ' + newMintPrice);

      } catch (err) {
        handleError(err);
      }
    }
  
    async fetchTokenLimit() {
      try {
        const contract = await getContract();

        this.setState({
          tokenLimit: "-"
        });
      
        const tokenLimit = await contract.getTokenLimit();
        this.setState({
          tokenLimit: tokenLimit
        });
      } catch (err) {
        handleError(err);
      }
    }

    async updateTokenLimit() {
      const newTokenLimit = this.tokenLimitInput.current.value;
      console.log("Updating token limit: " + newTokenLimit);
  
      try {
        const contractWithSigner = await getContractWithSigner();  
        await contractWithSigner.setTokenLimit(newTokenLimit);

        this.setState({
          tokenLimit: newTokenLimit
        });

        toast.success('Token limit set to: ' + newTokenLimit);
        this.fetchTokenLimit();

      } catch (err) {
        handleError(err);
      }
    }
  
    async makePayment() {
      const amount = this.paymentInput.current.value;  
      console.log("Making payment (ETH): " + amount);
  
      const wei = ethers.utils.parseEther(amount);
      console.log("Making payment wei: " + wei);

      try {
        const contractWithSigner = await getContractWithSigner();
        await contractWithSigner.payOwner(wei);

        this.setState({
        });

        toast.success('Made payment of ' + amount + " ETH");

      } catch (err) {
        handleError(err);
      }
    }

    async fetchOwner() {
        try {
        const contract = await getContract();
        const ownerAddress = await contract.owner();
        console.log("Owner: " + ownerAddress);
        this.setState({
          ownerAddress: ownerAddress
        });  
  
      } catch (err) {
        handleError(err);
        this.setState({
          ownerAddress: "?"
        });  
      }
    }

    async updateOwner() {
      const newOwner = this.ownerInput.current.value;
      console.log("Setting owner to: " + newOwner);
  
      try {
        const contractWithSigner = await getContractWithSigner();
        await contractWithSigner.transferOwnership(newOwner);

        this.setState({
        });

        toast.success('Owner is now: ' + newOwner);

      } catch (err) {
        handleError(err);
      }
    }
  
    render() {
      const svgDataUri = generateRandomStripesDataUri();

      if (this.state.isLoading) {
        return (
          <div className="mainContent"  style={{background: svgDataUri}}>
            <div className="content">
              <h1>Loading..</h1>
              <div className="deepContent">
                <center>
                  <Spinner animation="grow" variant="dark" />                  
                </center>
              </div>  
            </div>
  
          </div>
        );

      } else if (!this.state.isSenderOwner) {
          return (
          <div className="mainContent"  style={{background: svgDataUri}}>
            <div className="content">
              <h1>Hmmmmm...</h1>
              <div className="deepContent">
                    <p>
                     Just what is it that you think you're doing here? 🤨
                    </p>
              </div>
  
            </div>
  
          </div>
        );
      } else {
        return (

          <div className="mainContent"  style={{background: svgDataUri}}>
            <div className="content">
              <h1><DynaSpan/> Admin Settings</h1>
              <div className="deepContent">
                <center>
                  Contract status: ? <br/>
                  <Button variant="primary" onClick={this.pauseContract}>Pause</Button>
                  <Button variant="primary" onClick={this.unpauseContract}>Unpause</Button>
                  <br/><hr/>
                    Current mint price: { this.state.mintPrice === null ? "-" : this.state.mintPrice }<img src={ether} alt="ether logo" className='mintEther'/> <br/>
                    <input ref={this.mintPriceInput} /><br/>
                    <Button variant="primary" onClick={this.updateMintPrice}>Update mint price</Button>               
                    <br/><hr/>
                    Current token limit (max 10,000): { this.state.tokenLimit === null ? "-" : this.state.tokenLimit }<br/>
                    <input ref={this.tokenLimitInput} /><br/>
                    <Button variant="primary" onClick={this.updateTokenLimit}>Update token Limit</Button>               
                    <br/><hr/>
                    Make payment <br/>
                    <input ref={this.paymentInput} /><br/>
                    <Button variant="primary" onClick={this.makePayment}>Pay owner</Button>               
                    <br/><hr/> 
                    Current owner ETH address:<br/> { this.state.ownerAddress } <br/>
                    <input ref={ this.ownerInput } /><br/>
                  <Button variant="primary" onClick={this.updateOwner}>Update owner</Button>               
                </center>

              </div>
            </div>
          </div>
        );
      }
    }
  }
  
  export default AdminPage;