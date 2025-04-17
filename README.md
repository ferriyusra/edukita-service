### Branch Rule

- feature/{}
- fixing/{}
- hot-fix/{}

ex:

- feature/login
- fixing/login
- hot-fix/typo-in-login

### Template ExpressJS With Typescript and Repository Pattern

#### Tech Stack

- Express
- Prisma ORM
- PostgreSQL

#### Express Configuration

- Environment variable
- Validation Yup
- API Docs (Swagger)
- Logger

### Command

#### NPM

1. Install packages
   `npm install`
2. Run application
   `npm run dev`

#### Prisma Command

1. Migrate
   `npx prisma migrate dev --name init`
2. Migrate in Prod
   `npx prisma migrate deploy`
3. Generate prisma client
   `npx prisma generate`

### Refrerence

- https://www.npmjs.com/package/yup
- https://www.prisma.io/docs/orm/overview/introduction
