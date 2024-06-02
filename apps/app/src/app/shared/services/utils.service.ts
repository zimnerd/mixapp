import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private loading: LoadingController, private alertCtr: AlertController) {}

  async showLoading(message: string) {
    const loading = await this.loading.create({
      message
    });
    await loading.present();
  }

  async hideLoading() {
    await this.loading.dismiss();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtr.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showErrorAlert(message: string) {
    await this.showAlert('Error', message);
  }
}
