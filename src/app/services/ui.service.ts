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

  async ConfirmedRemove(calBack: any) {
    const headerText: string = this.translateService.instant("CODE.DELETE_USER_TITLE");
    const message: string = this.translateService.instant("CODE.DELETE_USER_TEXT");
    const okText: string = this.translateService.instant("CODE.CONFIRM");
    const cancelText: string = this.translateService.instant("CODE.CANCEL");
    const passwordText: string = this.translateService.instant("REGISTER_GENERAL.PASSWORD");


    let alert = await this.alertController.create({
      header: headerText,
      message: message,
      inputs: [       
        {
          name: 'password',
          placeholder: passwordText,
          type: 'password'
        }
      ],
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: okText,
          handler: data => {
            calBack(data.password);
          }
        }
      ]
    });
    return await alert.present();
  }

  checkInputYear(input){
    if(input<1){
      return {status:false,case:1}
    }
    let numbers = /^[0-9]+$/
    input = ''+input
    let check = input.match(numbers)
    return  {status:check?true:false,case:2}
  }

  checkInputMoney(input){
    if(input<=0){
      return {status:false,case:1}
    }
    let check = parseFloat(input)
    return  {status:check?true:false,case:2}
  }

  checkInputMoneyZero(input){
    console.log('checkInputMoneyZero', input)
    if(input<0){
      return {status:false,case:1}
    }else{
      let check = parseFloat(input)
      if(check===0){
        return  {status:true,case:4}
      }
      return  {status:check?true:false,case:2}
    }
    
  }

  checkInputPhoneNumber(input){
    console.log('input', input)
    let numbers = /^[0-9]+$/
    input = ''+input
    let check = input.match(numbers)
    console.log('check', check)
    return  check?true:false
  }
}
