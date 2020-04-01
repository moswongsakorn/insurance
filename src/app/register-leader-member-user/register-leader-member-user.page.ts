import { Component, OnInit } from '@angular/core';
import { UserCrudModel } from '../interfaces/index';
import { UserServiceService } from '../services/user-service.service';
import { MagicNumber } from '../interfaces/MagicNumber';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-register-leader-member-user',
  templateUrl: './register-leader-member-user.page.html',
  styleUrls: ['./register-leader-member-user.page.scss'],
})
export class RegisterLeaderMemberUserPage implements OnInit {

  public user: UserCrudModel = new UserCrudModel(MagicNumber.master);

  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public navController: NavController,
  ) { }

  ngOnInit() {
  }

  public async PinGenerate() {
    this.user.Pin = await this.userService.PinGenerate();
  }

  public async Register() {
    if (this.user.PasswordIsMatch()) {
      this.dataCenter.SetUserConfirm(this.user);
      this.navController.navigateForward(['confirm-register-general-user']);
    }
    else {
      console.log("Password is not match!");
    }
  }

}
