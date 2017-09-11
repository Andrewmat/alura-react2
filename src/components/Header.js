import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Link } from 'react-router-dom';

import api from '../logic/TimelineApi';

export default class Header extends Component {
  submitSearch(e) {
    e.preventDefault();
    if (!this.querySearch.value) {
      PubSub.publish('photo-search-exit');
    } else {
      this.props.store.dispatch(api.searchPhotos({query: this.querySearch.value}));
    }
  }

  render() {
    return (
      <header className="header container">
        <h1 className="header-logo">
          Instalura
        </h1>

        <form className="header-busca" onSubmit={this.submitSearch.bind(this)}>
          <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.querySearch = input} />
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