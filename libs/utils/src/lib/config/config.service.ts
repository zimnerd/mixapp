import { Injectable } from '@angular/core';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static apiUrl = environment.apiUrl;

  constructor() {
    console.log('ConfigService created');
  }

  get featureFlags(): any {
    return environment.featureFlags;
  }

  get production(): boolean {
    return environment.production;
  }

}
