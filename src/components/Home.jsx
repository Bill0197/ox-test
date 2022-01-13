import React from 'react';
import { auth } from '../http';
import Navbar from './Navbar';

export default function Home() {
  auth();

  return (
    <div>
      <Navbar />
    </div>
  );
}
