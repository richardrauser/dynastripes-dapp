import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import { ToastContainer } from 'react-toastify';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import DynaNav from './components/DynaNav';
import HomePage from './pages/HomePage';
import MintPage from './pages/MintPage';
import GalleryPage from './pages/GalleryPage';
import HowToPage from './pages/HowToPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import FeedbackPage from './pages/FeedbackPage';

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
            position="bottom-left"
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
              <MintPage />
            </Route>
            <Route path="/gallery">
              <GalleryPage />
            </Route>
            <Route path="/howto">
              <HowToPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/admin"> 
              <AdminPage />
            </Route>
            <Route path="/feedback">
              <FeedbackPage />
            </Route>
            <Route path="/">
                <HomePage />
            </Route>
          </Switch>
        </Router>
      </div>

    );
  
  }
}

export default App;
 