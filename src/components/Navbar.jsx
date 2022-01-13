import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <div id='navbar'>
        <div id='navbar-brand'>
          <a href='/home'>OX test </a>
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
          </ul>
        </nav>
      </div>
    </div>
  );
}
