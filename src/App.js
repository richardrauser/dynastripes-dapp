import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';
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
import TokenPage from './pages/TokenPage';
import HowToPage from './pages/HowToPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import FeedbackPage from './pages/FeedbackPage';

import RouteChangeTracker from './utils/RouteChangeTracker';

ReactGA.initialize("UA-85524090-8");

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
          <Helmet>
            <meta charset="utf-8"/>
            <title>DynaStripes - generative, on-chain NFT art composed of stripes where you earn all royalties</title>

            {/* <link rel="icon" href="%PUBLIC_URL%/favicon.ico"/> */}
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#000000"/>
            <meta data-rh="true" name="twitter:card" content="summary_large_image"/>
            <meta data-rh="true" name="twitter:site" content="@volstrate"/>
            <meta data-rh="true" name="twitter:creator" content="@volstrate"/>

            <meta data-rh="true" name="twitter:title" content="DynaStripes: on-chain, generative NFT art composed of colourful, animated stripes"/>
            <meta data-rh="true" name="twitter:image:src" content="https://www.dynastripes.com/DynaSamples.png"/>
            <meta data-rh="true" name="twitter:image:alt" content="A lovely selection of on-chain, generative DynaStripes NFT artworks"/>
            <meta property="og:title" content="DynaStripes: on-chain, generative NFT art composed of colourful, animated stripes"/>
            <meta property="og:description" content="DynaStripes is user-directed, generative, on-chain NFT art where you earn all royalties. Dynastripes are colourful, minimal and animated NFT artworks composed of stripes. Configure and preview the NFT artwork prior to minting as an ERC-721 token, and ERC-2981 is used to pay you royalties on all secondary sales." />
            <meta property="og:image" content="%PUBLIC_URL%/DynaSamples.png"/>
            <meta name="description" content="DynaStripes is user-directed, generative, on-chain NFT art where you earn all royalties. Dynastripes are colourful, minimal and animated NFT artworks composed of stripes. Configure and preview the NFT artwork prior to minting as an ERC-721 token, and ERC-2981 is used to pay you royalties on all secondary sales."/>
            {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            See https://developers.google.com/web/fundamentals/web-app-manifest/         */}
            {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
        </Helmet>

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
        <Router>
          <RouteChangeTracker />
          <DynaNav />
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
            <Route path="/token/:tokenId" component={ TokenPage }>
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
 