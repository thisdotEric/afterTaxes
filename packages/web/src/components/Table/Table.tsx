import React, { FC } from 'react';
import { Button, Table, TextInput } from '@mantine/core';
import { useTable } from 'react-table';
import { TableWrapper } from './Table.styles';
import { ArrowNarrowLeft, ArrowNarrowRight, Search } from 'tabler-icons-react';

interface TableProps {
  columns: any;
  data: any;
  action?: {
    name: string;
    event: () => void;
  };
}

const TableComponent: FC<TableProps> = ({
  columns,
  data,
  action,
}: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <TableWrapper>
      <div className='table-actions'>
        <TextInput
          icon={<Search size={15} />}
          size='xs'
          id='table-search'
          placeholder='Search'
        />

        <Button id='action' onClick={() => action?.event()}>
          {action?.name}
        </Button>
      </div>

      <Table {...getTableProps()} fontSize={'xs'} id='main-table'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} id={row.id}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <hr />
      <div id='tbl-footer'>
        <div id='pagination'>
          <p>
            Page <span>10</span> of <span>15</span> &nbsp;
          </p>
          <div>
            <button>
              <ArrowNarrowLeft size={16} />
            </button>
            &nbsp;
            <button>
              <ArrowNarrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </TableWrapper>
  );
};

export default TableComponent;
