import { Button } from '@mantine/core';
import React, { FC } from 'react';
import {
  ChevronsLeft,
  ArrowNarrowLeft,
  ArrowNarrowRight,
  ChevronsRight,
} from 'tabler-icons-react';
import { TableFooterPaginationWrapper } from './Table.styles';

interface TablePaginationProps {
  canPreviousPage: boolean;
  previousPage: () => void;
  canNextPage: boolean;
  nextPage: () => void;
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void;
  pageCount: number;
  pageIndex: number;
  length: number;
}

const TablePagination: FC<TablePaginationProps> = ({
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  gotoPage,
  pageCount,
  pageIndex,
  length,
}: TablePaginationProps) => {
  return (
    <TableFooterPaginationWrapper>
      <p>
        Page <span>{pageIndex + 1}</span> of <span>{length}</span> &nbsp;
      </p>
      <Button
        onClick={() => gotoPage(0)}
        size='xs'
        id='paginate-btn'
        disabled={!canPreviousPage}
      >
        <ChevronsLeft size={16} color='black' id='paginate-arrow' />
      </Button>
      &nbsp;
      <Button
        id='paginate-btn'
        onClick={() => previousPage()}
        size='xs'
        disabled={!canPreviousPage}
      >
        <ArrowNarrowLeft size={16} color='black' id='paginate-arrow' />
      </Button>
      &nbsp;
      <Button
        size='xs'
        onClick={() => nextPage()}
        disabled={!canNextPage}
        id='paginate-btn'
      >
        <ArrowNarrowRight size={16} color='black' id='paginate-arrow' />
      </Button>
      &nbsp;
      <Button
        id='paginate-btn'
        onClick={() => gotoPage(pageCount - 1)}
        size='xs'
        disabled={!canNextPage}
      >
        <ChevronsRight size={16} color='black' id='paginate-arrow' />
      </Button>
    </TableFooterPaginationWrapper>
  );
};

export default TablePagination;
