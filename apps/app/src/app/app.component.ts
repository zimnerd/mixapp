import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DateUtils } from '@mixapp/utils';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  loginData = {
    emailOrPhone: '',
    password: ''
  };
  constructor(private router: Router) {}

  login() {
    // Implement login functionality here
    console.log('Logging in with:', this.loginData);
    // Redirect to home page after successful login
    this.router.navigateByUrl('/home');
  }

  navigateToRegister() {
    // Navigate to the register page
    this.router.navigateByUrl('/register');
  }
}
