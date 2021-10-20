
import React from 'react';
import YourStripesComponent from '../components/YourStripesComponent';
import RecentStripesComponent from '../components/RecentStripesComponent';

class GalleryPage extends React.Component {

    render() {
        return (
            <div>
                <div className="mainContent">
                    <YourStripesComponent />
                    <RecentStripesComponent />
                </div>
            </div>
        );
    }
}

export default GalleryPage;