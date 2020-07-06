import { Component, OnInit } from '@angular/core';
import { UserCrudModel } from '../interfaces/index';
import { UserServiceService } from '../services/user-service.service';
import { MagicNumber } from '../interfaces/MagicNumber';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-register-leader-member-user',
  templateUrl: './register-leader-member-user.page.html',
  styleUrls: ['./register-leader-member-user.page.scss'],
})
export class RegisterLeaderMemberUserPage implements OnInit {

  public user: UserCrudModel = new UserCrudModel();
  public monthThaiName =  "มกราคม,กุมภาพันธ์,มีนาคม,เมษายน,พฤษภาคม,มิถุนายน,กรกฎาคม,สิงหาคม,กันยายน,ตุลาคม,พฤศจิกายน,ธันวาคม"
  public monthEngName =  "January,February,March,April,May,June,July,August,September,October,November,December"

  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public navController: NavController,
    public UiService: UiService,
    private translateService:TranslateService

  ) { const language = localStorage.getItem("language")
    this.monthThaiName = language==="th"?this.monthThaiName:this.monthEngName}

  ngOnInit() {
  }

  public async PinGenerate() {
    this.user.Pin = await this.userService.PinGenerate();
  }

  public async Register() {
    this.user.InitRole(MagicNumber.master);

    if (this.user.IsValidModel() == false) {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_1');
      this.UiService.presentAlert(resultText);
      return;
    }

    if (this.userService.checkIDCard(this.user.IdCard) === false) {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_2');
      this.UiService.presentAlert(resultText);
      return;
    }

    var idCardIsExist = await this.userService.IdCardIsExist(this.user.IdCard, this.user.Role)
    if (idCardIsExist) {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_2');
      this.UiService.presentAlert("เลขประชาชน " + this.user.IdCard + " ถูกใช้งานแล้ว");
      return;
    }

    if (this.user.Password.length < 6) {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_2');
      this.UiService.presentAlert("กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร");
      return;
    }

    if (this.user.PrefixName == 'specific' && (this.user.SpecificPrefixName == null || this.user.SpecificPrefixName == '')) {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_2');
      this.UiService.presentAlert("กรุณากรอกคำนำหน้าชื่อ");
      return;
    }

    if (this.user.PasswordIsMatch()) {
      this.dataCenter.SetUserCrudModel(this.user);
      this.navController.navigateForward(['confirm-register-general-user']);
    }
    else {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_3');
      this.UiService.presentAlert(resultText);
      console.log("Password is not match!");
    }
  }

  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public passwordType: string = "password";
  public confirmPasswordType: string = "password";
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

}
