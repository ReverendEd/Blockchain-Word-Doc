import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem/ListItem'

class ProjectList extends Component {
  componentDidMount() {
      console.log(this.props.documents);
  }

  render() {
    const documentList = this.props.documents.map((document, index)=>{
        return(
            <ListItem history={this.props.history} document={document[document.length-1]} key={index} />
        )
    })

    return (
      <div>
          <ul>
              {documentList}
          </ul>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default ProjectList;