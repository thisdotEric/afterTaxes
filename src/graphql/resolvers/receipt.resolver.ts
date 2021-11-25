import { Resolver, Arg, Mutation } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Service } from 'typedi';
import { ReceiptRepository } from '@repository';

@Service()
@Resolver()
export class ReceiptResolver {
  constructor(private readonly receiptRepo: ReceiptRepository) {}

  @Mutation(() => Boolean)
  async uploadExpensesReceipt(
    @Arg('receipt', () => GraphQLUpload)
    fileUpload: FileUpload
  ) {
    return await this.receiptRepo.uploadImage(fileUpload);
  }
}
