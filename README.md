# todo

A straightforward todo app built with SvelteKit in Typescript with Drizzle as an ORM. Deployed via Vercel and using a Postgres database hosted by Neon. AuthJS taking care of user authentication via OAUth and authorization via sessions stored in the database.

## Developing

To run the app, use
```bash
npm run dev
```
Use this command after making changes to the database schema to push them to the database.
```bash
npm run drizzle-push
```

Use this command to run a database manager
```bash
npm run drizzle-kit
```

All of these commands can be appended with :local to run the app on a local postgres instance. Instructions for running the postgres instance incoming.


## Building
```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Deploying
Merge a branch to main and it will automatically deploy with Vercel. 