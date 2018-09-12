import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table'

const cookies = new Cookies();

const mapStateToProps = state => ({
    user: state,
});

class ProjectList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showHistory: false
        }
    }


    componentDidMount() {
    }

    openEditorWithFile = () => {
        console.log(this.props.document.document);
        this.props.dispatch({ type: 'EDIT_DOC', payload: this.props.document })
        cookies.set('document', this.props.document.document)
        cookies.set('title', this.props.document.title)
        this.props.history.push('/editor')
    }

    displayHistory = () => {
        this.setState({
            showHistory: !this.state.showHistory
        })
    }

    openHistory = (document) => {
        console.log(document.document);
        this.props.dispatch({ type: 'EDIT_DOC', payload: document })
        cookies.set('document', document.document)
        cookies.set('title', document.title)
        this.props.history.push('/editor')
    }

    render() {

        let historyList;

        if (this.state.showHistory) {
            
            historyList = this.props.historyList.map((document, index) => {
                console.log(document);
                return (
                    <TableCell key={index}><Button onClick={() => this.openHistory(document)} >{index}</Button></TableCell>
                )
            })
        }

        return (
            <Table className="center">
                <TableCell><h3>{this.props.document.title}</h3></TableCell>
                <TableCell><Button onClick={() => this.openEditorWithFile()}>Open Document</Button></TableCell>
                <TableCell><Button onClick={() => this.displayHistory()}>See History</Button></TableCell>
                <Table>
                    <div className="center">
                        {historyList}
                    </div>
                </Table>
            </Table>
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ProjectList);