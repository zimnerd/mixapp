import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  sidebarOpen = new BehaviorSubject<boolean>(true);

  constructor() { 

  }

  set sidebarState(state: boolean) {
    this.sidebarOpen.next(state);
  }

  get sidebarState(): Observable<boolean> {
    return this.sidebarOpen.asObservable();
  }

  toggleSidebar() {
    this.sidebarOpen.next(!this.sidebarOpen.value);
  }
}
