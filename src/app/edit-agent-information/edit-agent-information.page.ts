import { Component, OnInit } from '@angular/core';
import { DataCenterService } from '../services/data-center.service';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserCrudModel } from '../interfaces';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from '../services/ui.service';

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
    private Router: Router,
    private translateService: TranslateService,
    private UiService: UiService
  ) { }

  ngOnInit() {
    this.user = this.DataCenterService.CloneAgentUserCrudModel();
    this.user.ConfirmPassword = this.user.Password;
  }

  public async Save() {
    var pinIsExist = await this.UserService.PinIsExist(this.user.Pin);

    if (pinIsExist) {
      var result = await this.UserService.UpdateAgentUser(this.user);
      if (result.status) {
        this.NavController.back();
      }
      else {
        console.log(result.message)
      }
    }
    else {
      const resultText: string = this.translateService.instant(
        "REGISTER_GENERAL.ERROR_TEXT_4"
      );
      this.UiService.presentAlert(resultText);
      console.log("This is not exist!");
      return;
    }
  }

}
