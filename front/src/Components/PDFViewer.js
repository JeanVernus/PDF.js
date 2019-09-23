import React, { Component } from 'react';

class PDFViewer extends Component {
  constructor(props) {
    super(props);
    this.viewerRef = React.createRef();
    this.backend = new props.backend();
    this.instance= null;
    this.docViewer = null;
    this.annotManager = null;
  }

  componentDidMount() {
    const { src } = this.props;
    const element = this.viewerRef.current;
    this.backend.init(src, element);
  }
  

  rotate = (direction) => {
    // être sur que le backend a implementer la même fonction
    if (this.backend.rotate) {
      this.backend.rotate(direction);
    }
  }


  render() {
    return (
      <div className="displayViewer" ref={this.viewerRef} id='viewer' style={{ width: '90%', height: '80%' }}></div>
    );
  }
}

export default PDFViewer;