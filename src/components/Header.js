import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Link } from 'react-router-dom';

import { fetchPublic } from '../services/fetch';

export default class Header extends Component {
  submitSearch(e) {
    e.preventDefault();
    if (!this.querySearch.value) {
      PubSub.publish('photo-search-exit');
    } else {
      fetchPublic(`/public/fotos/${this.querySearch.value}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Não foi possível completar a busca');
          }
        })
        .then(searchResult => {
          PubSub.publish('photo-search', searchResult);
        })
        .catch(e => {
          alert(e.message);
        })
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