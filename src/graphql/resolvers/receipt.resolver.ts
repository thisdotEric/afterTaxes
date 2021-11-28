import { Resolver, Arg, Mutation } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Service } from 'typedi';
import { GoogleService } from '@service';

@Service()
@Resolver()
export class ReceiptResolver {
  constructor(private readonly googleService: GoogleService) {}

  @Mutation(() => Boolean)
  async uploadExpensesReceipt(
    @Arg('receipt', () => GraphQLUpload)
    fileUpload: FileUpload
  ) {
    return await this.googleService.uploadImage(fileUpload);
  }
}
