
import React from 'react';
import YourStripesComponent from '../components/YourStripesComponent';
import RecentStripesComponent from '../components/RecentStripesComponent';

class GalleryPage extends React.Component {

    render() {
        return (
            <div>
                <div className="mainContent">
                    <YourStripesComponent />
                </div>

                <div className="mainContent">
                    <RecentStripesComponent />
                </div>
            </div>
        );
    }
}

export default GalleryPage;