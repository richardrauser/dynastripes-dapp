import React from 'react';

class PreviewComponent extends React.Component {

    render() {
        const svgString = encodeURIComponent(this.props.svg);
        const svgDataUri = `data:image/svg+xml,${svgString}`;

        return (
        // TODO: workout why Image is not working below, pivot to that instead of setting background
        <div className="previewContainer">
            <img alt="DynaStripes Preview" className="previewArtwork" src={svgDataUri}/>
        </div>
        );
    }
  }
  
export default PreviewComponent;