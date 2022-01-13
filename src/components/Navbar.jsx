import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { logout } from '../http';

export default function Navbar() {
  const activeStyles = {
    background: '#1890ff',
    color: '#fff',
  };
  return (
    <div>
      <div id='navbar'>
        <div id='navbar-brand'>
          <Link to='/home'>OX test </Link>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink activeStyle={activeStyles} to='/home'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyles} exact to='/products'>
                Products
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeStyles} exact to='/products-list'>
                Products List
              </NavLink>
            </li>

            <li>
              <Button type='primary' size='large' onClick={logout}>
                Log out
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
