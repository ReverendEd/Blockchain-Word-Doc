import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import './Tokens.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import swal from 'sweetalert'

const cookies = new Cookies();

const mapStateToProps = state => ({
    user: state,
});

class Tokens extends Component {
    constructor(props) {
        super(props)

        this.state = {
            address: cookies.get('key'),
            tokens: 0,
            transaction: {
                recipient: '',
                amount: 0
            },
            visible: false
        }
    }


    componentDidMount() {
        axios({
            url: `/address/${this.state.address}`,
            method: 'GET'
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    tokens: response.data.addressBalance
                })
            })
    }

    componentDidUpdate() {

        //get address
        //get address info
    }


    handleChangeFor = (propertyName)=>{
        return (event)=>{
            this.setState({
                ...this.state,
                [propertyName]: event.target.value
            })
        }
    }

    handleTransactionChange = (type)=>{
        return (event)=>{
            console.log(type);
            
        
            this.setState({
                ...this.state,
                transaction:{
                    ...this.state.transaction,
                    [type]: event.target.value
                }
            })
            console.log(this.state.transaction);
        }
    }

    sendTransaction(){
        if (this.state.tokens >= this.state.transaction.amount) {
            axios({
                url: '/transaction/broadcast',
                method: 'POST',
                data: {
                    amount: this.state.transaction.amount,
                    sender: this.state.address,
                    recipient: this.state.transaction.recipient,
                }
            })
            .then((response)=>{
                swal('your transaction was sent')
            })
            .catch((error)=>{
                console.log('your transaction wasnt sent');
            })
        }
        else{
            swal('you do not have the coins for this')
        }
    }
    
    isVisible(){
        this.setState({
            ...this.state,
            visible: !this.state.visible
        })
    }


    render() {

        let content;

        if (this.state.visible) {
            content = (
                <div>
                    <i  onClick={()=>this.isVisible()}>hide</i>
                    <p>{this.state.address.substring(0, 5)}</p>
                    <p>{this.state.tokens}</p>
                    <div class="giveMargin">
                        <h3>Send Coins</h3>        
                        <Input placeholder="Recipient" onChange={this.handleTransactionChange('recipient')}/>
                        <Input type="number" placeholder="Amount" onChange={this.handleTransactionChange('amount')}/>
                        <Button onClick={()=>this.sendTransaction()}>Send</Button>
                    </div>
                </div>
            )
        }
        else{
            content = (
                <Button onClick={()=>this.isVisible()}>Token Info</Button>
            )
        }

        return (
            <div  className="widget">
                {content}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Tokens);