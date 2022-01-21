import React, { FC, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './SideNav.css';
import {
  Home,
  PieChart,
  DollarSign,
  UserPlus,
  Archive,
  User,
} from 'react-feather';
import { UserInitialState, UserContext } from '../../context';

interface SideNavProps {}

interface Links {
  name: string;
  to: string;
  isSignout?: boolean;
  icon: any;
}

const links: Links[] = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: <Home id='icon' />,
  },
  {
    name: 'Expenses',
    to: '/expenses',
    icon: <Archive id='icon' />,
  },
  {
    name: 'Reports',
    to: '/reports',
    icon: <PieChart id='icon' />,
  },
  {
    name: 'Budget',
    to: '/budget',
    icon: <DollarSign id='icon' />,
  },
  {
    name: 'Profile',
    to: '/reports',
    icon: <UserPlus id='icon' />,
  },
  {
    name: 'Sign out',
    to: '/',
    isSignout: true,
    icon: null,
  },
];

const SideNav: FC<SideNavProps> = ({}: SideNavProps) => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  return (
    <ul className='ul'>
      {links.map((link, index) =>
        link.isSignout ? (
          <form
            action=''
            onClick={(e) => {
              e.preventDefault();

              /**
               * Set the user to its initial (empty) state
               */
              setUser(UserInitialState);

              navigate('/');
            }}
          >
            <input
              id='signout'
              type='submit'
              value='Sign out'
              style={{ color: '#fe4949' }}
            />
          </form>
        ) : (
          <li>
            <NavLink key={index} id='actual-link' className='link' to={link.to}>
              {link.icon} {link.name}
            </NavLink>
          </li>
        )
      )}
    </ul>
  );
};

export default SideNav;
