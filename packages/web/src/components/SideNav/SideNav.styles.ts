import styled from 'styled-components';
import {
  secondarybg,
  primarybg,
  red,
  lightgreen,
} from '../../components/styles/colors';

export const SideNavLinksWrapper = styled.ul`
  li {
    list-style: none;
    text-decoration: none;
  }

  .link,
  #signout {
    text-decoration: none;
    color: white;
    background-color: ${secondarybg};
    padding: 10px 10px 10px 40px;
    display: block;
    text-align: left;
    font-size: 13px;
    font-weight: bold;
  }

  #signout {
    border: none;
    width: 100%;
    color: ${red};
  }

  #signout:hover {
    background-color: ${primarybg};
  }

  .line {
    width: 60%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    margin: 0 auto;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  #icon {
    background-color: inherit;
    width: 18px;
    height: 13px;
    padding-right: 5px;
  }

  .active {
    color: ${lightgreen};
    font-weight: bold;
    background-color: ${primarybg};
  }
`;
