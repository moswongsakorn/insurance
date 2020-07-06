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

  constructor(
    private DataCenterService: DataCenterService,
    private UserService: UserServiceService,
    private NavController: NavController,
    private Router: Router,
    private translateService: TranslateService,
    private uiService: UiService
  ) { }

  ngOnInit() {
    this.user = this.DataCenterService.CloneUserCrudModel();
    this.user.ConfirmPassword = this.user.Password;
  }

  public async Save() {
    var pinIsExist = await this.UserService.PinIsExist(this.user.Pin);
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
    else{
      const resultText: string = this.translateService.instant(
        "REGISTER_GENERAL.ERROR_TEXT_4"
      );
      this.uiService.presentAlert(resultText);
      return;
    }   
  }
}
