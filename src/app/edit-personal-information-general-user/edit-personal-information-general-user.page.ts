import { Component, OnInit } from "@angular/core";
import { DataCenterService } from "../services/data-center.service";
import { UserCrudModel } from "../interfaces";
import { UserServiceService } from "../services/user-service.service";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";
import { MagicNumber } from "../interfaces/MagicNumber";
import { TranslateService } from "@ngx-translate/core";
import { UiService } from "../services/ui.service";

@Component({
  selector: "app-edit-personal-information-general-user",
  templateUrl: "./edit-personal-information-general-user.page.html",
  styleUrls: ["./edit-personal-information-general-user.page.scss"],
})
export class EditPersonalInformationGeneralUserPage implements OnInit {
  public user: UserCrudModel = new UserCrudModel();

  public monthThaiName = "มกราคม,กุมภาพันธ์,มีนาคม,เมษายน,พฤษภาคม,มิถุนายน,กรกฎาคม,สิงหาคม,กันยายน,ตุลาคม,พฤศจิกายน,ธันวาคม"
  public monthEngName = "January,February,March,April,May,June,July,August,September,October,November,December"
  constructor(
    private DataCenterService: DataCenterService,
    private UserService: UserServiceService,
    private NavController: NavController,
    private Router: Router,
    private translateService: TranslateService,
    private uiService: UiService
  ) {
    const language = localStorage.getItem("language")
    this.monthThaiName = language === "th" ? this.monthThaiName : this.monthEngName
  }

  ngOnInit() {
    this.user = this.DataCenterService.CloneUserCrudModel();
    this.user.ConfirmPassword = this.user.Password;
  }

  public async Save() {
    const checkPhone = this.uiService.checkInputPhoneNumber(this.user.Telephone)

    if(this.user.PrefixName==='REGISTER_GENERAL.Other' &&(this.user.SpecificPrefixName==='' || this.user.SpecificPrefixName===undefined || this.user.SpecificPrefixName===null)){
      const resultText: string = this.translateService.instant('CALCULATE_POLICY.ERROR_CALCULATE_INPUT');
      // "กรุณากรอกคำหน้าชื่ออื่น"
      this.uiService.presentAlert(resultText);
      return;
    }

    if(!checkPhone){
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.PHONE_NUMBER_ERROR_2');
      // "เบอร์โทนศัพทย์"
      this.uiService.presentAlert(resultText);
      return;
    }


    if((!this.validateName(this.user.FirstName)) ||( !this.validateName(this.user.LastName))){
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ALERT_TEXT_5');
      // "รูปแบบชื่อ - นามสกุลไม่ถูกต้อง"
      this.uiService.presentAlert(resultText);
      return;
    }
    var pinIsExist
    if(this.user.Role===MagicNumber.quest){
     pinIsExist = await this.UserService.PinIsExist(this.user.Pin);
    }else{
      pinIsExist = await this.UserService.PinIsExistForUser(this.user.Pin);
    }
    console.log('pinIsExist', pinIsExist)
    if (pinIsExist) {
      var result = await this.UserService.UpdateUser(this.user);
      if (result.message == MagicNumber.ReEntry) {
        this.NavController.navigateForward(["home"]);
      } else if (result.status) {
        this.NavController.back();
      } else {
        console.log(result.message);
      }
    }
    else {
      const resultText: string = this.translateService.instant(
        "REGISTER_GENERAL.ERROR_TEXT_4"
      );
      this.uiService.presentAlert(resultText);
      return;
    }
  }
 validateEmail(email) {
    const re = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    return re.test(String(email).toLowerCase());
  }

  validateName(inputText){
    const re = /^[A-Za-zก-๙]+$/;
    console.log('inputText: '+inputText, re.test(inputText))
    return re.test(inputText);
  }
}
