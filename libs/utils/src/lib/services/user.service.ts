import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserProfile(userId: string): void {
    // Implement get user profile logic
  }

  updateUserProfile(userId: string, profileData: any): void {
    // Implement update user profile logic
  }
}
