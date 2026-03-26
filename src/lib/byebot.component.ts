import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const BASE_URL = 'https://challenge.byebot.de';

declare global {
  interface Window {
    Byebot?: {
      render: (container?: HTMLElement) => void;
    };
    [key: string]: unknown;
  }
}

@Component({
  selector: 'byebot',
  standalone: true,
  template: `
    <div
      #container
      class="captcha-widget"
      [attr.data-sitekey]="siteKey"
      [attr.data-token-callback]="callbackName"
      style="min-height: 48px"
    ></div>
  `,
})
export class ByebotComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) siteKey!: string;
  @Output() verified = new EventEmitter<string>();

  @ViewChild('container', { static: true }) containerRef!: ElementRef<HTMLDivElement>;

  callbackName: string | null = null;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Generate unique callback name
    this.callbackName = `byebot_cb_${Math.random().toString(36).substring(7)}`;

    // Register callback on window
    (window as Window)[this.callbackName] = (token: string) => {
      this.verified.emit(token);
    };

    // Update the data attribute after setting callbackName
    this.containerRef.nativeElement.setAttribute('data-token-callback', this.callbackName);

    this.loadWidgetScript();
  }

  private loadWidgetScript(): void {
    const scriptUrl = `${BASE_URL}/ray/widget.js`;

    const handleInit = () => {
      if (window.Byebot?.render && this.containerRef?.nativeElement) {
        window.Byebot.render(this.containerRef.nativeElement);
      }
    };

    // Check if script already exists
    let script = document.querySelector(`script[src="${scriptUrl}"]`) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.onload = handleInit;
      document.body.appendChild(script);
    } else {
      // Script exists - check if already loaded
      if (window.Byebot) {
        handleInit();
      } else {
        script.addEventListener('load', handleInit);
      }
    }
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;

    // Clean up callback
    if (this.callbackName) {
      delete (window as Window)[this.callbackName];
    }

    // Clean up container to prevent ghost iframes
    if (this.containerRef?.nativeElement) {
      this.containerRef.nativeElement.innerHTML = '';
    }
  }
}
