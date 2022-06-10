import { green, red, secondarybg } from '../../../components/styles/colors';
import styled from 'styled-components';

export const CategoriesAccordionWrapper = styled.div`
  .accordion-control {
    background-color: ${secondarybg};
    border-color: gray;
  }

  .item-title {
    #label {
      color: white;
      font-weight: bold;
      padding-bottom: 7px;
      font-size: 14px;
    }

    #description {
      color: lightgrey;
      font-size: 13px;
    }
  }

  .accordion-content {
    background-color: ${secondarybg};
    color: white;
    font-size: medium;
  }

  .accordion-icon {
    stroke: white;
  }

  #add-category-btn {
    background: none;
    margin-bottom: 10px;

    &:hover {
      text-decoration: underline;
      font-weight: 600;
      background: none;
      color: ${green};
    }
  }
`;

export const AccordionContent = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: row;

  #delete {
    color: ${red};
  }

  button {
    background: none;
    text-decoration: underline;
    padding: 0;

    &:hover {
      font-weight: 600;
      background: none;
    }
  }
`;
