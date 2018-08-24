import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import './Info.css'
import BlockItem from './BlockItem/BlockItem'

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  constructor(props){
    super(props)

    this.state = {
      blockchain: []
    }
  }



  componentDidMount() {
    axios({
      url: '/blockchain',
      method: 'GET'
    })
    .then((response)=>{
      console.log(response.data);
      this.setState({
        blockchain: response.data.chain
      })
    })
  }

  render() {

    let visualDisplay = this.state.blockchain.map((block, index)=>{
      return(
        <BlockItem block={block} key={index}/>
      )
    })

    return (
      <div>
        <Nav />
        <div>
            {visualDisplay}
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);