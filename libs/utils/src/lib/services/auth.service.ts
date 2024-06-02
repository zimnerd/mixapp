import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(email: string, password: string): void {
    // Implement login logic
  }

  logout(): void {
    // Implement logout logic
  }
}
