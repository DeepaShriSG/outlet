import React from 'react'
import { Link } from 'react-router-dom';

function Payment() {
  return (
    <div style={styles.container}>
    <h1 style={styles.heading}>Thank you</h1>
    <p style={styles.message}>Your order is confirmed. Will reach you soon  &nbsp;
        <Link to="/" style={styles.link}>home</Link>.</p>
  </div>
  )
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
    },
    heading: {
      fontSize: '3rem',
      marginBottom: '1rem',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };
  

export default Payment