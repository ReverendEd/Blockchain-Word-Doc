import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const mapStateToProps = state => ({
    user: state,
  });

class ProjectList extends Component {
  componentDidMount() {
  }

  openEditorWithFile = ()=>{
      console.log(this.props.document.document);
      this.props.dispatch({type: 'EDIT_DOC', payload: this.props.document})
      cookies.set('document', this.props.document.document)
      this.props.history.push('/editor')
      
  }

  render() {
    return (
      <li onClick={()=>this.openEditorWithFile(this.props.document.document)}>
          {this.props.document.title}
      </li>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ProjectList);