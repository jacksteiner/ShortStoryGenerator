import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material'

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        {/* <h2 className="nav-title">Horror Story Generator</h2> */}
        <Typography 
        className='nav-title'
        variant='h4'
        >Horror Story Generator</Typography>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            <Typography>Login / Register</Typography>
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link> */}

            <Link className='navLink' to='/generate/page'>
              <Typography>Generate</Typography>
            </Link>

            <Link className='navLink' to='/all/stories'>
              <Typography>All Stories</Typography>
            </Link>

            <Link className='navLink' to='/favorite/stories'>
              <Typography>Favorites</Typography>
            </Link>

            <Link className='navLink' to="/examples">
              <Typography>Examples</Typography>
            </Link>

            <Link className="navLink" to="/about">
              <Typography>About</Typography>
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;
