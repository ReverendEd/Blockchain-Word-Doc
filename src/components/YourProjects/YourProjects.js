import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SHA256 from 'sha256';
import Cookies from 'universal-cookie';
import ProjectList from './ProjectList/ProjectList';
import Nav from '../../components/Nav/Nav';
import Header from '../Header/Header'
import Tokens from '../Editor/Tokens/Tokens'




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


  componentWillMount(){
    

  }

  componentDidMount() {
    // axios({
    //   url: '/port',
    //   method: 'GET'
    // })
    // .then((response)=>{
    //   console.log(response);
      
    // })
    // .catch((error)=>{
    //   console.log(error);
    // })
    axios({
      url: '/on-load',
      method: 'GET'
    })
    .then((response)=>{
      axios({
        url: '/consensus',
        method: 'GET',
      })
      .then((response)=>{
        console.log(response);
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
          axios({
            url: '/address',
            method: 'POST',
            data: {
              key: cookies.get('key')
            }
          })
        })
      })
    })
  }

  // myFunction() {
  //   var element = document.getElementById("myDIV");
  //   element.classList.add("darktheme");
  // }

  logout = () => {
    cookies.set('key','guest', []);
    cookies.set('username','guest', []);
    this.props.history.push('home');
    
  }

  openNewDocument(){
    cookies.set('document', ' ');
    cookies.set('title', ' ');
    this.props.history.push('/editor');
  }

  render() {

    return (
      <div id="myDIV">
        <Header title="Project Base" />
        <Nav openNewDocument={this.openNewDocument}/>
        <div>
          <h1
            id="welcome"
          >
            Welcome, { this.username }!
          </h1>
          <ProjectList history={this.props.history} documents={this.state.documents}/>
        </div>
        <Tokens />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

