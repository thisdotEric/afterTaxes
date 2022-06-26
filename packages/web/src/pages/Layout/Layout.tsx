import React, { FC, useState } from 'react';
import {
  SideNavWrapper,
  MainContentWrapper,
  HeaderWrapper,
} from './Layout.styles';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { AppLogo } from '../../components/App/AppLogo';
import { month, year, day, IDate } from '../../constants/date';
import { DateComponent as DateComponent } from '../../components/Date';
import { HeaderContext, HeaderContextValue } from '../../context';
import AnimatedPage from '../../components/Framer';
import { DatePicker } from '@mantine/dates';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}: LayoutProps) => {
  const [header, setHeader] = useState<HeaderContextValue>({
    headerTitle: 'Dashboard',
    date: {
      month,
      year,
    },
  });
  const [value, onChange] = useState<Date>(new Date());

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
          {/* <DateComponent
            month={header ? header.date!.month : month}
            year={header ? header.date!.year : year}
            date={header?.date!.day}
          /> */}

          <DatePicker
            value={value}
            onChange={(value) => onChange(value!)}
            inputFormat='MMMM YYYY'
          />

          <p id='header-title'>&nbsp; {header!.headerTitle}</p>
        </HeaderWrapper>

        <AnimatedPage>
          <Outlet />
        </AnimatedPage>
      </MainContentWrapper>
    </HeaderContext.Provider>
  );
};

export default Layout;
