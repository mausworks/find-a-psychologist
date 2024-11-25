# Find a psychologist

Run the app as you would any expo app.

Because of CORS, if you need to run the app in a browser, you also need to run the BFF in `server/psychologist-bff` with bun.

```
cd server/psychologist-bff
bun run dev
```

Edit the `.env` file to target either the proxied URL or default URL.
