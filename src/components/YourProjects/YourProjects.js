import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SHA256 from 'sha256';
import Cookies from 'universal-cookie';
import ProjectList from './ProjectList/ProjectList';

import Nav from '../../components/Nav/Nav';

// import { triggerLogout } from '../../redux/actions/Actions';

const mapStateToProps = state => ({
  user: state,
});

const cookies = new Cookies();

class UserPage extends Component {
  constructor(props){
    super(props)

    this.state= {
      documents: []
    }
  }

  username = this.props.user.Reducer.user.username || cookies.get('username');

  key = SHA256(this.props.user.Reducer.user.username + this.props.user.Reducer.user.password) ;

  componentDidMount() {

    axios({
      url: `/documents/${cookies.get('key')}`,
      method: 'GET'
    })
    .then((response)=>{
      console.log(response);
      this.setState({
        documents:[
        ...response.data.documents
        ]
      })
      console.log(this.state);
      
    })
  }

  logout = () => {
    cookies.set('key','guest', []);
    cookies.set('username','guest', []);
    this.props.history.push('home');
    
  }

  openNewDocument(){
    cookies.set('document', ' ');
    this.props.history.push('/editor');
  }

  render() {

    return (
      <div>
        <Nav />
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.username }
          </h1>
          <ProjectList history={this.props.history} documents={this.state.documents}/>
          <button
            onClick={()=>this.openNewDocument()}
          >
            Editor
          </button>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

