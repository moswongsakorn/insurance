import { Component, OnInit } from '@angular/core';
import { UserCrudModel } from '../interfaces/index';
import { UserServiceService } from '../services/user-service.service';
import { MagicNumber } from '../interfaces/MagicNumber';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../services/ui.service';


@Component({
  selector: 'app-register-leader-member-user',
  templateUrl: './register-leader-member-user.page.html',
  styleUrls: ['./register-leader-member-user.page.scss'],
})
export class RegisterLeaderMemberUserPage implements OnInit {

  public user: UserCrudModel = new UserCrudModel();

  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public navController: NavController,
    public UiService: UiService

  ) { }

  ngOnInit() {
  }

  public async PinGenerate() {
    this.user.Pin = await this.userService.PinGenerate();
  }

  public async Register() {

    if (this.user.IsValidModel() == false) {
      await this.UiService.presentAlert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    this.user.InitRole(MagicNumber.master);
    if (this.user.PasswordIsMatch()) {
      this.dataCenter.SetUserCrudModel(this.user);
      this.navController.navigateForward(['confirm-register-general-user']);
    }
    else {
      console.log("Password is not match!");
    }
  }

  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public passwordType: string = "password";
  public confirmPasswordType: string = "password";
  public togglePassword() {
    this.showPassword = !this.showPassword;
    this.showPassword
      ? (this.passwordType = "text")
      : (this.passwordType = "password");
  }

  public toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
    this.showConfirmPassword
      ? (this.confirmPasswordType = "text")
      : (this.confirmPasswordType = "password");
  }

}
