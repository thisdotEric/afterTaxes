import styled from 'styled-components';
import {
  green,
  grey,
  lightgreen,
  secondarybg,
} from '../../components/styles/colors';

export const ProfileWrapper = styled.div`
  color: white;
  display: flex;
  align-items: flex-start;
  flex-direction: row;

  input {
    width: 270px;
  }

  .personal-info {
    width: 100%;
    padding-right: 50px;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-bottom: 10px;
      box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    }
  }

  .jobs {
    table {
      text-align: left;
      font-size: 13px;
      border-spacing: 10px;

      th {
        font-weight: normal;
        font-size: 12px;
        padding: 2px 5px;
      }

      .job-row {
        color: ${grey};
      }

      td {
        font-weight: bold;
        background-color: ${secondarybg};
        padding: 8px 5px;
        box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
        width: 250px;

        .present {
          color: ${lightgreen};
        }
      }

      #action {
        background-color: transparent;
        padding-left: 8px;
        color: ${green};
        box-shadow: none;
      }
    }
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  #edit-icon {
    padding-left: 8px;
    color: ${green};
  }
`;

export const Wrapper = styled.div`
  p {
    font-size: 25px;
    padding: 20px 0px;
    font-weight: bold;
    color: white;

    span {
      color: ${lightgreen};
    }
  }
`;

export const JobWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;

  #edit-icon {
    padding-left: 8px;
    color: ${green};
  }
`;
