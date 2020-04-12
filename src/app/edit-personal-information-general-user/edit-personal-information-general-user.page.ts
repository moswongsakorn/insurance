import { Component, OnInit } from '@angular/core';
import { DataCenterService } from '../services/data-center.service';
import { UserCrudModel } from '../interfaces';
import { UserServiceService } from '../services/user-service.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-personal-information-general-user',
  templateUrl: './edit-personal-information-general-user.page.html',
  styleUrls: ['./edit-personal-information-general-user.page.scss'],
})
export class EditPersonalInformationGeneralUserPage implements OnInit {

  public user: UserCrudModel = new UserCrudModel();

  constructor(
    private DataCenterService: DataCenterService,
    private UserService: UserServiceService,
    private NavController: NavController,
    private Router: Router
  ) { }

  ngOnInit() {
    this.user = this.DataCenterService.CloneUserCrudModel();
    this.user.ConfirmPassword = this.user.Password;
  }

  public async Save() {
    console.log(this.user)
    if (this.user.PasswordIsMatch()) {
      var result = await this.UserService.UpdateUser(this.user);
      if (result.status) {
        this.Router.navigate(['/personal-information-general-user']);
      }
      else {
        console.log(result.message)
      }
    }
    else {
      console.log("Password is not match!");
    }
  }

}
