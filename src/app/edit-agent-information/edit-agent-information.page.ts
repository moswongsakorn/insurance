import { Component, OnInit } from '@angular/core';
import { DataCenterService } from '../services/data-center.service';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserCrudModel } from '../interfaces';

@Component({
  selector: 'app-edit-agent-information',
  templateUrl: './edit-agent-information.page.html',
  styleUrls: ['./edit-agent-information.page.scss'],
})
export class EditAgentInformationPage implements OnInit {

  public user: UserCrudModel = new UserCrudModel();

  constructor(
    private DataCenterService: DataCenterService,
    private UserService: UserServiceService,
    private NavController: NavController,
    private Router: Router
  ) { }

  ngOnInit() {
    this.user = this.DataCenterService.CloneAgentUserCrudModel();
    this.user.ConfirmPassword = this.user.Password;
  }

  public async Save() {
    var result = await this.UserService.UpdateAgentUser(this.user);
    if (result.status) {
      this.NavController.back();
    }
    else {
      console.log(result.message)
    }
  }

}
