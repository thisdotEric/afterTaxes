import React, { FC } from 'react';
import './SideNav.css';

interface SideNavProps {}

const SideNav: FC<SideNavProps> = ({}: SideNavProps) => {
  return (
    <div className="side-nav">
      <ul>
        <li>
          <a href="">
            <span>Set Budget</span>
          </a>
        </li>
        <li>
          <a href="">
            <span id="active">Record Expenses</span>
          </a>
        </li>
        <li>
          <a href="">
            <span>Reports</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
