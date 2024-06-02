import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { FormField } from '@mixapp/utils';
import { DynamicFormComponent } from '../../shared/component/dynamic-form/dynamic-form.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilsService } from '../../shared/services/utils.service';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton, DynamicFormComponent, HttpClientModule],
  providers: [ApiService]
})
export class LoginPage implements OnInit {
  loginFormFields: FormField[] = [
    {
      name: 'email',
      label: 'Email',
      validations: [Validators.required, Validators.email],
      type: 'email'
    },
    {
      name: 'password',
      label: 'Password',
      validations: [Validators.required],
      type: 'password'
    }
  ];

  formProperties = {
    title: 'Login',
    formData: this.loginFormFields,
    submitButtonText: 'Login',
    cancelButtonText: 'Register Instead',
    onSubmit: this.login.bind(this),
    onCancel: this.navigateToRegister.bind(this),
    showCancelBtn: true
  }

  constructor(private router: Router, private apiService: ApiService, private utils: UtilsService, private authService: AuthService) {}

  ngOnInit() {
  }

  async login(loginData: FormGroup): Promise<void> {
    if (!loginData.valid) {
      console.log('Invalid form data');
      return;
    }

    await this.utils.showLoading('Logging in...');

    try {
      const { token } = await lastValueFrom(this.apiService.post<{ token: string }>('auth/login', loginData.value));
      this.authService.setToken(token);
      console.log({ token });
      await this.router.navigateByUrl('/tabs');
      this.authService.startWatching();
    } catch (error) {
      console.error(error);
      await this.utils.showErrorAlert(error as string);
    } finally {
      await this.utils.hideLoading();
    }
  }

  async logout(): Promise<void> {
    this.authService.clearToken();
    this.authService.stopWatching();
    await this.router.navigateByUrl('/login');
  }

  async navigateToRegister() {
    await this.router.navigateByUrl('/register');
  }
}
