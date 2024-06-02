import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private timeoutDuration = 1 * 60 * 1000; // 30 minutes
  private timeoutId: any;
  public onTimeout = new Subject<void>();

  constructor(private ngZone: NgZone) {
    this.startWatching();
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  startWatching(): void {
    this.resetTimeout();
    window.addEventListener('mousemove', () => this.resetTimeout());
    window.addEventListener('keydown', () => this.resetTimeout());
  }

  stopWatching(): void {
    clearTimeout(this.timeoutId);
    window.removeEventListener('mousemove', () => this.resetTimeout());
    window.removeEventListener('keydown', () => this.resetTimeout());
  }

  private resetTimeout(): void {
    console.log('Resetting timeout');
    clearTimeout(this.timeoutId);
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => {
        this.ngZone.run(() => {
          this.onTimeout.next();
        });
      }, this.timeoutDuration);
    });
  }
}
