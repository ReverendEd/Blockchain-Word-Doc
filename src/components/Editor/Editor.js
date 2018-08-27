import React, { Component } from 'react';
import { connect } from 'react-redux';
import Quill from './Quill/Quill'
import Cookies from 'universal-cookie';
import Tokens from './Tokens/Tokens';
import axios from 'axios';
import Input from '@material-ui/core/Input';

import Nav from '../../components/Nav/Nav';

const cookies = new Cookies();

const mapStateToProps = state => ({
  state
});

class Editor extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: cookies.get('title'),
      tokens: ''
    }
  }

  componentDidMount() {

  }

  handleTitle(event){
    this.setState({
      title: event.target.value
    })
  }


  render() {
    
    return (
      <div>
        <Nav />
        <div>
          <Input placeholder="Insert Title" onChange={(e)=>this.handleTitle(e)} value={this.state.title}/>
          <Quill  title={this.state.title} save={this.save} doc={this.props.state.Reducer.document}/>
        </div>
        <div>

        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Editor);