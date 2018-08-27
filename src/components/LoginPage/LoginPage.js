import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SHA256 from 'sha256';
import Cookies from 'universal-cookie';
import Header from '../Header/Header'
import Form from '@material-ui/core/FormGroup'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import swal from 'sweetalert';

const cookies = new Cookies();

const mapStateToProps = state => ({
  user: state.username,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    cookies.set('key', 'guest')
    cookies.set('username', 'guest')
    cookies.set('title', '')
    cookies.set('document', '')
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      swal('Fill out your Login information.')
    } else {
      let info = {
        username: this.state.username,
        password: SHA256(this.state.password)
      }
      cookies.set('key', SHA256(this.state.username + this.state.password), []);
      cookies.set('username', this.state.username, []);
      this.props.dispatch({ type: 'LOGIN', payload: info });
      this.props.history.push('/yourprojects')
    }
  }

  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleTryIt = () => {
    swal('Any documents made on "guest" will be public to anyone else also trying this app.')
    cookies.set('key', 'guest', []);
    cookies.set('username', 'guest', []);
    this.props.dispatch({ type: 'LOGIN', payload: { username: 'guest', password: 'guest' } });
    this.props.history.push('/yourprojects')
  }

  render() {
    return (
      <div>
        <Header title="Project Base" />
        <form onSubmit={this.login}>
          <h2>Login/Register</h2>
          <div>
            <label htmlFor="username">
              <Input
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <Input
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div className="button">
            <Button
              variant="outlined"
              type="button"
              name="tryItOut"
              value="Try It Out!"
              onClick={() => this.handleTryIt()}
              size="small"
            >
              Try It Out!
          </Button>
            <Button
              variant="outlined"
              type="submit"
              name="submit"
              value="Submit"
              onClick={this.login}
              size="small"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
