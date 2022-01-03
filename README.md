<h1 align='center'> afterTaxes </h1>

---

## Steps to run project locally
1. Install [NodeJs LTS](https://nodejs.org/en/download/). The version used in this project is **v16.x LTS**, **v8.x** of NodeJs and npm, respectively.
2. Install your favorite text editor (mine's [VS Code](https://code.visualstudio.com/download)), [git](https://git-scm.com/downloads) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable).
3. Clone the project to your development machine using VS Code's terminal or Git Bash.
```
  git clone https://github.com/thisdotEric/afterTaxes.git
```
4.  Navigate into the project directory.
```
  cd afterTaxes
```
5.  Install packages/dependencies using yarn.
```
  yarn install
```
6. Install a relational database, (I used [PostgreSQL](https://www.postgresql.org/download/) in this project). Take note of your database credentials.
7. Create a new *PostgreSQL* database using [createdb](https://www.postgresql.org/docs/9.1/app-createdb.html) command.
8. Using the *.env.example* file, create a *.env* file in the root folder. After which, fill up all the missing environment variables without quotes.
```

  NODE_ENV=development
  PORT=3000

  # Local Database Credentials
  DB_NAME=
  DB_USER=
  DB_PASSWORD=

  # Remote Database Credentials
  DATABASE_URL=

```
8. Run database migrations and seed files.
```
  yarn knex migrate:rollback --all && yarn knex migrate:latest && yarn knex seed:run
```
9. Run the application locally. Runs on *localhost:3000* by default.
```
  yarn dev
```
10. Sign in using the dummy account.
```
  email:     test@test.com
  password:  password
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
| [main](https://github.com/thisdotEric/afterTaxes)        |      Main branch, most stable
| [production](https://github.com/thisdotEric/afterTaxes/tree/production)        |      Production branch, currently hosted on *Heroku*
| [dev](https://github.com/thisdotEric/afterTaxes/tree/dev)        |      Branch with new and expiremental features.

## Acknowledgements
* TypeScript's native path mapping guide using [Kehrlann/module-alias-74](https://github.com/Kehrlann/module-alias-74) repository.
