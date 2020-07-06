import { Component, OnInit } from '@angular/core';
import { DataCenterService } from '../services/data-center.service';
import { PolicyCrudModel, UserCrudModel } from '../interfaces';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PolicyService } from '../services/policy.service';
import { UiService } from "../services/ui.service";
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.page.html',
  styleUrls: ['./policy-detail.page.scss'],
})
export class PolicyDetailPage implements OnInit {


  public policy: PolicyCrudModel = new PolicyCrudModel();
  public userProfile: UserCrudModel = new UserCrudModel();

  constructor(
    private DataCenterService: DataCenterService,
    private NavController: NavController,
    private translateService: TranslateService,
    private policyService: PolicyService,
    private uiService: UiService
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.userProfile = this.DataCenterService.GetThisUserProfile();

    this.policy = this.DataCenterService.GetPolicyDetail();
  }

  Edit() {
    this.NavController.navigateForward(['add-policy-general-user']);
  }

  async Remove() {
    const resultText: string = this.translateService.instant('POLICY_DETAIL.ALERT_TEXT_1');
    // "ยืนยันการลบแผนประกัน?"
    await this.uiService.presentAlertConfirm(resultText, async () => {
      this.uiService.presentLoading();
      var result = await this.policyService.RemovePolicy(this.policy.Key);
      if (result.status) {
        this.uiService.dismissLoading();
        this.NavController.back();
      }
      else {
        this.uiService.dismissLoading();
        this.uiService.presentAlert("Something went wrong please try again.")
      }
    })
  }

  Calculate() {

    if (this.userProfile.Role == 'quest') {
      var policy = new PolicyCrudModel();
      policy.MapData(this.policy);
      var policyCalculate = policy.CloneModel();
      this.DataCenterService.SetPolicyCalculate(policyCalculate);
      this.NavController.navigateForward(['policy-detail-calculate']);
    }
    else {
      this.NavController.navigateForward(['policy-input-calculate']);
    }
  }

}
