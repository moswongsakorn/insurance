import { Injectable } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class UiService {
  private isLoading = false;
  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    private translateService: TranslateService
  ) {}

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController
      .create({
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
        cssClass: "custom-loader-class",
        duration: 10000,
      })
      .then((a) => {
        a.present().then(() => {
          console.log("presented");
          if (!this.isLoading) {
            a.dismiss().then(() => console.log("abort presenting"));
          }
        });
      });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log("dismissed"));
  }

  async presentAlert(text: string) {
    const confirmText: string = this.translateService.instant("CODE.OK");
    const alertText: string = this.translateService.instant("CODE.ALERT");
    const alert = await this.alertController.create({
      header: "",
      message: text,
      buttons: [
        {
          text: confirmText,
          role: "cancel",
          cssClass: "secondary",
        },
      ],
    });

    return await alert.present();
  }

  async presentAlertConfirm(text: string, confirmFunc: any) {
    const confirmText: string = this.translateService.instant("CODE.OK");
    const cancelText: string = this.translateService.instant("CODE.CANCEL");

    const alert = await this.alertController.create({
      header: "",
      message: text,
      buttons: [
        {
          text: cancelText,
          role: "cancel",
          cssClass: "secondary",
          handler: (blah) => {
            console.log("Confirm Cancel: blah");
          },
        },
        {
          text: confirmText,
          handler: () => {
            confirmFunc();
          },
        },
      ],
    });

    return await alert.present();
  }
}
