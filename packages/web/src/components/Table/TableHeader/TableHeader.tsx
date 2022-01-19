import React, { FC } from 'react';
import { tableHeaders } from '../../../constants';
import './TableHeader.css';

interface TableHeaderProps {}

const TableHeader: FC<TableHeaderProps> = ({}: TableHeaderProps) => {
  return (
    <div className="table-header">
      <thead>
        <tr>
          {tableHeaders.map(headerValue => (
            <th>{headerValue}</th>
          ))}
          <th></th>
        </tr>
      </thead>
    </div>
  );
};

export default TableHeader;
