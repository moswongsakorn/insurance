import { Component, OnInit } from '@angular/core';
import { PolicyCrudModel } from '../interfaces/PolicyCrudModel';
import { DataCenterService } from '../services/data-center.service';
import { PolicyService } from '../services/policy.service';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { TranslateService } from '@ngx-translate/core';
import { AddPolicyRepayGeneralUserPage } from '../add-policy-repay-general-user/add-policy-repay-general-user.page';
import { LengthYearAmount } from '../interfaces/LengthYearAmount';
import { UserCrudModel } from '../interfaces';

@Component({
  selector: 'app-add-policy-general-user',
  templateUrl: './add-policy-general-user.page.html',
  styleUrls: ['./add-policy-general-user.page.scss'],
})
export class AddPolicyGeneralUserPage implements OnInit {

  public policy: PolicyCrudModel = new PolicyCrudModel();
  public userProfile: UserCrudModel = new UserCrudModel();
  public companyData = new Array<string>();
  constructor(
    private DataCenterService: DataCenterService,
    private PolicyService: PolicyService,
    private NavController: NavController,
    private uiService: UiService,
    private translateService: TranslateService,
    private ModalController: ModalController
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.companyData = this.DataCenterService.GetCompanyData();

    this.userProfile = this.DataCenterService.GetThisUserProfile();
    
    this.policy = this.DataCenterService.ClonePolicyDetail();
    console.log('add policy', this.policy);
  }

  public async Save() {
    if (this.policy.CompanyName != 'specific') this.policy.SpecificCampany = "";
    var userProfile = this.DataCenterService.GetThisUserProfile();
    this.policy.Pin = userProfile.Pin;
    var isValid = this.policy.ValidateModel();
    if (isValid.status) {
      this.DataCenterService.SetPolicyDetail(this.policy);
      this.NavController.navigateForward(['add-policy-confirm-general-user']);

    }
    else {
      const errorText: string = this.translateService.instant("ADD_POLICY.ERROR_RESPONSE_TEXT");
      await this.uiService.presentAlert(errorText);
    }
  }


  public async ModalOfPolicy(name: string, lengthYearAmount: LengthYearAmount[]) {
    var isValid = this.policy.ValidateData();
    if (!isValid.status) {
      const errorText: string = this.translateService.instant("ADD_POLICY.ERROR_RESPONSE_TEXT");
      await this.uiService.presentAlert(errorText);
      return;
    }
    else {
      if (lengthYearAmount == null) lengthYearAmount = new Array<LengthYearAmount>();
      var oldData = lengthYearAmount;
      const modal = await this.ModalController.create({
        component: AddPolicyRepayGeneralUserPage,
        componentProps: {
          thisLengthYearAmountList: lengthYearAmount,
          yearOfProtect: this.policy.YearOfProtect,
          yearToPaid: this.policy.YearToPaid,
          name: name
        }
      });

      modal.onDidDismiss().then(result => {
        if (result.data == false) {
          lengthYearAmount = oldData;
          console.log("---- >", lengthYearAmount)
        }
        else {
          switch (result.data.name) {
            case 'ComissionList':
              this.policy.ComissionList = result.data.lengthYearAmountList;
              break;
            case 'ProtectList':
              this.policy.ProtectList = result.data.lengthYearAmountList;
              break;
            case 'ReturnList':
              this.policy.ReturnList = result.data.lengthYearAmountList;
              break;
            default:
          }
        }

        console.log("Modal dismiss ----- >", this.policy)
      })

      return await modal.present();
    }
  }

}
