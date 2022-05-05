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
import { HeaderContext } from '../../context';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}: LayoutProps) => {
  const { header, setHeader } = useContext(HeaderContext);

  const [date, setDate] = useState<IDate>({
    month,
    year,
  });

  useEffect(() => {
    setHeader({
      header: 'Dashboard',
      date: {
        month,
        year,
      },
    });
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
        <HeaderWrapper>
          <DateComponent month={date.month} year={date.year} date={date.day} />

          <p id='header-title'>&nbsp; Expenses List</p>
        </HeaderWrapper>

        <HeaderContext.Provider value={{ header, setHeader }}>
          <Outlet />
        </HeaderContext.Provider>
      </MainContentWrapper>
    </>
  );
};

export default Layout;
