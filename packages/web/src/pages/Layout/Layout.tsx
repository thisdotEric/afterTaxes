import React, { FC, useEffect } from 'react';
import { SideNavWrapper, MainContentWrapper } from './Layout.styles';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { AppLogo } from '../../components/App';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}: LayoutProps) => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);

  return (
    <>
      <SideNavWrapper>
        <div>
          <AppLogo />
          <SideNav />
        </div>
      </SideNavWrapper>

      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
    </>
  );
};

export default Layout;
