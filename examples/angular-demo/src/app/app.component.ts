import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CaptchacatComponent } from '@captchacat/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CaptchacatComponent],
  template: `
    <main class="main">
      <h1 class="page-title">Captchacat - Angular Demo</h1>

      <div class="container">
        <form (ngSubmit)="handleSubmit()" class="form">
          <input
            [(ngModel)]="username"
            name="username"
            type="text"
            placeholder="Username"
            required
            class="input"
          />
          <input
            [(ngModel)]="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            class="input"
          />

          <captchacat [siteKey]="'bd1cc81b04564d3f899e'" (verified)="handleVerify($event)" />

          <div class="status-row">
            <span class="status-dot" [class.verified]="isVerified()"></span>
            <span class="status-text">
              {{ isVerified() ? 'Verified' : 'Not verified' }}
            </span>
          </div>

          <button type="submit" class="button">Submit</button>
        </form>

        @if (result()) {
          <p class="result" [class.error]="result()!.startsWith('Error')">
            {{ result() }}
          </p>
        }
      </div>
    </main>
  `,
  styles: [`
    .main {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
      padding: 3rem 2rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .page-title {
      color: #fff;
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      margin: 0 0 2rem 0;
    }
    .container {
      width: 100%;
      max-width: 360px;
      background: #1e1e2e;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .input {
      width: 100%;
      padding: 0.7rem 0.9rem;
      background: #2a2a3e;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      color: #fff;
      font-size: 0.95rem;
      outline: none;
      box-sizing: border-box;
    }
    .button {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border: none;
      border-radius: 6px;
      color: #fff;
      font-size: 0.95rem;
      font-weight: 600;
      margin-top: 0.5rem;
      cursor: pointer;
    }
    .status-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #64748b;
    }
    .status-dot.verified {
      background: #10b981;
    }
    .status-text {
      color: #94a3b8;
      font-size: 0.8rem;
    }
    .result {
      margin-top: 1rem;
      font-size: 0.85rem;
      text-align: center;
      color: #10b981;
    }
    .result.error {
      color: #ef4444;
    }
  `],
})
export class AppComponent {
  username = '';
  password = '';
  token = '';
  isVerified = signal(false);
  result = signal<string | null>(null);

  handleVerify(token: string) {
    this.token = token;
    this.isVerified.set(true);
  }

  async handleSubmit() {
    if (!this.token) {
      this.result.set('Error: Please complete the captcha');
      return;
    }
    this.result.set('Success!');
  }
}
