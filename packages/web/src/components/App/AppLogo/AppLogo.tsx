import React, { FC } from 'react';
import styled from 'styled-components';
import {
  white,
  secondarybg,
  lightgreen,
} from '../../../components/styles/colors';

interface AppLogoProps {}

const AppLogo: FC<AppLogoProps> = ({}: AppLogoProps) => {
  return (
    <AppLogoWrapper>
      <p id='aftertaxes'>
        <span>after</span>Taxes
      </p>
    </AppLogoWrapper>
  );
};

const AppLogoWrapper = styled.div`
  color: ${white};
  font-weight: bold;
  background-color: ${secondarybg};
  padding: 20px 10px 30px 10px;
  text-align: center;

  p {
    background-color: ${secondarybg};
    font-size: 20px;
    color: ${white};

    span {
      color: ${lightgreen};
    }
  }
`;

export default AppLogo;
