import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { parse as parseQuery } from 'query-string';

class Login extends Component {

  constructor(props) {
    super(props);

    const msgBundle = {
      'no_login' : 'Você precisa estar logado para acessar esse endereço'
    };
    const msgCode = props.location && props.location.search && parseQuery(props.location.search)['error_msg'];

    this.state = {
      msg: msgBundle[msgCode] || ''
    };
  }

  sendForm(e) {
    e.preventDefault();
    fetch('http://localhost:8080/api/public/login', {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify({
        login: this.login.value,
        senha: this.password.value
      })
    })
      .then(response => {
        if (response.ok === true) {
          return response.text();
        } else {
          throw new Error('Não foi possível fazer login');
        }
      })
      .then(token => {
        localStorage.setItem('auth-token', token)
        this.props.history.push('/timeline');
      })
      .catch(error => {
        this.setState({ msg: error.message });
      })
  }

  render() {
    return (
      <div className="login-box">
        <h1 className="header-logo">Instalura</h1>
        <span>{this.state.msg}</span>
        <form onSubmit={this.sendForm.bind(this)}>
          <input type="text" ref={input => this.login = input} />
          <input type="password" ref={input => this.password = input}/>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(Login);