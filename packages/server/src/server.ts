import createServer, { isDev } from './createServer';

const port = parseInt(process.env.PORT!) || 3000;

(async () => {
  const server = await createServer();

  server.listen(
    {
      port,
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
