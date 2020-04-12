import { Component, OnInit } from '@angular/core';
import { UserModel, UidRoleModel } from '../interfaces/index';
import { MagicNumber } from '../interfaces/MagicNumber'
import { UserServiceService } from '../services/user-service.service';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';

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
  ) { }

  async ngOnInit() {
    var isLogin = await this.userService.IsLogin();
    if (isLogin.status) this.navController.navigateRoot(['policy-list-general-user']);
  }

  public async Login() {
    var result = await this.userService.Login(this.user);
    if (result.status) {
      // var user = <UidRoleModel>result.detail;
      console.log(result)
      this.navController.navigateRoot(['policy-list-general-user'])
    }
    else {
      console.log(result)
    }
  }

  public back() {
    this.navController.navigateBack(['home'])
  }

}
