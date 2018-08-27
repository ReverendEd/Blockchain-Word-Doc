import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import '../Info.css'


const mapStateToProps = state => ({
  user: state.user,
});

class BlockItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            showInfo: 'false',
        }
    }

    handleClick = (val)=>{
        console.log('in handleClick');
        this.setState({
            showInfo: val
        })
        console.log(this.state.showInfo);
    }

    render() {

        let documentsArray = this.props.block.documents.map((document, index)=>{
            return(
                <li key={index}>Owner: {document.owner.substring(0,5)} Title: {document.title}</li>
            )
        })

        let transactionssArray = this.props.block.transactions.map((transaction, index)=>{
            return(
                <li key={index}>From: {transaction.sender.substring(0, 5)} To: {transaction.recipient.substring(0, 5)} Amount: {transaction.amount} </li>
            )
        })


        let listItem;
        if (this.state.showInfo === 'false') {
                listItem = (
                        <div className="image" >
                            <p>Previous Hash: {this.props.block.previousHash.substring(0, 3)}</p>
                            <p>Hash: {this.props.block.hash.substring(0,3)}</p>                 
                            <Button variant="contained" color="grey" onClick={() =>this.handleClick('documents')}>{this.props.block.documents.length} Documents</Button> 
                            <Button variant="contained" color="grey" onClick={() =>this.handleClick('transactions')}>{this.props.block.transactions.length} Transactions</Button> 
                        </div>
                )
            }          
        else if (this.state.showInfo === 'documents') {
            listItem = (
                <div className="image" onClick={() =>this.handleClick('false')}>
                    <ul>
                        {documentsArray}
                    </ul>
                </div>
            )
        }
        else if (this.state.showInfo === 'transactions') {
            listItem = (
                <div className="image" onClick={() =>this.handleClick('false')}>
                    <ul>
                        {transactionssArray}
                    </ul>
                </div>
            )
        }
    
        return (
            <div className="card" >
                {listItem}
            </div>
        );
    
      }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(BlockItem);