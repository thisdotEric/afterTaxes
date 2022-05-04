interface ExpensesTableColumn {
  header: string;
  accessor: string;
}

export const expensesColumns: ExpensesTableColumn[] = [
  {
    header: 'DATE',
    accessor: 'date',
  },
  {
    header: 'AMOUNT',
    accessor: 'amount',
  },
  {
    header: 'EXPENSE',
    accessor: 'name',
  },
  {
    header: 'DESCRIPTION',
    accessor: 'description',
  },
  {
    header: 'BUDGET TYPE',
    accessor: 'budgetType',
  },
];
