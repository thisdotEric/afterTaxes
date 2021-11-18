<h1 align='center'> afterTaxes </h1>

---

## Steps to run project locally
1. Install [NodeJs LTS](https://nodejs.org/en/download/).
2. Install your favorite text editor (mine's [VS Code](https://code.visualstudio.com/download)) and also [Git](https://git-scm.com/downloads).
3. Clone the project to your development machine using VS Code's terminal or Git Bash.
```
  git clone https://github.com/thisdotEric/afterTaxes.git
```
4.  Navigate into the project directory.
```
  cd afterTaxes
```
5.  Install packages/dependencies using npm *(comes with NodeJS)* or yarn.
```
  npm install
  yarn install
```
6. Install a relational database, (I used [PostgreSQL 13](https://www.postgresql.org/download/) in this project). Take note of your database credentials.
7. Create a new *PostgreSQL* database using [createdb](https://www.postgresql.org/docs/9.1/app-createdb.html) command.
8. Using the *.env.example* file, create a *.env* file in the root folder. After which, fill up all the missing environment variables.
```

  NODE_ENV=development
  PORT=3000

  # Change to your remote URL after uploading into production
  APP_TAXES_URL=localhost

  # Credentials for remote pg_dump
  PGPASSWORD=
  REMOTE_HOST=
  REMOTE_PORT=
  REMOTE_DB_NAME=
  REMOTE_DB_USER=

  # Local Database Credentials
  DB_NAME=
  DB_USER=
  DB_PASSWORD=

  # Remote Database Credentials
  DATABASE_URL=

```
8. Run database migrations and seed files.
```
  npm run rollback-all
```
```
  npm run knex migrate:latest
```
```
  npm run knex seed:run
```
9. Run the application locally. Runs on *localhost:3000* by default.
```
  npm run dev
```

## Project Structure
| Codebase              |      Description          |
| :-------------------- | :-----------------------: |
| [server.ts](src/server.ts)        |      Application's entry point     
| [database](src/database)        |      Migrations, seed files and database connection object 
| [graphql](src/graphql)        |      GraphQL related (resolvers, mutations, queries)     
| [ioc](src/ioc)        |      Dependency inversion container and bindings    
| [types](src/types)        |      Custom types (i.e. application context)
| [utils](src/utils)        |      Helper class' and methods
| [middlewares](src/middlewares)        |      Middleware implementations

## Branches


| Branch             |      Description          |
| :-------------------- | :-----------------------: |
| [main](https://github.com/thisdotEric/afterTaxes)        |      Main branch, most updated
| [production](https://github.com/thisdotEric/afterTaxes/tree/production)        |      Production branch for automatic deploys. Currently hosted in *Heroku*
| [db_setup](https://github.com/thisdotEric/afterTaxes/tree/db_setup)        |      Branch for migration creation and seed files 

## Acknowledgements
* TypeScript's native path mapping guide using [Kehrlann/module-alias-74](https://github.com/Kehrlann/module-alias-74) repository.
