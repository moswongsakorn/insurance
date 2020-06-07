import { Component, OnInit } from "@angular/core";
import { UserServiceService } from "../services/user-service.service";
import { DataCenterService } from "../services/data-center.service";
import { NavController } from "@ionic/angular";
import { UserCrudModel } from "../interfaces/index";
import { UiService } from "../services/ui.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-confirm-register-general-user",
  templateUrl: "./confirm-register-general-user.page.html",
  styleUrls: ["./confirm-register-general-user.page.scss"],
})
export class ConfirmRegisterGeneralUserPage implements OnInit {
  public user: UserCrudModel;

  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public navController: NavController,
    public UiService: UiService,
    public translateService:TranslateService
  ) {}

  ngOnInit() {
    this.user = this.dataCenter.GetUserCrudModel();
  }

  public async Confirm() {
    this.UiService.presentLoading();
    var result = await this.userService.RegisterUser(this.user);
    if (result.status == true) {
      console.log(result);
      const resultText: string = this.translateService.instant('CONFIRM_GENERAL.result_text_1');
      this.UiService.presentAlert(resultText);
      this.navController.navigateRoot(["home"]);
      this.UiService.dismissLoading();
    } else {
      this.UiService.dismissLoading();
      if (result.detail["code"] === "auth/email-already-in-use") {
        const resultText: string = this.translateService.instant('CONFIRM_GENERAL.result_text_2');
        this.UiService.presentAlert(resultText);
      } else {
        const resultText: string = this.translateService.instant('CONFIRM_GENERAL.result_text_3');
      this.UiService.presentAlert(resultText);
      }
      console.log(result);
    }
  }
}
