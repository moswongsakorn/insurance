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
  public monthThaiName =  "มกราคม,กุมภาพันธ์,มีนาคม,เมษายน,พฤษภาคม,มิถุนายน,กรกฎาคม,สิงหาคม,กันยายน,ตุลาคม,พฤศจิกายน,ธันวาคม"
  public monthEngName =  "January,February,March,April,May,June,July,August,September,October,November,December"
  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public UiService: UiService,
    public navController: NavController,
    private translateService: TranslateService,
    private uiService: UiService
  ) {
    const language = localStorage.getItem("language")
    this.monthThaiName = language==="th"?this.monthThaiName:this.monthEngName
  }

  ngOnInit() {}

  public async Register() {
    this.user.InitRole(MagicNumber.user);
    this.user.Verify = true;
    if (!this.user.IsValidModel()) {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_1');
      this.UiService.presentAlert(resultText);
      return;
    }

    if(!this.validateEmail(this.user.Email)){
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ALERT_TEXT_4');
      // "รูปแบบอีเมล์ไม่ถูกต้อง"
      this.UiService.presentAlert(resultText);
      return;
    }

    if((!this.validateName(this.user.FirstName)) ||( !this.validateName(this.user.LastName))){
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ALERT_TEXT_5');
      // "รูปแบบชื่อ - นามสกุลไม่ถูกต้อง"
      this.UiService.presentAlert(resultText);
      return;
    }

    if (this.userService.checkIDCard(this.user.IdCard) === false) {
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_2');
      this.UiService.presentAlert(resultText);
      return;
    }

    if(this.user.Telephone.length != 10){
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.PHONE_NUMBER_ERROR');
      this.UiService.presentAlert(resultText);
      return;
    }


    var idCardIsExist = await this.userService.IdCardIsExist(this.user.IdCard, this.user.Role)
    console.log("IdCard is same ", idCardIsExist)
    if (idCardIsExist) {
      // "เลขประชาชน" ถูกใช้งานแล้ว"
      const resultText1 = this.translateService.instant('REGISTER_GENERAL.ID_CARD_TEXT');
      const resultText2: string = this.translateService.instant('REGISTER_GENERAL.ALERT_TEXT_1');
      this.UiService.presentAlert(resultText1+" " + this.user.IdCard + " "+resultText2);
     return;
    }

    if (this.user.PrefixName == 'specific' && (this.user.SpecificPrefixName == null || this.user.SpecificPrefixName == '')) {
     // กรุณากรอกคำนำหน้าชื่อ
     const resultText: string = this.translateService.instant('REGISTER_GENERAL.ALERT_TEXT_2');
     this.UiService.presentAlert(resultText);
      return;
    }

    const checkPhone = this.UiService.checkInputPhoneNumber(this.user.Telephone)
    if(!checkPhone){
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.PHONE_NUMBER_ERROR_2');
      // "เบอร์โทนศัพทย์"
      this.UiService.presentAlert(resultText);
      return;
    }

    if (this.user.Password.length < 6) {
      // กรุณากรอกรหัสผ่านอย่างน้อย  6 ตัวอักษร
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ALERT_TEXT_3');
      this.UiService.presentAlert(resultText);
      return;
    }
    
    if(!this.validatePassword(this.user.Password)){
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ALERT_TEXT_3');
      // "รหัสผ่านต้องเป็นตัวเลขเท่านั้น"
      this.UiService.presentAlert(resultText);
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
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateName(inputText){
    const re = /^[A-Za-zก-๙]+$/;
    console.log('inputText: '+inputText, re.test(inputText))
    return re.test(inputText);
  }
  validatePassword(inputText){
    const re = /^[0-9]+$/;
    return re.test(inputText)
  }
}
