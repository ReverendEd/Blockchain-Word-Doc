import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SHA256 from 'sha256';
import Cookies from 'universal-cookie';

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

  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      alert('fill out your login information')
    } else {
      let info = {
        username: this.state.username,
        password: SHA256(this.state.password)
      }
      cookies.set('key', SHA256(this.state.username+this.state.password), []);
      cookies.set('username', this.state.username, []);
      this.props.dispatch({type: 'LOGIN', payload: info});
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

  handleTryIt = ()=>{
    alert('any documents made while trying this app out will be public to anyone else trying this app.')
    this.props.dispatch({type: 'LOGIN', payload: {username: 'guest', password: 'guest'}});
    this.props.history.push('/yourprojects')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <h1>Login/Register</h1>
          <div>
            <label htmlFor="username">
              <input
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Email Address"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <input
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleInputChange}
              />
            </label>
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Submit"
            />
          </div>
          <div>
          <input
              type="button"
              name="tryItOut"
              value="Try It Out!"
              onClick={()=>this.handleTryIt()}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginPage);
