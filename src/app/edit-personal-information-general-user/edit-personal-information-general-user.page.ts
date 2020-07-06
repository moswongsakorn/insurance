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

  public monthThaiName =  "มกราคม,กุมภาพันธ์,มีนาคม,เมษายน,พฤษภาคม,มิถุนายน,กรกฎาคม,สิงหาคม,กันยายน,ตุลาคม,พฤศจิกายน,ธันวาคม"
  public monthEngName =  "January,February,March,April,May,June,July,August,September,October,November,December"
  constructor(
    private DataCenterService: DataCenterService,
    private UserService: UserServiceService,
    private NavController: NavController,
    private Router: Router,
    private translateService: TranslateService,
    private uiService: UiService
  ) {
    const language = localStorage.getItem("language")
    this.monthThaiName = language==="th"?this.monthThaiName:this.monthEngName
   }

  ngOnInit() {
    this.user = this.DataCenterService.CloneUserCrudModel();
    this.user.ConfirmPassword = this.user.Password;
  }

  public async Save() {
    // if (this.user.PasswordIsMatch()) {
    var result = await this.UserService.UpdateUser(this.user);
    if (result.message == MagicNumber.ReEntry) {
      this.NavController.navigateForward(["home"]);
    } else if (result.status) {
      this.NavController.back();
    } else {
      console.log(result.message);
    }
    // } else {
    //   const errorText: string = this.translateService.instant(
    //     "EDIT_PERSONAL_INFORMATION.ERROR_RESPONSE_TEXT"
    //   );
    //   this.uiService.presentAlert(errorText);
    // }
  }
}
