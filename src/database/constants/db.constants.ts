export enum SavingsType {
  EmergencyFund = 'EMERGENCY_FUND',
  Regular = 'REGULAR_SAVINGS',
  Digital = 'DIGITAL_SAVINGS',
  Health = 'HEALTH_SAVINGS',
}

export enum BudgetType {
  Daily = 'daily',
  Monthly = 'monthly',
}

export abstract class DbNames {
  static readonly USERS = 'users';
  static readonly JOBS = 'jobs';
  static readonly SALARY = 'salary';
  static readonly BUDGET = 'budget';
  static readonly EXPENSES = 'expenses';
  static readonly EXPENSES_RECEIPTS = 'expenses_receipts';
  static readonly BUDGET_NAME = 'budget_name';
  static readonly SAVINGS = 'savings';
  static readonly SAVINGS_HISTORY = 'savings_history';
}

export abstract class ReferenceOptions {
  static readonly CASCADE = 'CASCADE';
}

export const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
