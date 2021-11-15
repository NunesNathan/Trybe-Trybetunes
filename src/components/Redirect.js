import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

export default class Redirect extends Component {
  render() {
    return (
      <Switch>
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile" exact component={ Profile } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/" exact component={ Login } />
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}
