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
import { DateComponent as DateComponent } from '../../components/Date';
import { HeaderContext, HeaderContextValue } from '../../context';
import { Tooltip } from '@mantine/core';
import { InfoCircle } from 'tabler-icons-react';

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

          <p id='header-title'>
            &nbsp; {header!.headerTitle}{' '}
            <span>
              <Tooltip
                wrapLines
                width={250}
                withArrow
                transition='fade'
                transitionDuration={500}
                transitionTimingFunction='ease'
                label='This is the expenses page.'
              >
                <InfoCircle size={18} strokeWidth={2} color='#ddd4d4' />
              </Tooltip>
            </span>{' '}
          </p>
        </HeaderWrapper>

        <Outlet />
      </MainContentWrapper>
    </HeaderContext.Provider>
  );
};

export default Layout;
