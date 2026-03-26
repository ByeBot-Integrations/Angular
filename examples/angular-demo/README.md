# Angular Demo

Example Angular app using `@byebot/angular`.

## Run

```bash
# First, build the library from the parent directory
cd ../..
npm install
npm run build

# Then run this demo
cd examples/angular-demo
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200)

## Structure

```
src/app/
├── app.component.ts      # Form with Byebot component
├── app.config.ts         # App configuration
└── main.ts               # Bootstrap
```

## Configuration

Update these values in the code:

- `app.component.ts`: `siteKey="your-site-key"`
