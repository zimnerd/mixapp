import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(public dialog: MatDialog) {}

  openDialog(component: any, data: any) {
     return this.dialog.open(component, {
      width: data.width || '400px',
      data: data
    });

}

}