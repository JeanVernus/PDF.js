import { Input, Form, Button, Icon } from 'semantic-ui-react';
import WebviewerBackend from './backends/webviewer';
import PDFViewer from './Components/PDFViewer';
import React, { Component } from 'react';
import PDF from '../../back/PDF/pdf';
import Swal from 'sweetalert2';
import Axios from 'axios';
import './CSS/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PDF: ""
    }
    this.myViewer = React.createRef();
    this.postPdf = this.postPdf.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, key) {
    if (key === "pdf") { this.setState({ PDF: event.target.files[0] }) };
    console.log("this.state.PDF", event.target.files[0]);

  }

  postPdf() {
    const { PDF } = this.state;
    const file = new FormData();
    file.append('file', PDF);
    Axios.post('http://localhost:5000/sendPdf', file, {
    }).then(res => {
      if (res.data === 'okPdf') {
        Swal.fire({
          title: 'PDF changé avec succès!',
          type: 'success',
          animation: true,
          customClass: {
            popup: 'animated tada'
          }
        })
      }
    })
  }

  RotateButton = () => {
    this.myViewer.current.rotate('clockwise');
  }
  CounterRotateButton = () => {
    this.myViewer.current.rotate('rotateCounterClockwise');
  }

  render() {
    console.log("log PDF", this.state.PDF);

    return (
      <div className="App">
        <h1 className="Title">Mon panel d'annotation</h1><br />
        <div className="Header">
          <Button className="animButton" onClick={this.RotateButton} color="teal" animated>
            <Button.Content visible>Rotation</Button.Content>
            <Button.Content hidden>
              <Icon name="share" />
            </Button.Content>
          </Button>
          <Form onSubmit={this.postPdf}>
            <Input className="input" action={{
              color: 'teal',
              labelPosition: 'right',
              icon: 'arrow right',
              content: 'Affaire',
            }}
              type='file' onChange={event => this.handleChange(event, "pdf")} />
          </Form>
          <Button className="animButton" onClick={this.CounterRotateButton} color="teal" animated>
            <Button.Content visible>Rotation</Button.Content>
            <Button.Content hidden>
              <Icon name="reply" />
            </Button.Content>
          </Button>
        </div><br />
        <PDFViewer ref={this.myViewer} backend={WebviewerBackend} src={PDF} />
      </div>
    );
  }
}

export default App;