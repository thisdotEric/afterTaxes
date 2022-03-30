import createServer from '@app/createServer';

const PORT = process.env.PORT || 3000;

(async () => {
  const server = await createServer();

  // Run the application
  server.listen(PORT, '0.0.0.0', (error: Error | null, address: string) => {
    if (error) {
      server.log.error(error);
      process.exit(1);
    }

    console.log(server.printRoutes());

    console.log(`afterTaxes server started on ${address}`);
  });
})();
