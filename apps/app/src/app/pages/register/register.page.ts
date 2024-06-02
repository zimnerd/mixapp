import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonInput, IonItem, IonCheckbox, IonButton]
})
export class RegisterPage implements OnInit {
  registerData = {
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    agreeTerms: false
  };

  constructor(private router: Router) {}

  ngOnInit() {
  }

  register() {
    // Implement registration functionality here
    console.log('Registering with:', this.registerData);
    // Redirect to home page after successful registration
    this.router.navigateByUrl('/home');
  }

  navigateToLogin() {
    // Navigate to the login page
    this.router.navigateByUrl('/login');
  }
}
