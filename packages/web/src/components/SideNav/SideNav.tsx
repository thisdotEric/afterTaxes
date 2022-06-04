import React, { FC, useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SideNavLinksWrapper } from './SideNav.styles';
import { UserContext } from '../../context';
import {
  CurrencyDollar,
  FileDollar,
  Home2,
  Logout,
  ReportAnalytics,
} from 'tabler-icons-react';

interface SideNavProps {}

interface Links {
  name: string;
  to: string;
  isSignout?: boolean;
  icon: JSX.Element | null;
}

const iconSize = 18;
const SideNav: FC<SideNavProps> = ({}: SideNavProps) => {
  const navigate = useNavigate();

  const [links] = useState<Links[]>([
    {
      name: 'Dashboard',
      to: '/dashboard',
      icon: <Home2 size={iconSize} />,
    },
    {
      name: 'Expenses',
      to: `/expenses`,
      icon: <FileDollar size={iconSize} />,
    },
    {
      name: 'Budget',
      to: '/budget',
      icon: <CurrencyDollar size={iconSize} />,
    },
    {
      name: 'Reports',
      to: '/reports',
      icon: <ReportAnalytics size={iconSize} />,
    },
    {
      name: 'Sign out',
      to: '/',
      isSignout: true,
      icon: <Logout size={iconSize} />,
    },
  ]);

  const { setUser } = useContext(UserContext);

  return (
    <SideNavLinksWrapper>
      {links.map((link, index) =>
        link.isSignout ? (
          <form
            key={index}
            onClick={(e) => {
              e.preventDefault();

              setUser(null);

              localStorage.clear();
              navigate('/signin');
            }}
          >
            <div className='line'></div>
            <input id='signout' type='submit' value='Sign out' />
          </form>
        ) : (
          <li key={index}>
            <NavLink className='link' to={link.to}>
              {link.icon} <span>{link.name}</span>
            </NavLink>
          </li>
        )
      )}
    </SideNavLinksWrapper>
  );
};

export default SideNav;
