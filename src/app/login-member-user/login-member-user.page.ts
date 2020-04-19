import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserModel } from '../interfaces';
import { UiService } from '../services/ui.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login-member-user',
  templateUrl: './login-member-user.page.html',
  styleUrls: ['./login-member-user.page.scss'],
})
export class LoginMemberUserPage implements OnInit {

  constructor(
    public navController: NavController,
    public UiService:UiService,
    private userService: UserServiceService

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
      this.UiService.presentAlert("เข้าสู่ระบบเรียบร้อยแล้ว")

    }
    else {
      this.UiService.dismissLoading() //Dismiss Loading
      this.UiService.presentAlert("ไม่สามารถเข้าสู่ระบบได้กรุณาตรวจสอบอีเมล์และรหัสผ่านของท่าน")
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
