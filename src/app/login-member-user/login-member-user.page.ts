import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserModel } from '../interfaces';
import { UiService } from '../services/ui.service';
import { UserServiceService } from '../services/user-service.service';
import { TranslateService } from '@ngx-translate/core';
import { MagicNumber } from '../interfaces/MagicNumber';

@Component({
  selector: 'app-login-member-user',
  templateUrl: './login-member-user.page.html',
  styleUrls: ['./login-member-user.page.scss'],
})
export class LoginMemberUserPage implements OnInit {

  constructor(
    public navController: NavController,
    public UiService: UiService,
    private userService: UserServiceService,
    private NavController: NavController,
    private translateService: TranslateService,
  ) { }

  public user: UserModel = new UserModel();

  ngOnInit() {
  }


  public async Login() {

    if(!this.validatePassword(this.user.Password)){
      const resultText: string = this.translateService.instant('CHANGE_PASSWORD.PASSWORD_ERROR_TEXT_2');
      this.UiService.presentAlert(resultText)
      return;
    }
    this.UiService.presentLoading() //Present Loading
    var isCanLoginMaster = await this.userService.IsCanLogin(this.user.Email, MagicNumber.master);
    var isCanLoginUser = await this.userService.IsCanLogin(this.user.Email, MagicNumber.user);

    console.log("-----**",this.user.Email);
    console.log("master-----**",isCanLoginMaster);
    console.log("user-----**",isCanLoginUser);
    if (!isCanLoginMaster && !isCanLoginUser) {
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


  public Register() {
    this.navController.navigateForward(['register-choice-member-user']);
  }


  public showPassword: boolean = false;
  private passwordType: string = "password";
  private togglePassword() {
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
    this.NavController.navigateForward('forget-password', { queryParams: { role: MagicNumber.master } })
  }

}
