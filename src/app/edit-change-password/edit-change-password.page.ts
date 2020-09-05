import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ModalController } from "@ionic/angular";
import { UiService } from '../services/ui.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: "app-edit-change-password",
  templateUrl: "./edit-change-password.page.html",
  styleUrls: ["./edit-change-password.page.scss"],
})
export class EditChangePasswordPage implements OnInit {

  public currentPassword: string;
  public newPassword: string;
  public confirmNewPassword: string;

  constructor(
    public translateService: TranslateService,
    public modalCtrl: ModalController,
    public UiService: UiService,
    public UserService: UserServiceService

  ) { }

  ngOnInit() { }

   async Save() {
    if (this.currentPassword == null || this.currentPassword == "" ||
      this.newPassword == null || this.newPassword == "" ||
      this.confirmNewPassword == null || this.confirmNewPassword == "") {
      const resultText: string = this.translateService.instant('CHANGE_PASSWORD.PASSWORD_ERROR_TEXT_1');
      // this.UiService.presentAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
      await this.UiService.presentAlert(resultText);
      return;
    }

    if (this.newPassword.length < 6) {
      const resultText: string = this.translateService.instant('CHANGE_PASSWORD.PASSWORD_ERROR_TEXT_2');
      // this.UiService.presentAlert("กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร");
      await this.UiService.presentAlert(resultText);
      return;
    }

    if(!this.validatePassword(this.newPassword)){
      const resultText: string = this.translateService.instant('CHANGE_PASSWORD.PASSWORD_ERROR_TEXT_2');
      // "รหัสผ่านต้องเป็นตัวเลขเท่านั้น"
      this.UiService.presentAlert(resultText);
      return;
    }

    if (this.newPassword != this.confirmNewPassword) {
      const resultText: string = this.translateService.instant('CHANGE_PASSWORD.PASSWORD_ERROR_TEXT_3');
      // this.UiService.presentAlert("รหัสผ่านใหม่ไม่ตรงกัน");
      await this.UiService.presentAlert(resultText);
      return;
    }
    await this.UiService.presentLoading();
    var result = await this.UserService.ChangePassword(this.currentPassword,this.newPassword);
    if(result.status){
      const resultText: string = this.translateService.instant('CHANGE_PASSWORD.PASSWORD_SUCCESS_TEXT');
      // await this.UiService.presentAlert("เปลี่ยนรหัสผ่านสำเร็จ");
      await this.UiService.presentAlert(resultText);
    await this.UiService.dismissLoading();

      this.back();
    }
    else{
      const resultText: string = this.translateService.instant('CHANGE_PASSWORD.PASSWORD_OLD_PASSWORD_IS_WORNG');
      await this.UiService.presentAlert(resultText);
      await this.UiService.dismissLoading();
      return;
    }
  }

  back() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: false,
    });
  }


  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public currentShowPassword :boolean = false;
  public currentPasswordType:string = "password";
  public passwordType: string = "password";
  public confirmPasswordType: string = "password";

  public currentTogglePassword(){
    this.currentShowPassword = !this.currentShowPassword;
    this.currentShowPassword
      ? (this.currentPasswordType = "text")
      : (this.currentPasswordType = "password");
  }

  public togglePassword() {
    this.showPassword = !this.showPassword;
    this.showPassword
      ? (this.passwordType = "text")
      : (this.passwordType = "password");
  }

  public toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.showConfirmPassword
      ? (this.confirmPasswordType = "text")
      : (this.confirmPasswordType = "password");
  }

  validatePassword(inputText){
    const re = /^[0-9]+$/;
    return re.test(inputText)
  }

}
