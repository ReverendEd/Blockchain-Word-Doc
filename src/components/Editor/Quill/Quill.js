import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.css';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import axios from 'axios';

const cookies =   new Cookies();

const mapStateToProps = state => ({
  user: state,
});

class Quill extends Component {
    constructor(props) {
      super(props)
      this.state = { 
        title: cookies.get('title'),
        text: cookies.get('document') 
      }
      this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
    }
  
    handleChange(value) {
      this.setState({ text: value })
    }

    save(){
      // let document = {
      //   title: 'title',
      //   document: this.state.text
      // }
      // this.props.dispatch({type: 'EDIT_DOC', payload: document})
      cookies.set('document', this.state.text, [])
      cookies.set('title', this.props.title, [])
      axios({
        url: '/document/broadcast',
        method: 'POST',
        data:{
          owner: cookies.get('key'),
          title: this.props.title,
          document: this.state.text
        }
      })
      .then((response)=>{
        alert('document saved');
        axios({
          url: '/mine',
          method: 'GET'
        })
      })
    }
  
    render() {
      return (
        <div className="quill-div">
            <button onClick={()=> this.save()}>
                Save
            </button>
            <ReactQuill id="editor-container" value={this.state.text} onChange={this.handleChange} />
        </div>
      )
    }
}

export default connect(mapStateToProps)(Quill);