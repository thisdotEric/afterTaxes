import React, { FC, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SideNavLinksWrapper } from './SideNav.styles';
import {
  Home,
  PieChart,
  Archive,
  UserPlus,
  ShoppingCart,
  Settings,
} from 'react-feather';
import { UserContext } from '../../context';
import { formattedDateToday } from '../../constants/date';

interface SideNavProps {}

interface Links {
  name: string;
  to: string;
  isSignout?: boolean;
  icon: JSX.Element | null;
}

const sideNavLinks: Links[] = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: <Home id='icon' />,
  },
  {
    name: 'Expenses',
    to: `/expenses`,
    icon: <Archive id='icon' />,
  },
  {
    name: 'Reports',
    to: '/reports',
    icon: <PieChart id='icon' />,
  },
  {
    name: 'Wishlist',
    to: '/profile',
    icon: <ShoppingCart id='icon' />,
  },
  {
    name: 'Profile',
    to: '/profile',
    icon: <UserPlus id='icon' />,
  },
  {
    name: 'Settings',
    to: '/profile',
    icon: <Settings id='icon' />,
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

  const [links, _] = useState<Links[]>(sideNavLinks);

  const { setUser } = useContext(UserContext);

  return (
    <SideNavLinksWrapper>
      {links.map((link, index) =>
        link.isSignout ? (
          <form
            onClick={(e) => {
              e.preventDefault();

              setUser(null);

              navigate('/signin');
            }}
          >
            <div className='line'></div>
            <input id='signout' type='submit' value='Sign out' />
          </form>
        ) : (
          <li>
            <NavLink key={index} className='link' to={link.to}>
              {link.icon} {link.name}
            </NavLink>
          </li>
        )
      )}
    </SideNavLinksWrapper>
  );
};

export default SideNav;
