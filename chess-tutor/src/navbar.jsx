import React from 'react';

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#333',
  color: '#fff',
  fontFamily: 'Arial, sans-serif',
};

const titleStyle = {
  fontSize: '1.5em',
};

const authorStyle = {
  fontSize: '1em',
};

const NavBar = () => (
  <nav style={navStyle}>
    <h1 style={titleStyle}>Chess-Tutor</h1>
    <p style={authorStyle}>by Ezekiel Norman</p>
  </nav>
);

export default NavBar;
