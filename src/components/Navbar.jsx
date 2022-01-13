import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from 'antd';
import { logout } from '../http';

export default function Navbar() {
  return (
    <div>
      <div id='navbar'>
        <div id='navbar-brand'>
          <Link to='/home'>OX test </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <NavLink exact to='products'>
                Products
              </NavLink>
            </li>

            <li>
              <Button type='primary' onClick={logout}>
                Log out
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
