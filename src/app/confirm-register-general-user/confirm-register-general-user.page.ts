import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';
import { UserCrudModel } from '../interfaces/index'

@Component({
  selector: 'app-confirm-register-general-user',
  templateUrl: './confirm-register-general-user.page.html',
  styleUrls: ['./confirm-register-general-user.page.scss'],
})
export class ConfirmRegisterGeneralUserPage implements OnInit {

  public user: UserCrudModel;

  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public navController: NavController,
  ) { }

  ngOnInit() {
    this.user = this.dataCenter.GetUserCrudModel();
  }

  public async Confirm() {
    var result = await this.userService.RegisterUser(this.user);
    if (result.status == true) {
      console.log(result)
      this.navController.navigateRoot(['login-general-user']);
    }
    else {
      console.log(result)
    }
  }

}
