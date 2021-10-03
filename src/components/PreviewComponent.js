import React from 'react';

class PreviewComponent extends React.Component {

    constructor(props) {
      super(props);
    }
  
    render() {
        console.log("Rendering preview: " + this.props.svg)
        const svgString = encodeURIComponent(this.props.svg);
        const svgDataUri = `url("data:image/svg+xml,${svgString}")`;

        return (
        // TODO: workout why Image is not working below, pivot to that instead of setting background
        <div className="previewContainer">
            <div className="previewArtwork" style={{backgroundImage: svgDataUri}}>
            </div>
        </div>
        );
    }
  }
  
export default PreviewComponent;