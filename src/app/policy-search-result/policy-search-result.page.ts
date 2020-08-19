import { Component, OnInit } from '@angular/core';
import { PolicyCrudModel, UserCrudModel } from '../interfaces';
import { UiService } from '../services/ui.service';
import { TranslateService } from '@ngx-translate/core';
import { DataCenterService } from '../services/data-center.service';
import { SearchModel } from '../interfaces/SearchModel';
import { PolicyService } from '../services/policy.service';
import { NavController } from '@ionic/angular';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

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

  }

  async ionViewDidEnter() {
    await this.UiService.presentLoading()

    this.userProfile = this.DataCenterService.GetThisUserProfile();
    this.SearchModel = this.DataCenterService.GetSearchModel();
    this.policyList = await this.PolicyService.GetPolicyListByPin(this.userProfile.Pin);

    var tempPplicy = JSON.parse(JSON.stringify(this.policyList)) as PolicyCrudModel[];
    
    var maxIrr = -10000;
    var minIrr = 10000;

    var maxRc = -10000;
    var minRc = 10000;

    var maxWr = -10000;
    var minWr = 10000;

    this.policyList.forEach(data => {
      //-------------------------- Init IRR
      if (data.Irr < -3) data.Irr = -3;
      if (data.Irr > maxIrr) maxIrr = data.Irr;
      if (data.Irr < minIrr) minIrr = data.Irr;

      //-------------------------- Init RC
      if(data.ProtectRate > 7) data.ProtectRate = 7;
      if(data.ProtectRate > maxRc) maxRc = data.ProtectRate;
      if(data.ProtectRate < minRc) minRc = data.ProtectRate

      //-------------------------- Init Wr
      if(data.ValueRate > maxWr) maxWr = data.ValueRate;
      if(data.ValueRate < minWr) minWr = data.ValueRate;

    })





    this.policyList.forEach(data => {

      var newWort = this.GetWorthPoint(data.ValueRate, maxWr ,minWr);
      var newIrr = this.GetNewIrr(data.Irr, maxIrr, minIrr);
      var newRc = this.GetNewRc(data.ProtectRate, maxRc, minRc);

      var pointSort = ((this.SearchModel.irr * newIrr) +
        (this.SearchModel.protect * newRc) +
        (this.SearchModel.worth * newWort)) / 100;
      data.PointForSort = Math.round(pointSort * 10000) / 10000;
    })



    this.policyList.sort((a, b) => (a.PointForSort < b.PointForSort) ? 1 : -1);

    var allHealth = (this.SearchModel.isHealthFalse == this.SearchModel.isHealthTrue) ? true : false;
    var allTaxDeduct = (this.SearchModel.isTaxDeductTrue == this.SearchModel.isTaxDeductFalse) ? true : false;


    var maxPoint = 0;
    var policyListSortIndex = 0;
    this.policyListSort = new Array<PolicyCrudModel>();
    this.policyList.forEach(data => {
      var temp = tempPplicy.find(d=>d.Key==data.Key);
      data.Irr = temp.Irr;
      data.ProtectRate = temp.ProtectRate;
      
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
          var lastPoint = (this.policyListSort[policyListSortIndex - 1]) ? this.policyListSort[policyListSortIndex - 1].PointForSort : -100000;

          console.log("lastPoint : ", lastPoint)
          console.log("newPoint : ", data.PointForSort)
          if (lastPoint != data.PointForSort) maxPoint++;

          policyListSortIndex++;

        }
      }

    })

    this.UiService.dismissLoading() //Dismiss Loading
    this.activeStatus = true
  }

  GetWorthPoint(wr: number, maxWr: number, minWr:number) {
    if(maxWr == minWr) return 1;
    var newWr = (wr - minWr) / (maxWr - minWr);
    return newWr;
  }

  GetNewIrr(irr: number, maxIrr: number, minIrr: number): number {
    if(maxIrr == minIrr) return 1;
    var newIrr = (irr - minIrr) / (maxIrr - minIrr);
    return newIrr;
  }

  GetNewRc(rc: number, maxRc: number, minRc: number): number {
    if(maxRc == minRc) return 1;
    var newRc = (rc - minRc) / (maxRc - minRc);
    return newRc;
  }


  PolicyDetail(policy: PolicyCrudModel) {
    this.DataCenterService.SetPolicyDetail(policy);
    this.NavController.navigateForward(['policy-detail']);
  }

}
