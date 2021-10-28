import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import container from './ioc/ioc-container';
import AppContext from './types/AppContext';
import { MeResolver } from './graphql/resolvers';

const main = async () => {
    const schema = await buildSchema({
        resolvers: [MeResolver],
        container,
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: AppContext) => ({ req }),
    });

    const app = express();

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`ExTracker server started on localhost:${PORT}/graphql`);
    });
};

main();
