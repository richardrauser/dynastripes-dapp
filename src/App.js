import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import AboutComponent from './components/AboutComponent';
import ContractAdminComponent from './components/ContractAdminComponent';
import DynaHeaderCard from './components/DynaHeaderCard';
import DynaNav from './components/DynaNav';
import MintComponent from './components/MintComponent';
import YourStripesComponent from './components/YourStripesComponent';

import generateDynaStripes from './dynastripes.js';
 


// ----- UI FUNCTIONS -----

class App extends React.Component {

  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
  }

  update() {
    console.log("Updating..");
    this.setState({});
  }
  
  render() {

    const svgString = encodeURIComponent(generateDynaStripes());
    const svgDataUri = `url("data:image/svg+xml,${svgString}")`;

    return (
      <div className="App">
        <DynaNav />
        <header className="App-header"  style={{background: svgDataUri}} onClick={this.update}>
          <DynaHeaderCard />
        </header>

        <div id="mainContent">

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          
          {/* <AccountComponent /> */}

          <YourStripesComponent />

          <MintComponent />

          <AboutComponent />

          <ContractAdminComponent />
        </div>
      </div>

    );
  
  }
}

export default App;
 