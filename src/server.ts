// Only for Heroku hosting
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import container from '@ioc/ioc-container';
import { AppContext } from '@types';
import { MeResolver } from '@graphql/resolvers';

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
    apolloServer.applyMiddleware({ app, path: '/api/v1' });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(
            `afterTaxes server started on ${process.env.APP_TAXES_URL}:${PORT}${apolloServer.graphqlPath}`
        );
    });
};

main();
