import { Component, OnInit } from '@angular/core';
import { UserCrudModel } from '../interfaces/index';
import { UserServiceService } from '../services/user-service.service';
import { MagicNumber } from '../interfaces/MagicNumber';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-register-general-user',
  templateUrl: './register-general-user.page.html',
  styleUrls: ['./register-general-user.page.scss'],
})
export class RegisterGeneralUserPage implements OnInit {

  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public navController: NavController,

  ) { }

  public user: UserCrudModel = new UserCrudModel();

  ngOnInit() {
  }

  public async PinGenerate() {
    this.user.Pin = await this.userService.PinGenerate();
  }

  public async Register() {
    this.user.InitRole(MagicNumber.quest);
    if (this.user.PasswordIsMatch()) {
      this.dataCenter.SetUserCrudModel(this.user);
      this.navController.navigateForward(['confirm-register-general-user']);
    }
    else {
      console.log("Password is not match!");
    }
  }

}
