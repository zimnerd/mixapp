import { NavigationService } from './../../service/navigation.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatMenuModule,MatSidenavModule, MatListModule, MatIconModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  opened: Observable<boolean> = new BehaviorSubject<boolean>(true);
  constructor(private navigationService: NavigationService) {
    this.opened = this.navigationService.sidebarOpen
  }
}
