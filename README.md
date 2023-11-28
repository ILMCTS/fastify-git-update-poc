# Fastify - Git Update PoC

Simple PoC of a middleware to automaticly trigger a update:

1. Delete deps + built files
2. Pull from git
3. Install deps
4. Build repo
5. Start repo

> The idea behind this simple poc is, that gh actions is calling this endpoint rather than connecting the the server via ssh and updating the repo that way. (Security)

## Environment Config

```env
TRIGGER_UPDATE_SECRET="some_random_secret_like_uuid"
WEB_PORT="3000"
```

## Trigger Update

POST `http://localhost:3000/trigger-update`

Along with the `Authorization` Header which contains our `TRIGGER_UPDATE_SECRET` environment variable value.
