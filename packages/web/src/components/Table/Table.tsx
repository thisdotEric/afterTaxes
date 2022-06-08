import React, { FC, useState } from 'react';
import { Button, Table, TextInput } from '@mantine/core';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { TableFooter, TableWrapper } from './Table.styles';
import {
  ArrowDown,
  ArrowNarrowLeft,
  ArrowNarrowRight,
  ArrowUp,
  ChevronsLeft,
  Search,
} from 'tabler-icons-react';
import TablePagination from './TablePagination';

interface TableProps {
  columns: any;
  data: any;
  pageSize?: number;
  action?: {
    name: string;
    event: () => void;
  };
}

const TableComponent: FC<TableProps> = ({
  columns,
  data,
  action,
  pageSize = 10,
}: TableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    pageOptions,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <TableWrapper>
      <div className='table-actions'>
        <TextInput
          icon={<Search size={15} />}
          size='xs'
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
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
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDown strokeWidth={3} size={12} color='#15c45e' />
                      ) : (
                        <ArrowUp strokeWidth={3} size={12} color='#15c45e' />
                      )
                    ) : (
                      <ArrowUp strokeWidth={3} size={12} id='hidden-icon' />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
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
      <TableFooter>
        <TablePagination
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          nextPage={nextPage}
          previousPage={previousPage}
          gotoPage={gotoPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          length={pageOptions.length}
        />
      </TableFooter>
    </TableWrapper>
  );
};

export default TableComponent;
