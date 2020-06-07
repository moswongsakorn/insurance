import { Component, OnInit } from '@angular/core';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PolicyCrudModel, UserCrudModel } from '../interfaces';
import { PolicyService } from '../services/policy.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-add-policy-confirm-general-user',
  templateUrl: './add-policy-confirm-general-user.page.html',
  styleUrls: ['./add-policy-confirm-general-user.page.scss'],
})
export class AddPolicyConfirmGeneralUserPage implements OnInit {
  
  constructor(
    private DataCenterService: DataCenterService,
    private NavController: NavController,
    private translateService:TranslateService,
    private PolicyService: PolicyService,
    private uiService: UiService,

  ) { }

  public policy: PolicyCrudModel = new PolicyCrudModel();
  public userProfile: UserCrudModel = new UserCrudModel();

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.userProfile = this.DataCenterService.GetThisUserProfile();

    this.policy = this.DataCenterService.ClonePolicyDetail();
  }

  Edit() {
    this.NavController.back();
  }

  async Save(){
      var result = await this.PolicyService.InsertPolicy(this.policy);
      this.uiService.presentAlert(result.detail)
      this.NavController.navigateBack(['policy-list-general-user'])
  }


}
