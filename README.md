## afterTaxes

---

## Steps to run project locally
1. Install [NodeJs LTS](https://nodejs.org/en/download/).
2. Install a database, (I used [PostgreSQL 13](https://www.postgresql.org/download/) in this project).
3. Clone the project to your development machine.
```

  https://github.com/thisdotEric/afterTaxes.git

```
4.  Navigate into the project directory.
```

  cd afterTaxes

```
6.  Install packages/dependencies using npm *(comes with NodeJS)* or yarn.
```

  npm install
  yarn install

```
7. Using the *.env.example* file, create a *.env* file in the root folder. After which, fill up all the missing environment variables.
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

