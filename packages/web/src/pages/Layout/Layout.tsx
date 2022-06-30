import React, { FC, useState } from 'react';
import {
  SideNavWrapper,
  MainContentWrapper,
  HeaderWrapper,
} from './Layout.styles';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { AppLogo } from '../../components/App/AppLogo';
import { HeaderContext, HeaderContextValue } from '../../context';
import AnimatedPage from '../../components/Framer';
import { DatePicker } from '@mantine/dates';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}: LayoutProps) => {
  const [header, setHeader] = useState<HeaderContextValue>({
    headerTitle: 'Dashboard',
    date: new Date(),
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
          <DatePicker
            value={header.date}
            onChange={(value) => {
              setHeader({ ...header, date: value! });
            }}
            inputFormat='MMMM YYYY'
            id='datepicker'
            defaultValue={new Date()}
            firstDayOfWeek='sunday'
            classNames={{
              label: 'datepicker-labesl',
              arrow: 'arrow',
              dropdown: 'arrow',
            }}
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
