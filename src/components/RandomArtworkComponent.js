

class RandomArtworkComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        svg: ""
      }
  
      this.getSvg = this.getSvg.bind(this);
    }
  
    getSvg() {
      console.log("Getting SVG.");
      const svg = generateDynaStripes();
      console.log(svg);
      this.setState({
        loading: false,
        svg: svg
      });
    }
  
    componentDidMount() {
      this.getSvg();
    }
  
    render() {
      if (this.state.loading == true) {
        return (
          <div className="dynaStripesArtwork"> 
            <Spinner animation="grow" />
          </div>   
        );
      } else {
        const svgString = encodeURIComponent(this.state.svg);
        const svgDataUri = `url("data:image/svg+xml,${svgString}")`;
        return (
          <div className="dynaStripesArtwork" style={{background: svgDataUri}}>
            {/* <Image source={{uri: svgDataUri}}/> */}
          </div>
        );
      }
    }
  }
  
  