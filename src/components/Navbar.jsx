import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { getCurrentUser, logout } from '../http';

export default function Navbar() {
  const activeStyles = {
    background: '#1890ff',
    color: '#fff',
  };

  const { pathname } = useLocation();

  const user = getCurrentUser();

  return (
    <div>
      <div id='navbar'>
        <div id='navbar-brand'>
          <Link to='#/home'>OX test </Link>
        </div>
        <nav>
          <ul>
            {user && (
              <li>
                <Link
                  to='#/home'
                  style={pathname === '/home' ? activeStyles : {}}
                >
                  Home
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link
                  to='#/products'
                  style={pathname === '/products' ? activeStyles : {}}
                >
                  Products
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link
                  to='#/products-list'
                  style={pathname === '/products-list' ? activeStyles : {}}
                >
                  Products List
                </Link>
              </li>
            )}

            {user && (
              <Button type='primary' size='large' onClick={logout}>
                Log out
              </Button>
            )}

            {!user && (
              <Link to='#/sign-in'>
                <Button type='primary' size='large'>
                  Log in
                </Button>
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
