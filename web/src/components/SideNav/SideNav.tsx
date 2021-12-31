import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './SideNav.css';

interface SideNavProps {}

const links = [
  {
    name: 'Dashboard',
    to: '/dashboard',
  },
  {
    name: 'Monthly Expenses',
    to: '/expenses',
  },
  {
    name: 'View Settings',
    to: '/',
  },
  {
    name: 'Sign out',
    to: '/',
    isSignout: true,
  },
];

const SideNav: FC<SideNavProps> = ({}: SideNavProps) => {
  const navigate = useNavigate();

  return (
    <ul className="ul">
      {links.map((link, index) =>
        link.isSignout ? (
          <form
            action=""
            onClick={e => {
              e.preventDefault();

              navigate('/');
            }}
          >
            <input id="signout" type="submit" value="Sign out" />
          </form>
        ) : (
          <li>
            <NavLink key={index} id="actual-link" className="link" to={link.to}>
              {link.name}
            </NavLink>
          </li>
        ),
      )}
    </ul>
  );
};

export default SideNav;
