import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { loginForm } from './styles';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';

class FormGroup extends Component {
  render() {
    return <div className={bootstrap['form-group']}>{this.props.children}</div>
  }
}

class BtnPrimary extends Component {
  render() {
    return <button className={[ bootstrap['btn'], bootstrap['btn-primary'], bootstrap['btn-block'] ].join(' ')}>{this.props.value}</button>
  }
}

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  static onEnter({store, nextState, replaceState, callback}) {
    callback();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    axios.post('/api/login', { username, password })
      .then((result) => {
      result = result.data;

      if( result.status == 1 ) {
        alert( result.msg );
        window.location.href = '/dashboard';
      }
    });
  }

  render() {
  const { username, password } = this.state;
  return <div className={loginForm}><Helmet title='Login' />
  <img src="/static/images/logo.jpg"/><br /><br />
    
      <form onSubmit={this.onSubmit}>
        <FormGroup>
            <input type="text" className={bootstrap['form-control']} placeholder="Username" required="Required" name="username" value={username} onChange={this.onChange}></input>
        </FormGroup>

        <FormGroup>
            <input type="text" className={bootstrap['form-control']} placeholder="Password" required="Required"  name="password" value={password} onChange={this.onChange}></input>
        </FormGroup>

        <BtnPrimary value="Login" />
      </form>
    </div>;
  }

}
