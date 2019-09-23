import WebviewerBackend from './backends/webviewer';
import PDFViewer from './Components/PDFViewer';
import PDF from '../public/CV.JeanVERNUS.pdf';
import React, { Component } from 'react';
import './CSS/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PDFViewer backend={WebviewerBackend} src={PDF} />
      </div>
    );
  }
}

export default App;