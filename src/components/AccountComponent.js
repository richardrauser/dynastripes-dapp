

// NOT IN USE

class AccountComponent extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        accountEthAddress: 'Loading..',
        accountEthBalance: 'Loading..',
      };
  
      this.fetchAccountDetails = this.fetchAccountDetails.bind(this);
  }
  
    componentDidMount() {
      this.fetchAccountDetails();
    }
    
    async fetchAccountDetails() {
      if (typeof window.ethereum !== 'undefined') {
  
        this.setState({
          isLoading: true,
          accountEthAddress: "",
          accountEthBalance: ""  
        });
  
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        const weiBalance = await provider.getBalance(account);
        const ethBalance = ethers.utils.formatEther(weiBalance);
  
        // TODO: what if more than 1 accout is returned?
        // const balance = await account[0].getBalance();
        this.setState({
          isLoading: false,
          accountEthAddress: account.toString(),
          accountEthBalance: ethBalance.toString(),
          minterAddress: ''
        });
  
  
        console.log('Address: ', this.state.accountEthAddress);
        console.log('Balance: ', this.state.accountEthBalance);
      }
    }
  
    render() {
  
      if (this.props.isLoading) {
        return (
          <Spinner animation="grow" />
        );
      }  else {
        return (
          <Card variant="top" className="appCard">
            <Card.Title>
              Your Polygon Account Details
            </Card.Title>
          <div id='accountDetails'>
            <Card.Body>
            🏠 { this.state.accountEthAddress } <br/>
            💰 { this.state.accountEthBalance } <br/> 
  
            </Card.Body>
  
            </div>
            <center>
  
            <Button variant="primary" onClick={this.props.fetchAccountDetails}>Reload Account</Button>
            </center>
  
          </Card>
        );
      }
    }
  }
  
  