<div align="center">
  <img height="100" src="assets/bare_logo.png">
</div>

```
                     ____                
                    / __ )____ _________ 
                   / __  / __ `/ ___/ _ \
                  / /_/ / /_/ / /  /  __/
                 /_____/\__,_/_/   \___/ 
```

Backup Repository. A simple minimalistic service that stores blobs into SQLite and lists them in a simple GUI,

To install dependencies:

```bash
bun install
```

To develop:

```bash
bun dev
```

# Building

```
bun compile
```

This will nicely scaffold a `dist/` directory that contains all resources for your application:

```
dist/
  bin/
    bare # the server binary. run  it
  migrations/ # directory with drizzle–orm migrations
  assets/
    bare_logo.png # pictures fonts and etc.
  sqlite.db
```


You can pass `AUTH_USERNAME` and `AUTH_PASSWORD` to configure and utilize Basic Auth when accessing the pages

**⚠️ Disclaimer !**

Database migration and deployment is unstable:
-  Drizzle migrate does not work so we're shipping the updated sqlite.db

# Deployment
You may use write your own `Dockerfile` while mapping volumes for `sqlite.db` in case you need to back it up

OR

You may write a `ecosystem.config.js` for PM2

I guess that I will provide these in the repository but I just really wanted to publish this into github :)


# License

This tool is published under the terms of the Apache License 2.0.
