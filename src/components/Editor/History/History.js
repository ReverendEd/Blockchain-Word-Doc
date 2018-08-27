import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    state
});

class History extends Component {
  componentDidMount() {
      console.log(this.props.documents);
  }

  render() {
    

    return (
      <div>
          <ul>
              
          </ul>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default History;