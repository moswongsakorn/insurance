import { Component, OnInit } from '@angular/core';
import { UserModel, UidRoleModel } from '../interfaces/index';
import { MagicNumber } from '../interfaces/MagicNumber'
import { UserServiceService } from '../services/user-service.service';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../services/ui.service';

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
    public UiService:UiService
  ) { }

  async ngOnInit() {
    var isLogin = await this.userService.IsLogin();
    if (isLogin.status) this.navController.navigateRoot(['policy-list-general-user']);
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

  public back() {
    this.navController.navigateBack(['home'])
  }

}
