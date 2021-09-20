import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

import { getContract, getContractWithSigner } from '../utils/blockchain';
import { handleError } from '../utils/error';

class ContractAdminComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        isAdmin: false
      }
      this.fetchAdminStatus = this.fetchAdminStatus.bind(this);
  
    }
  
    componentDidMount() {
      this.fetchAdminStatus();
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
  
    async fetchAdminStatus() {
      const contract = await getContract();
  
      if (contract === null) {
        return;
      }
    
      try {
        const isSenderAdmin = await contract.isSenderAdmin();
        if (isSenderAdmin != null && isSenderAdmin === true) {
          toast("You're an admin. You must have built me! You're awesome. 😘");
        } else {
          toast("You're not an admin. Life must be painful and dull.");
        }
  
        this.setState({
          isAdmin: isSenderAdmin,
        });  
  
      } catch (err) {
        handleError(err);
      }
  
    }
  
    render() {
  
      if (!this.state.isAdmin) {
        return null;
      }  else {
        return (
          <Card>
          <Card.Title> Admin Settings </Card.Title>
          <center>
            <Button variant="primary" onClick={this.pauseContract}>Pause</Button>
            <Button variant="primary" onClick={this.unpauseContract}>Unpause</Button>
            <br/><hr/>
            <input value={this.minterAddress} onChange={this.handleChange} /><br/>
            <Button variant="primary" onClick={this.pauseContract}>Update minter</Button>
          </center>
        </Card>
        );
      }
    }
  }
  
  export default ContractAdminComponent;