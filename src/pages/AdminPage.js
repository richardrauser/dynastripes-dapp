import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import { getContract, getContractWithSigner } from '../utils/blockchain';
import { handleError } from '../utils/error';

import generateDynaStripes from '../dynastripes.js';

class AdminPage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isSenderOwner: false
      }
      this.fetchOwnerStatus = this.fetchOwnerStatus.bind(this);
  
    }
  
    componentDidMount() {
      this.fetchOwnerStatus();
    } 
  
    async pauseContract() {
      const contractWithSigner = await getContractWithSigner();
  
      if (contractWithSigner === null) {
        return;
      }
  
      try {
        await contractWithSigner.pause();
        console.log('Contract paused.');
        toast.success('Contract paused.');
      } catch (err) {
        handleError(err);
      }
    }
  
    async unpauseContract() {
      const contractWithSigner = await getContractWithSigner();
  
      if (contractWithSigner === null) {
        return;
      }
  
      try {
        await contractWithSigner.unpause();
        console.log('Contract unpaused.');
        toast.success('Contract unpaused.');
      } catch (err) {
        handleError(err);
      }
    }
  
    async fetchOwnerStatus() {
      const contract = await getContract();
  
      if (contract === null) {
        return;
      }
    
      try {
        const isSenderOwner = await contract.isSenderOwner();
        if (isSenderOwner === true) {
          toast("You're an admin. You must have built me! You're awesome. 😘");
        } else {
          toast("You're not an admin. Life must be painful and dull.");
        }
  
        this.setState({
          isSenderOwner: isSenderOwner,
        });  
  
      } catch (err) {
        handleError(err);
      }
  
    }
  
    render() {
      const randomSeed = Math.trunc(Math.random() * 500000000);
      const svgString = encodeURIComponent(generateDynaStripes(randomSeed, 0, 0, 0, 255, 0, 255, 20, 255));
      const svgDataUri = `url("data:image/svg+xml,${svgString}")`;

      if (!this.state.isSenderOwner) {
        return null;
      }  else {
        return (

          <div className="mainContent"  style={{background: svgDataUri}}>
            <div className="content">
              <h1><span className="dyna">DynaStripes</span> Admin Settings</h1>
              <div className="deepContent">
                <center>
                  <Button variant="primary" onClick={this.pauseContract}>Pause</Button>
                  <Button variant="primary" onClick={this.unpauseContract}>Unpause</Button>
                  <br/><hr/>
                  <input value={this.minterAddress} onChange={this.handleChange} /><br/>
                  <Button variant="primary" onClick={this.pauseContract}>Pay owner</Button>               
                  <br/><hr/>
                  <input value={this.minterAddress} onChange={this.handleChange} /><br/>
                  <Button variant="primary" onClick={this.pauseContract}>Update minter</Button>               
                </center>
              </div>
            </div>
          </div>
        );
      }
    }
  }
  
  export default AdminPage;