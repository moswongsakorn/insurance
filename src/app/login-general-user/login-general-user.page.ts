import { Component, OnInit } from '@angular/core';
import { UserModel, UidRoleModel } from '../interfaces/index';
import { MagicNumber } from '../interfaces/MagicNumber'
import { UserServiceService } from '../services/user-service.service';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-general-user',
  templateUrl: './login-general-user.page.html',
  styleUrls: ['./login-general-user.page.scss'],
})
export class LoginGeneralUserPage implements OnInit {

  public user: UserModel = new UserModel();

  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public navController: NavController,
    public UiService: UiService,
    public translateService: TranslateService
  ) { }

  async ngOnInit() {
    var isLogin = await this.userService.IsLogin();
    if (isLogin.status) this.navController.navigateRoot(['policy-list-general-user']);
  }

  public async Login() {
    this.UiService.presentLoading() //Present Loading
    var isCanLogin = await this.userService.IsCanLogin(this.user.Email, MagicNumber.quest);
    if (!isCanLogin) {
      this.UiService.dismissLoading() //Dismiss Loading
      const resultText: string = this.translateService.instant('GENERAL_LOGIN.FAIL_LOGIN');
      this.UiService.presentAlert(resultText)
      return;
    }

    var result = await this.userService.Login(this.user);
    if (result.status) {
      // var user = <UidRoleModel>result.detail;
      console.log(result)
      this.UiService.dismissLoading() //Dismiss Loading
      this.navController.navigateRoot(['policy-list-general-user'])
      const resultText: string = this.translateService.instant('GENERAL_LOGIN.SUCCESS_LOGIN');
      this.UiService.presentAlert(resultText)

    }
    else {
      this.UiService.dismissLoading() //Dismiss Loading
      const resultText: string = this.translateService.instant('GENERAL_LOGIN.FAIL_LOGIN');
      this.UiService.presentAlert(resultText)
      console.log(result)
    }
  }

  public back() {
    this.navController.navigateBack(['home'])
  }

  public showPassword: boolean = false;
  public passwordType: string = "password";
  public togglePassword() {
    this.showPassword = !this.showPassword;
    this.showPassword
      ? (this.passwordType = "text")
      : (this.passwordType = "password");
  }

}
