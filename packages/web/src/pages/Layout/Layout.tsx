import React, { FC, useEffect, useMemo, useState } from 'react';
import { SideNavWrapper, MainContentWrapper } from './Layout.styles';
import { Outlet } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { AppLogo } from '../../components/App';
import { PopUp } from '../../components/PopUp';
import { PopUpContext, IPopUp } from '../../context';

interface LayoutProps {}

const Layout: FC<LayoutProps> = ({}: LayoutProps) => {
  const [popUp, setPopUp] = useState<IPopUp | null>({
    message: '',
    type: 'success',
    show: false,
  });

  const popUpValue = useMemo(() => ({ popUp, setPopUp }), [popUp, setPopUp]);

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

      <PopUpContext.Provider value={popUpValue}>
        <MainContentWrapper>
          <PopUp />

          <Outlet />
        </MainContentWrapper>
      </PopUpContext.Provider>
    </>
  );
};

export default Layout;
