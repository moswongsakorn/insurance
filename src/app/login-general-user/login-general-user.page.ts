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
    public translateService: TranslateService,
    private NavController: NavController,

  ) { }

  async ngOnInit() {
    var isLogin = await this.userService.IsLogin();
    if (isLogin.status) this.navController.navigateRoot(['policy-list-general-user']);
  }

  public async Login() {
    console.log('MagicNumber.quest', this.user.Password)

    if(!this.user.Email && !this.user.Password){
      console.log("case 1")
      const resultText: string = this.translateService.instant('CHANGE_PASSWORD.PASSWORD_ERROR_TEXT_1');
      this.UiService.presentAlert(resultText)
      return;
    }

    if(!this.validatePassword(this.user.Password)){
      console.log("case 1")
      const resultText: string = this.translateService.instant('CHANGE_PASSWORD.PASSWORD_ERROR_TEXT_2');
      this.UiService.presentAlert(resultText)
      return;
    }

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

  validatePassword(inputText){
    // const re = /^[0-9]+$/;
    // return re.test(inputText)
    return (inputText != null && inputText.length >= 6);
  }

  ForgotPassword(){
    this.NavController.navigateForward('forget-password', { queryParams: { role: MagicNumber.quest } })
  }

}
