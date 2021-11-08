
import React from 'react';
import DynaSpan from '../components/DynaSpan';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { generateRandomStripesDataUri } from '../utils/DynaStripes.js';
import SocialLinks from '../components/SocialLinks';

class FeedbackPage extends React.Component {

    render() {
      const svgDataUri = generateRandomStripesDataUri();

      return (
        <div className="mainContent"  style={{background: svgDataUri}}>
          <div className="content">
            <h1>Feedback on <DynaSpan/></h1>

         
            <div className="deepContent">
              <p> 
                This is a <a className="externalLink" href="https://en.wikipedia.org/wiki/Software_release_life_cycle#Beta" target="_blank" rel="noreferrer">beta</a> version of the <DynaSpan/> <a className="externalLink" href="https://en.wikipedia.org/wiki/Decentralized_applicationdApp" target="_blank" rel="noreferrer">dApp</a> running on Rinkeby testnet. Feedback would be greatly appreciated to help inform the final product! 😁
              </p>
              <h5>
                What do you think about:
              </h5>
              <ol>
                <li>Website ease of use</li>
                <li>Ease of NFT purchase</li>
                <li>Mint interface options</li>
                <li>Artwork quality</li>
                <li>Design of this website</li>
                <li>Clarity of explanations</li>
                <li>Anything else at all!</li>
              </ol>

              <Form name="feedback" method="POST">
                <input type="hidden" name="form-name" value="feedback" />
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    (Optional) We'll never share this with 3rd parties
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Your feedback</Form.Label>
                  <Form.Control as="textarea" name="feedback" rows={3} />
                </Form.Group>

                <center>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </center>
              </Form>

              </div>

              <SocialLinks/>
            </div>
        </div>
      );
    }
  }

export default FeedbackPage;