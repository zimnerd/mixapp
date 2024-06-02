import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  sendNotification(userId: string, message: string): void {
    // Implement notification logic
  }
}
