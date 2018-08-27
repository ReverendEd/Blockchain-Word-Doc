import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem/ListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'

const mapStateToProps = state => ({
    user: state,
});

class ProjectList extends Component {
  componentDidMount() {
      console.log(this.props.documents);
      
      
  }

  render() {
    const documentList = this.props.documents.map((document, index)=>{
        return(
            <ListItem history={this.props.history} document={document[document.length-1]} historyList={document} key={index} />
        )
    })

    return (
        <div>
              {documentList}
        </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ProjectList);