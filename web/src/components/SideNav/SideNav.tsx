import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './SideNav.css';

interface SideNavProps {}

const links = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    className: 'link',
  },
  {
    name: 'Set Budget',
    to: '/',
    className: 'link',
  },
];

const SideNav: FC<SideNavProps> = ({}: SideNavProps) => {
  return (
    <ul>
      {links.map((link, index) => (
        <li>
          <NavLink key={index} className={link.className} to={link.to}>
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SideNav;
