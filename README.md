# @byebot/angular

Angular integration for Byebot.

GitHub: https://github.com/ByeBot-Integrations/Angular

## Installation

```bash
npm install @byebot/angular
```

## Usage

### Standalone Component (Recommended)

```typescript
import { Component } from "@angular/core";
import { ByebotComponent } from "@byebot/angular";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ByebotComponent],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input name="email" type="email" />
      <input name="password" type="password" />
      <byebot [siteKey]="'your-site-key'" (verified)="onVerify($event)" />
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  onVerify(token: string) {
    console.log("Verified:", token);
  }

  onSubmit() {
    // Token is automatically added as hidden 'byebot-token' field
  }
}
```

### With NgModule

```typescript
import { NgModule } from "@angular/core";
import { ByebotModule } from "@byebot/angular";

@NgModule({
  imports: [ByebotModule],
})
export class AppModule {}
```

## Server-Side Validation

```typescript
import { validateByebotToken } from "@byebot/angular";

async function validateCaptcha(token: string) {
  const result = await validateByebotToken({
    apiKey: process.env.BYEBOT_API_KEY!,
    token,
  });

  if (!result.valid) {
    throw new Error("Captcha validation failed");
  }
}
```

## API

### `<byebot>`

| Input     | Type     | Required | Description                      |
| --------- | -------- | -------- | -------------------------------- |
| `siteKey` | `string` | Yes      | Your site key from the dashboard |

| Output     | Type                   | Description                            |
| ---------- | ---------------------- | -------------------------------------- |
| `verified` | `EventEmitter<string>` | Emits token when verification succeeds |

### `validateByebotToken(options)`

| Option   | Type     | Required |
| -------- | -------- | -------- |
| `apiKey` | `string` | Yes      |
| `token`  | `string` | Yes      |

Returns: `Promise<{ valid: boolean, message?: string, rawResponse?: unknown }>`

## Running the Demo

```bash
# Build the library first
cd integrations/angular
npm install
npm run build

# Run the demo app
cd examples/angular-demo
npm install
npm start
```

Open http://localhost:4200 in your browser.
