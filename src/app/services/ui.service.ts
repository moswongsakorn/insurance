import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private isLoading = false;
  constructor(public loadingController: LoadingController, public alertController: AlertController) { }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      spinner: null,
      message: `
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    
      <div class="sk-chase-2">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>`,
      cssClass: 'custom-loader-class',
      duration: 10000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async presentAlert(text: string, ) {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: text,
      buttons: [
        {
          text: 'ตกลง',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]

    });

    return await alert.present();
  }

  async presentAlertConfirm(text: string, confirmFunc: any) {
    const alert = await this.alertController.create({
      header: 'ยืนยัน',
      message: text,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'ตกลง',
          handler: () => { confirmFunc() }
        }
      ]
    });

    return await alert.present();
  }
}
