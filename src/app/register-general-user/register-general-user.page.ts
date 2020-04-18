import { Component, OnInit } from "@angular/core";
import { UserCrudModel } from "../interfaces/index";
import { UserServiceService } from "../services/user-service.service";
import { MagicNumber } from "../interfaces/MagicNumber";
import { DataCenterService } from "../services/data-center.service";
import { NavController } from "@ionic/angular";
import { UiService } from "../services/ui.service";

@Component({
  selector: "app-register-general-user",
  templateUrl: "./register-general-user.page.html",
  styleUrls: ["./register-general-user.page.scss"],
})
export class RegisterGeneralUserPage implements OnInit {
  constructor(
    private userService: UserServiceService,
    private dataCenter: DataCenterService,
    public navController: NavController,
    public UiService: UiService
  ) {}

  public user: UserCrudModel = new UserCrudModel();
  public showPassword: boolean = false;
  private passwordType: string = "password";
  ngOnInit() {}

  public async PinGenerate() {
    this.user.Pin = await this.userService.PinGenerate();
  }

  public async Register() {
    if (this.checkIDCard(this.user.IdCard) === false) {
      this.UiService.presentAlert("เลขบัตรประชาชนไม่ถูกต้อง");
      return;
    }

    this.user.InitRole(MagicNumber.quest);
    if (this.user.PasswordIsMatch()) {
      this.dataCenter.SetUserCrudModel(this.user);
      this.navController.navigateForward(["confirm-register-general-user"]);
    } else {
      console.log("Password is not match!");
    }
  }

  private checkIDCard(id) {
    //  console.log('id',id)
    let i = 0;
    let sum = 0;
    if (id.length != 13) {
      // console.log('CASE 1')
      return false;
    }
    for (i = 0, sum = 0; i < 12; i++) {
      sum += parseFloat(id.charAt(i)) * (13 - i);
      // console.log('',)
    }
    if ((11 - (sum % 11)) % 10 != parseFloat(id.charAt(12))) {
      // console.log('CASE 2')
      return false;
    } else {
      // console.log('CASE 3')
      return true;
    }
  }

  private togglePassword() {
    this.showPassword = !this.showPassword;
    this.showPassword
      ? (this.passwordType = "text")
      : (this.passwordType = "password");
  }
}
