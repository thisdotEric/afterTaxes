import { TYPES } from '@ioc';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { FolderRepository } from '@repository';

interface IUnitOfWork {
  commit(): void;
  rollback(): void;
}

@Service()
export class KnexUnitOfWork implements IUnitOfWork {
  // Database context/transaction object
  @Inject(TYPES.KnexTransaction) private readonly dbContext: Knex.Transaction;

  // Repositories
  @Inject() public readonly folderRepository: FolderRepository;

  commit(): void {
    this.dbContext.commit();
  }
  rollback(): void {
    this.dbContext.rollback();
  }
}
