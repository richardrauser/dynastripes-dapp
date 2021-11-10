
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
                Got thoughts on <DynaSpan/>? Get in touch!
              </p>

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