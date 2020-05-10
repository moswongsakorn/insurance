import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { DataCenterService } from '../services/data-center.service';
import { UidRoleModel, UserCrudModel } from '../interfaces';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-agent-information',
  templateUrl: './agent-information.page.html',
  styleUrls: ['./agent-information.page.scss'],
})
export class AgentInformationPage implements OnInit {

  public user: UserCrudModel = new UserCrudModel();
  public userUid: string;

  constructor(
    private UserService: UserServiceService,
    private DataCenterService: DataCenterService,
    private route: ActivatedRoute,
    private NavController: NavController
  ) {
    this.route.queryParamMap.subscribe(params => {
      this.userUid = params.get('uid')
    })
  }

  ngOnInit() {
    console.log(this.userUid)
  }

  async ionViewDidEnter() {
    this.UserService.GetUserProfilePromise(this.userUid)
      .then(user => {
        this.user = user;
        this.DataCenterService.SetAgentUserCrudModel(this.user);
      });
  }

  async removeUserPin() {
    this.user.Pin = "";
    var result = await this.UserService.UpdateAgentUser(this.user);
    if (result.status) {
      this.NavController.back()
    }
    else {
      console.log(result.message)
    }
  }


}