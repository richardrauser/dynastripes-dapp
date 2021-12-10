import React from 'react';

import twitterLogo from '../images/twitter.png';
import discordLogo from '../images/discord_logo1600.png';
import emailLogo from '../images/email.png';

class SocialLinks extends React.Component {

    render() {
        return (
        <div className="socialLinks">
            <a className="externalLink" href="https://twitter.com/RichardRauser"  target="_blank" rel="noreferrer">
                <img className="socialLogo" alt="twitter logo" src={twitterLogo}/>
            </a>
            <a className="externalLink" href="https://discord.gg/zXqKjJRE"  target="_blank" rel="noreferrer">
                <img className="socialLogo" alt="discord logo" src={discordLogo}/>
            </a>
            {/* <a className="externalLink" href="mail:volstrate@gmail.com">
                <img className="socialLogo" alt="email logo" src={emailLogo}/>
            </a> */}
        </div>
  );
    }
}

export default SocialLinks;