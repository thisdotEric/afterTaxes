import createServer from '@app/createServer';
import { FastifyInstance } from 'fastify';

describe('Server health check', () => {
  let app: FastifyInstance;
  const API_PATH = process.env.API_PATH;

  beforeAll(async () => {
    app = await createServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return status 400 and "Unknown Query" error when no graphql query passed', async () => {
    const response = await app.inject({
      method: 'GET',
      url: API_PATH,
    });

    const expected = {
      data: null,
      errors: [{ message: 'Unknown query' }],
    };

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toStrictEqual(expected);
  });

  it('should return a status 200 and valid "data" object when graphql query is supplied', async () => {
    const response = await app.inject({
      method: 'GET',
      url: API_PATH,
      query: {
        query: '{ me }',
      },
    });

    const expected = {
      data: {
        me: 'John Eric Siguenza',
      },
    };

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual(expected);
  });
});
