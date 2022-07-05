import styled from 'styled-components';
import {
  secondarybg,
  primarybg,
  red,
  lightgreen,
  white,
  grey,
} from '../../components/styles/colors';

export const SideNavLinksWrapper = styled.ul`
  li {
    list-style: none;
    text-decoration: none;
  }

  .link,
  #signout {
    text-decoration: none;
    color: ${white};
    background-color: ${secondarybg};
    padding: 10px 10px 10px 40px;
    display: block;
    text-align: left;
    font-size: 13px;
    font-weight: bold;
    transition: transform 0.1s;
  }

  #signout {
    border: none;
    width: 100%;
    color: ${red};
  }

  #signout:hover {
    background-color: ${primarybg};
  }

  .link {
    display: flex;
    align-items: center;
    justify-content: left;

    span {
      padding-left: 5px;
    }

    &:hover {
      color: ${grey};
      transform: scale(1.02);
    }
  }

  .line {
    width: 60%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    margin: 0 auto;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .active,
  .active:hover {
    color: ${lightgreen};
    font-weight: bold;
    background-color: ${primarybg};
    transform: scale(1);
  }
`;
