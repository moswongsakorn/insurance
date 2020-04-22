import { Component, OnInit } from '@angular/core';
import { PolicyCrudModel } from '../interfaces/PolicyCrudModel';
import { DataCenterService } from '../services/data-center.service';
import { PolicyService } from '../services/policy.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-policy-general-user',
  templateUrl: './add-policy-general-user.page.html',
  styleUrls: ['./add-policy-general-user.page.scss'],
})
export class AddPolicyGeneralUserPage implements OnInit {

  public policy: PolicyCrudModel = new PolicyCrudModel();

  constructor(
    private DataCenterService: DataCenterService,
    private PolicyService: PolicyService,
    private NavController: NavController,
    private uiService:UiService,
    private translateService:TranslateService,
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.policy = this.DataCenterService.ClonePolicyDetail();
    console.log('add policy',this.policy);
  }

  public async Save() {
    if(this.policy.CompanyName != 'specific') this.policy.SpecificCampany = "";
    var userProfile = this.DataCenterService.GetThisUserProfile();
    this.policy.Pin = userProfile.Pin;
    var isValid = this.policy.ValidateModel();
    if (isValid.status) {
      var result = await this.PolicyService.InsertPolicy(this.policy);
      console.log('result', result)
      this.uiService.presentAlert(result.detail)
      this.NavController.navigateBack(['policy-list-general-user'])
    }
    else {
      const errorText:string = this.translateService.instant("ADD_POLICY.ERROR_RESPONSE_TEXT")
      this.uiService.presentAlert(errorText)
      console.log(isValid)
    }
  }

}
