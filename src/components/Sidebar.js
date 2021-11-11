import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import Search from '../pages/Search';

export default class Sidebar extends Component {
  render() {
    return (
      <Switch>
        <Route>
          <Link to="/search"><Search /></Link>
          <Link to="/album/:id"><Album /></Link>
          <Link to="/favorites"><Favorites /></Link>
          <Link to="/profile"><Profile /></Link>
          <Link to="/profile/edit"><ProfileEdit /></Link>
          <Link to="/" exact><Login /></Link>
          <Link to="*"><NotFound /></Link>
        </Route>
      </Switch>
    );
  }
}
