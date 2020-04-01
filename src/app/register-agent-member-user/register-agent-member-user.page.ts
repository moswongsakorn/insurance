import { Component, OnInit } from '@angular/core';
import { UserCrudModel } from '../interfaces/index';
import { UserServiceService } from '../services/user-service.service';
import { MagicNumber } from '../interfaces/MagicNumber';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-register-agent-member-user',
  templateUrl: './register-agent-member-user.page.html',
  styleUrls: ['./register-agent-member-user.page.scss'],
})
export class RegisterAgentMemberUserPage implements OnInit {

  public user: UserCrudModel = new UserCrudModel(MagicNumber.user);

  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public navController: NavController,
  ) { }

  ngOnInit() {
  }
  
  public async Register() {

    var pinIsExist = await this.userService.PinIsExist(this.user.Pin);
    var passwordIsMatch = this.user.PasswordIsMatch()
    if (passwordIsMatch && pinIsExist) {
      this.dataCenter.SetUserConfirm(this.user);
      this.navController.navigateForward(['confirm-register-general-user']);
    }
    else {
      if (!passwordIsMatch) console.log("Password is not match!");
      if(!pinIsExist)console.log("This is not exist!");
    }
  }

}
