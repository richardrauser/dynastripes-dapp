import React from 'react';
import DynaSpan from '../components/DynaSpan';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { generateRandomStripesDataUri } from '../dynastripes.js';

class FeedbackPage extends React.Component {

    render() {
      const svgDataUri = generateRandomStripesDataUri();

      return (
        <div className="mainContent"  style={{background: svgDataUri}}>
          <div className="content">
            <h1>Feedback on <span className="dyna">DynaStripes</span></h1>

         
            <div className="deepContent">
              <p> 
                This is a <a className="externalLink" href="https://en.wikipedia.org/wiki/Software_release_life_cycle#Beta" target="_blank" rel="noreferrer">beta</a> version of the <DynaSpan/> <a className="externalLink" href="https://en.wikipedia.org/wiki/Decentralized_applicationdApp" target="_blank" rel="noreferrer">dApp</a> running on the Rinkeby testnet. Any feedback would be greatly appreciated so that improvements can be made before going live on the Ethereum mainnnet! 😁
                </p>
            <h5>
              What do you think?
            </h5>
            <ol>
              <li>Ease of use of this website</li>
              <li>Ease of the NFT purchase process</li>
              <li>Mint interface options. Enough? Too many options? Other desired options?</li>
              <li>Design of this website</li>
              <li>Clarity of explanations</li>
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

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>


            <form name="feedback" method="post">
            <input type="hidden" name="form-name" value="feedback" />
              <p>
                <label>Email (optional): <input type="email" name="email"/></label>
              </p>
              <p>
                <label>Message: <textarea name="message"></textarea></label>
              </p>
              <p>
                    <Button type="submit" variant="primary">Send</Button>

              </p>
            </form>
          </div>
            or email <a className="externalLink" href="mail:volstrate@gmail.com">volstrate@gmail.com</a>
          </div>
        </div>
      );
    }
  }

export default FeedbackPage;