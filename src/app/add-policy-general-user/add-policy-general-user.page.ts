import { Component, OnInit } from '@angular/core';
import { PolicyCrudModel } from '../interfaces/PolicyCrudModel';
import { DataCenterService } from '../services/data-center.service';
import { PolicyService } from '../services/policy.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
    private NavController:NavController
  ) { }

  ngOnInit() {
  }

  public async Save() {
    var userProfile = this.DataCenterService.GetThisUserProfile();
    this.policy.Pin = userProfile.Pin;
    var isValid = this.policy.ValidateModel();
    if (isValid.status) {
      var result = await this.PolicyService.InsertPolicy(this.policy);
      console.log(result)
      this.NavController.navigateBack(['policy-list-general-user'])
    }
    else {
      console.log(isValid)
    }
  }

}
