import React, { Component } from 'react';
import { connect } from 'react-redux';
import PubSub from 'pubsub-js';
import { Link } from 'react-router-dom';

import api from '../logic/TimelineApi';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      alert: false
    };
  }

  submitSearch(e) {
    e.preventDefault();
    this.querySearch.value
      ? this.props.search(this.querySearch.value)
      : this.props.list();
  }

  render() {
    return (
      <header className="header container">
        <h1 className="header-logo">
          Instalura
        </h1>

        <form className="header-busca" onSubmit={this.submitSearch.bind(this)}>
          <input type="text" name="search" placeholder="Pesquisa" className={`header-busca-campo${this.props.alert ? ' header-busca-campo-alert' : ''}`} ref={input => this.querySearch = input} />
          <input type="submit" value="Buscar" className="header-busca-submit" />
        </form>
        <nav>
          <ul className="header-nav">
            <li className="header-nav-item">
              <Link to={'/'}>♡</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  alert: !!state.header.message
});

const mapDispatchToProps = dispatch => ({
  search: (query) => dispatch(api.searchPhotos({ query })),
  list: () => dispatch(api.list)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);