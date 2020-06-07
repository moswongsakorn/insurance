import { Component, OnInit } from "@angular/core";
import { UserCrudModel } from "../interfaces/index";
import { UserServiceService } from "../services/user-service.service";
import { MagicNumber } from "../interfaces/MagicNumber";
import { DataCenterService } from "../services/data-center.service";
import { NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { UiService } from "../services/ui.service";

@Component({
  selector: "app-register-agent-member-user",
  templateUrl: "./register-agent-member-user.page.html",
  styleUrls: ["./register-agent-member-user.page.scss"],
})
export class RegisterAgentMemberUserPage implements OnInit {
  public user: UserCrudModel = new UserCrudModel();

  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public UiService: UiService,
    public navController: NavController,
    private translateService: TranslateService,
    private uiService: UiService
  ) {}

  ngOnInit() {}

  public async Register() {
    this.user.InitRole(MagicNumber.user);

    if (!this.user.IsValidModel()) {
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
    console.log("IdCard is same ", idCardIsExist)
    if (idCardIsExist) {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_2');
      this.UiService.presentAlert("เลขประชาชน " + this.user.IdCard + " ถูกใช้งานแล้ว");
      return;
    }

    if (this.user.PrefixName == 'specific' && (this.user.SpecificPrefixName == null || this.user.SpecificPrefixName == '')) {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_2');
      this.UiService.presentAlert("กรุณากรอกคำนำหน้าชื่อ");
      return;
    }

    if (this.user.Password.length < 6) {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_2');
      this.UiService.presentAlert("กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร");
      return;
    }


    var pinIsExist = await this.userService.PinIsExist(this.user.Pin);
    var passwordIsMatch = this.user.PasswordIsMatch();
    if (passwordIsMatch && pinIsExist) {
      this.dataCenter.SetUserCrudModel(this.user);
      this.navController.navigateForward(["confirm-register-general-user"]);
    } else {
      if (!passwordIsMatch) {
        const resultText: string = this.translateService.instant(
          "REGISTER_GENERAL.ERROR_TEXT_3"
        );
        this.uiService.presentAlert(resultText);
        console.log("Password is not match!");
        return;
      }
      if (!pinIsExist) {
        const resultText: string = this.translateService.instant(
          "REGISTER_GENERAL.ERROR_TEXT_4"
        );
        this.uiService.presentAlert(resultText);
        console.log("This is not exist!");
        return;
      }
    }
  }

  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  private passwordType: string = "password";
  private confirmPasswordType: string = "password";
  private togglePassword() {
    this.showPassword = !this.showPassword;
    this.showPassword
      ? (this.passwordType = "text")
      : (this.passwordType = "password");
  }

  private toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.showConfirmPassword
      ? (this.confirmPasswordType = "text")
      : (this.confirmPasswordType = "password");
  }
}
