import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { UserServiceService } from "../services/user-service.service";
import { UiService } from "../services/ui.service";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute } from '@angular/router';
import { MagicNumber } from '../interfaces/MagicNumber';

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.page.html",
  styleUrls: ["./forget-password.page.scss"],
})
export class ForgetPasswordPage implements OnInit {
  constructor(
    private NavController: NavController,
    private UserService: UserServiceService,
    private UiService: UiService,
    private translateService: TranslateService,
    private route: ActivatedRoute,

  ) {
    this.route.queryParamMap.subscribe(params => {
      this.role = params.get('role')
    })
  }

  public role = "";

  public email: string;

  ngOnInit() {}

  back() {
    this.NavController.back();
  }

  async sendEmail() {
    if (!this.email) {
      const resultText: string = this.translateService.instant(
        "FORGOT_PASSWORD.ERROR_EMPTY_TEXT_EMAIL"
      );
      this.UiService.presentAlert(resultText);
      return;
    }

    if(this.role == MagicNumber.quest)
    {
      var isCanLogin = await this.UserService.IsCanLogin(this.email, this.role);
      if (!isCanLogin) {
        this.UiService.dismissLoading() //Dismiss Loading
        const resultText: string = this.translateService.instant('GENERAL_LOGIN.FORGOT_PASSWORD');
        this.UiService.presentAlert(resultText)
        return;
      }
    }
    else
    {
      var isCanLoginMaster = await this.UserService.IsCanLogin(this.email, MagicNumber.master);
      var isCanLoginUser = await this.UserService.IsCanLogin(this.email, MagicNumber.user);
      if (!isCanLoginMaster && !isCanLoginUser) {
        this.UiService.dismissLoading() //Dismiss Loading
        const resultText: string = this.translateService.instant('GENERAL_LOGIN.FORGOT_PASSWORD');
        this.UiService.presentAlert(resultText)
        return;
      }
    }

    var result = await this.UserService.SendMailResetPassword(this.email);
    if (result.status) {
      const resultText: string = this.translateService.instant(
        "FORGOT_PASSWORD.SUCCESS_TEXT"
      );
      this.UiService.presentAlert(resultText + " " + this.email);
      this.NavController.back();
    } else {
      console.log(result.message);
      const resultText: string = this.translateService.instant(
        "FORGOT_PASSWORD.FAIL_TEXT"
      );
      this.UiService.presentAlert(resultText);
    }
  }
}
