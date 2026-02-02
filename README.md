# @captchacat/angular

Angular integration for Captchacat.

GitHub: https://github.com/Captchacat-Integrations/Angular

## Installation

```bash
npm install @captchacat/angular
```

## Usage

### Standalone Component (Recommended)

```typescript
import { Component } from '@angular/core';
import { CaptchacatComponent } from '@captchacat/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CaptchacatComponent],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input name="email" type="email" />
      <input name="password" type="password" />
      <captchacat [siteKey]="'your-site-key'" (verified)="onVerify($event)" />
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  onVerify(token: string) {
    console.log('Verified:', token);
  }

  onSubmit() {
    // Token is automatically added as hidden 'captchacat-token' field
  }
}
```

### With NgModule

```typescript
import { NgModule } from '@angular/core';
import { CaptchacatModule } from '@captchacat/angular';

@NgModule({
  imports: [CaptchacatModule],
})
export class AppModule {}
```

## Server-Side Validation

```typescript
import { validateCaptchacatToken } from '@captchacat/angular';

async function validateCaptcha(token: string) {
  const result = await validateCaptchacatToken({
    apiKey: process.env.CAPTCHACAT_API_KEY!,
    token,
  });

  if (!result.valid) {
    throw new Error('Captcha validation failed');
  }
}
```

## API

### `<captchacat>`

| Input     | Type     | Required | Description                      |
| --------- | -------- | -------- | -------------------------------- |
| `siteKey` | `string` | Yes      | Your site key from the dashboard |

| Output     | Type                   | Description                            |
| ---------- | ---------------------- | -------------------------------------- |
| `verified` | `EventEmitter<string>` | Emits token when verification succeeds |

### `validateCaptchacatToken(options)`

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
