import React from 'react';


class DynaSpan extends React.Component {

    render() {
        if (this.props.link !== undefined && this.props.link === true) {
            return (
                <a className="externalLink" href="https://www.dynastripes.com/" target="_blank" rel="noreferrer">
                    <span className="dyna">DynaStripes</span>
                </a>
            );
              
        } else {
            return (
                <span className="dyna">DynaStripes</span>
            );
        }
    }
}

export default DynaSpan;