import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { RootState } from '../redux/store';

type NavbarPropsType = {
  activeElement: string
}

const Navbar: React.FC<NavbarPropsType> = ({ activeElement }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo right">Wallpapers Gallery</Link>
          <ul className="left hide-on-med-and-down">
            <li className={`navbar-item ${activeElement === 'home' ? 'active' : ''}`}><NavLink to="/">Gallery</NavLink></li>
            <li className={`navbar-item ${activeElement === 'create' ? 'active' : ''}`} ><NavLink to="/create">Create</NavLink></li>
            <li className={`navbar-item ${activeElement === 'favorite' ? 'active' : ''}`} ><NavLink to="/favorite">Favorite</NavLink></li>
            <li className={`navbar-item ${activeElement === 'search' ? 'active' : ''}`} ><NavLink to="/search">Search</NavLink></li>
            {!isAuth &&
              <li className={activeElement === 'auth' ? 'active' : ''} ><NavLink to="/auth">Sign in / Sign Up</NavLink></li>
            }
            {isAuth && (
              <>
                <li className={`dropdownbtn ${activeElement === 'profile' || activeElement === 'my' ? 'active' : ''}`} >
                  <NavLink to="/profile">Profile</NavLink>
                  <div className="my-dropdown-content">
                    <div className={`red accent-3 ${activeElement === 'profile' || activeElement === 'my' ? 'active' : ''}`} ><NavLink to="/my">My posts</NavLink></div>
                    <div className={`red accent-3 ${activeElement === 'profile' || activeElement === 'my' ? 'active' : ''}`} ><NavLink to="/feedback">Feedback</NavLink></div>
                  </div>
                </li>
              </>
            )
            }
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar