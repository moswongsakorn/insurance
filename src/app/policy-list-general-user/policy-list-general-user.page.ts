import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { PolicyService } from '../services/policy.service';
import { UserCrudModel, PolicyCrudModel } from '../interfaces';
import { DataCenterService } from '../services/data-center.service';

@Component({
  selector: 'app-policy-list-general-user',
  templateUrl: './policy-list-general-user.page.html',
  styleUrls: ['./policy-list-general-user.page.scss'],
})
export class PolicyListGeneralUserPage implements OnInit {

  constructor(
    private router: Router,
    private UserService: UserServiceService,
    private NavController: NavController,
    private PolicyService: PolicyService,
    private DataCenterService: DataCenterService
  ) { }

  public policyList: PolicyCrudModel[];
  public policyListForSearch: PolicyCrudModel[];

  public userProfile: UserCrudModel;

  async ngOnInit() {

  }

  async ionViewDidEnter() {
    this.userProfile = this.DataCenterService.GetThisUserProfile();
    this.policyList = await this.PolicyService.GetPolicyListByPin(this.userProfile.Pin);
    this.policyListForSearch = this.policyList;
    console.log(this.policyList)
  }

  navigate() {
    console.log('click')
    this.router.navigate(['/personal-information-general-user'])
  }

  async Logout() {
    var result = await this.UserService.Logout();
    console.log(result)
    if (result.status) this.NavController.navigateRoot(['login-general-user'])
  }

  Searchbar(event) {
    let serachData = this.policyListForSearch.filter((value, key) => {
      let val = value.CompanyName + ' ' + value.PolicyName
      if (val.search(event.detail.value) == -1) {
        return false;
      }
      else {
        return true;
      }
    })
    this.policyList = serachData;
  }
}
