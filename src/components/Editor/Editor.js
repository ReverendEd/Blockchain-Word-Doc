import React, { Component } from 'react';
import { connect } from 'react-redux';
import Quill from './Quill/Quill'

import Nav from '../../components/Nav/Nav';


const mapStateToProps = state => ({
  state
});

class Editor extends Component {
  componentDidMount() {
  }

  // logout = () => {
  //   //this.props.dispatch(triggerLogout());
  //   this.props.history.push('/home');
  // }

  render() {
    console.log(this.props.state);
    

    return (
      <div>
        <Nav />
        <div>
          <p>hi this is an editor</p>
          <Quill save={this.save} doc={this.props.state.Reducer.document}/>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Editor);