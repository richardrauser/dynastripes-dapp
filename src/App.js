import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AboutComponent from './components/AboutComponent';
import ContractAdminComponent from './components/ContractAdminComponent';
import HomeComponent from './components/HomeComponent';
import DynaNav from './components/DynaNav';
import MintComponent from './components/MintComponent';
import YourStripesComponent from './components/YourStripesComponent';

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

    return (
      <div className="App">
        <Router>
          <DynaNav />
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
          <Switch>
            <Route path="/mint">
              <MintComponent />
            </Route>
            <Route path="/gallery">
              <YourStripesComponent />
            </Route>
            <Route path="/about">
              <AboutComponent />
            </Route>
            <Route path="/">
                <HomeComponent />
            </Route>
          </Switch>
        </Router>
      </div>

    );
  
  }
}

export default App;
 