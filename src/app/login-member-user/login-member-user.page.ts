import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserModel } from '../interfaces';
import { UiService } from '../services/ui.service';
import { UserServiceService } from '../services/user-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-member-user',
  templateUrl: './login-member-user.page.html',
  styleUrls: ['./login-member-user.page.scss'],
})
export class LoginMemberUserPage implements OnInit {

  constructor(
    public navController: NavController,
    public UiService:UiService,
    private userService: UserServiceService,
    private translateService:TranslateService
  ) { }

  public user: UserModel = new UserModel();

  ngOnInit() {
  }


  public async Login() {
    this.UiService.presentLoading() //Present Loading
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


  public Register(){
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

}
