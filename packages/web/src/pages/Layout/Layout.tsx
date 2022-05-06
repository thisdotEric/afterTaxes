import React, { FC, useContext, useEffect, useState } from 'react';
import {
  SideNavWrapper,
  MainContentWrapper,
  HeaderWrapper,
} from './Layout.styles';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { AppLogo } from '../../components/App/AppLogo';
import { month, year, day, IDate } from '../../constants/date';
import { Date as DateComponent } from '../../components/Date';
import { HeaderContext, HeaderContextValue } from '../../context';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}: LayoutProps) => {
  const [header, setHeader] = useState<HeaderContextValue>({
    headerTitle: 'Dashboard',
    date: {
      month,
      year,
    },
  });

  return (
    <HeaderContext.Provider value={{ header, setHeader }}>
      <SideNavWrapper>
        <div>
          <AppLogo />
          <SideNav />
        </div>
      </SideNavWrapper>

      <MainContentWrapper>
        <HeaderWrapper>
          <DateComponent
            month={header ? header.date!.month : month}
            year={header ? header.date!.year : year}
            date={header?.date!.day}
          />

          <p id='header-title'>&nbsp; {header!.headerTitle}</p>
        </HeaderWrapper>

        <Outlet />
      </MainContentWrapper>
    </HeaderContext.Provider>
  );
};

export default Layout;
