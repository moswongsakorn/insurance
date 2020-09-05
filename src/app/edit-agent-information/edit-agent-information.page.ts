import { Component, OnInit } from '@angular/core';
import { DataCenterService } from '../services/data-center.service';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserCrudModel } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-edit-agent-information',
  templateUrl: './edit-agent-information.page.html',
  styleUrls: ['./edit-agent-information.page.scss'],
})
export class EditAgentInformationPage implements OnInit {

  public user: UserCrudModel = new UserCrudModel();
  public monthThaiName = "มกราคม,กุมภาพันธ์,มีนาคม,เมษายน,พฤษภาคม,มิถุนายน,กรกฎาคม,สิงหาคม,กันยายน,ตุลาคม,พฤศจิกายน,ธันวาคม"
  public monthEngName = "January,February,March,April,May,June,July,August,September,October,November,December"
  
  constructor(
    private DataCenterService: DataCenterService,
    private UserService: UserServiceService,
    private NavController: NavController,
    private Router: Router,
    private translateService: TranslateService,
    private UiService: UiService
  ) {
    const language = localStorage.getItem("language")
    this.monthThaiName = language === "th" ? this.monthThaiName : this.monthEngName
   }

  ngOnInit() {
    this.user = this.DataCenterService.CloneAgentUserCrudModel();
    this.user.ConfirmPassword = this.user.Password;
  }

  public async Save() {
    var pinIsExist = await this.UserService.PinIsExist(this.user.Pin);

    const checkPhone = this.UiService.checkInputPhoneNumber(this.user.Telephone)
    if(!checkPhone){
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.PHONE_NUMBER_ERROR_2');
      // "เบอร์โทนศัพทย์"
      this.UiService.presentAlert(resultText);
      return;
    }
    
    
    if((!this.validateName(this.user.FirstName)) ||( !this.validateName(this.user.LastName))){
      const resultText: string = this.translateService.instant('REGISTER_GENERAL.ALERT_TEXT_5');
      // "รูปแบบชื่อ - นามสกุลไม่ถูกต้อง"
      this.UiService.presentAlert(resultText);
      return;
    }

    if (pinIsExist) {
      var result = await this.UserService.UpdateAgentUser(this.user);
      if (result.status) {
        this.NavController.back();
      }
      else {
        console.log(result.message)
      }
    }
    else {
      const resultText: string = this.translateService.instant(
        "REGISTER_GENERAL.ERROR_TEXT_4"
      );
      this.UiService.presentAlert(resultText);
      console.log("This is not exist!");
      return;
    }
  }

  validateName(inputText){
    const re = /^[A-Za-zก-๙]+$/;
    console.log('inputText: '+inputText, re.test(inputText))
    return re.test(inputText);
  }

}
