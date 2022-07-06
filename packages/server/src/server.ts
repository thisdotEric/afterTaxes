import createServer, { isDev } from './createServer';

const portString = process.env.PORT == undefined ? '3005' : process.env.PORT;
const port = parseInt(portString);

(async () => {
  const server = await createServer();

  server.listen(
    {
      port,
      host: '0.0.0.0',
    },
    (error: Error | null, address: string) => {
      if (error) {
        server.log.error(error);
        process.exit(1);
      }

      if (isDev) console.log(server.printRoutes());

      console.log(`afterTaxes server started on ${address}`);
    }
  );
})();
