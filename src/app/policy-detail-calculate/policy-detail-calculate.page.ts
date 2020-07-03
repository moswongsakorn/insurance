import { Component, OnInit } from '@angular/core';
import { PolicyCrudModel, UserCrudModel } from '../interfaces';
import { DataCenterService } from '../services/data-center.service';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PolicyService } from '../services/policy.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-policy-detail-calculate',
  templateUrl: './policy-detail-calculate.page.html',
  styleUrls: ['./policy-detail-calculate.page.scss'],
})
export class PolicyDetailCalculatePage implements OnInit {

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
    this.policy = this.DataCenterService.GetPolicyCalculate();
  }
}
