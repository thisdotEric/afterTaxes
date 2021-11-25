import { Resolver, Arg, Mutation } from 'type-graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Service } from 'typedi';

@Service()
@Resolver()
export class ReceiptResolver {
  @Mutation(() => Boolean)
  async uploadExpensesReceipt(
    @Arg('receipt', () => GraphQLUpload)
    { createReadStream, filename, mimetype }: FileUpload
  ) {
    console.log(mimetype);

    return new Promise<boolean>(async (resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(filename))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false));
    });
  }
}
