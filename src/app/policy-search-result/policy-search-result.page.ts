import { Component, OnInit } from '@angular/core';
import { PolicyCrudModel, UserCrudModel } from '../interfaces';
import { UiService } from '../services/ui.service';
import { TranslateService } from '@ngx-translate/core';
import { DataCenterService } from '../services/data-center.service';
import { SearchModel } from '../interfaces/SearchModel';
import { PolicyService } from '../services/policy.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-policy-search-result',
  templateUrl: './policy-search-result.page.html',
  styleUrls: ['./policy-search-result.page.scss'],
})
export class PolicySearchResultPage implements OnInit {

  public activeStatus: boolean = false;
  public SearchModel: SearchModel = new SearchModel();
  public policyList: PolicyCrudModel[];
  public userProfile: UserCrudModel = new UserCrudModel();

  public policyListSort: PolicyCrudModel[];

  constructor(
    private UiService: UiService,
    private translateService: TranslateService,
    private DataCenterService: DataCenterService,
    private PolicyService: PolicyService,
    private NavController: NavController,

  ) { }

  ngOnInit() {
    this.UiService.presentLoading()
  }

  async ionViewDidEnter() {
    this.userProfile = this.DataCenterService.GetThisUserProfile();
    this.SearchModel = this.DataCenterService.GetSearchModel();
    this.policyList = await this.PolicyService.GetPolicyListByPin(this.userProfile.Pin);


    var maxIrr = -10000;

    this.policyList.forEach(data => {
      if (data.Irr < -3) data.Irr = -3;
      if (data.Irr > maxIrr) maxIrr = data.Irr;
    })

    this.policyList.forEach(data => {
      var newValueRate = this.GetWorthPoint(maxIrr, data.ValueRate);
      var pointSort = ((this.SearchModel.irr * data.Irr) +
        (this.SearchModel.protect * data.ProtectRate) +
        (this.SearchModel.worth * newValueRate)) / 100;
      data.PointForSort = Math.round(pointSort * 100) / 100;
    })

    this.policyList.sort((a, b) => (a.PointForSort < b.PointForSort) ? 1 : -1);

    var allHealth = (this.SearchModel.isHealthFalse == this.SearchModel.isHealthTrue) ? true : false;
    var allTaxDeduct = (this.SearchModel.isTaxDeductTrue == this.SearchModel.isTaxDeductFalse) ? true : false;


    var maxPoint = 0;
    var policyListSortIndex = 0;
    this.policyListSort = new Array<PolicyCrudModel>();
    this.policyList.forEach(data => {
      var passHealth = false;
      var passTaxDeduct = false;

      if (allHealth) {
        passHealth = true;
      }
      else if (this.SearchModel.isHealthFalse == true && data.IsHealth == false) {
        passHealth = true;
      }
      else if (this.SearchModel.isHealthTrue == true && data.IsHealth == true) {
        passHealth = true;
      }

      if (allTaxDeduct) {
        passTaxDeduct = true;
      }
      else if (this.SearchModel.isTaxDeductFalse == true && data.IsTaxDeduct == false) {
        passTaxDeduct = true;
      }
      else if (this.SearchModel.isTaxDeductTrue == true && data.IsTaxDeduct == true) {
        passTaxDeduct = true;
      }

      if (passTaxDeduct && passHealth) {
        if (maxPoint < 5) {
          this.policyListSort.push(data);
          policyListSortIndex++;
          var lostPoint = (this.policyListSort[policyListSortIndex - 1]) ? this.policyListSort[policyListSortIndex - 1].PointForSort : -1987654.2365;
          if (lostPoint != data.PointForSort) maxPoint++;
        }
      }

    })

    this.UiService.dismissLoading() //Dismiss Loading
    this.activeStatus = true
  }

  GetWorthPoint(maxIrr: number, wr: number) {
    var minWr = 0;
    var maxWr = 1;
    var minIrr = -3;
    var wrNew = ((wr - minWr) + (maxIrr - minIrr) / (maxWr - minWr)) + minIrr;
    return wrNew;
  }


  PolicyDetail(policy: PolicyCrudModel) {
    this.DataCenterService.SetPolicyDetail(policy);
    this.NavController.navigateForward(['policy-detail']);
  }

}
