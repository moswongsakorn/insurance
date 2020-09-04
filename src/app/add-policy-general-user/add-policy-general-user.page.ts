import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { MagicNumber } from "../interfaces/MagicNumber";
import { from } from 'rxjs';

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
  public customPatterns = { '1': { pattern: new RegExp('^(?!0\.00)\d{1,3}(,\d{3})*(\.\d\d)?$') } };
  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.companyData = this.DataCenterService.GetCompanyData();

    this.userProfile = this.DataCenterService.GetThisUserProfile();

    this.policy = this.DataCenterService.ClonePolicyDetail();
    console.log('add policy', this.policy);
  }

  SumNumber(start:number,end:number): number{
      var sum = 0;
      for (let index = start; index <= end; index++) {
        sum = sum + index;     
      }
      return sum;
  }

  public async Save() {
    const _YearOfProtect = '' + this.policy.YearOfProtect
    const _YearToPaid = '' + this.policy.YearToPaid
    // validate number input
    let checkYear1 = this.uiService.checkInputYear(_YearOfProtect)
    let checkYear2 = this.uiService.checkInputYear(_YearToPaid)
    if (!checkYear1.status || !checkYear2.status) {
      const text = checkYear1.case === 1 ? "POLICY_DETAIL.ALERT_ERROR_YEAR_PROTECT_INPUT" :
        checkYear2.case === 1 ? "POLICY_DETAIL.ALERT_ERROR_YEAR_TOPAID_INPUT" : ""
      const text2 = checkYear1.case === 2 || checkYear2.case === 2 ? "POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2" : ""
      const errorTextLase = this.translateService.instant("POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2")
      const sumText = text || text2
      const errorText: string = this.translateService.instant(errorTextLase);

      await this.uiService.presentAlert(errorTextLase);
      return;
    }
    this.policy.YearOfProtect = +_YearOfProtect
    this.policy.YearToPaid = +_YearToPaid
    // validate money

    const _SumInsured = '' + this.policy.SumInsured
    const _InsurancePremium = '' + this.policy.InsurancePremium
    const _DueMoney = '' + this.policy.DueMoney


    let checkMoney1 = this.uiService.checkInputMoney(_SumInsured)
    let checkMoney2 = this.uiService.checkInputMoney(_InsurancePremium)
    let checkMoney3 = this.uiService.checkInputMoneyPercent(_DueMoney)
    if (!checkMoney1.status || !checkMoney2.status || !checkMoney3.status) {
      const text = !checkMoney1.status && checkMoney1.case === 1 ? { name: 'ADD_POLICY.SUM_INSURED', case: "POLICY_DETAIL.MORE_THAN_ZERO", baht: false } :
        !checkMoney2.status && checkMoney2.case === 1 ? { name: 'ADD_POLICY.INSURANCE_PREMIUM', case: "POLICY_DETAIL.MORE_THAN_ZERO", baht: false } :
          !checkMoney3.status && checkMoney3.case === 1 ? { name: 'ADD_POLICY.DUE_MONEY', case: "POLICY_DETAIL.MORE_THAN_ZERO", baht: false } :
            !checkMoney1.status && checkMoney1.case === 2 ? { name: 'ADD_POLICY.SUM_INSURED', case: "POLICY_DETAIL.WRONG_FORMAT", baht: false } :
              !checkMoney2.status && checkMoney2.case === 2 ? { name: 'ADD_POLICY.INSURANCE_PREMIUM', case: "POLICY_DETAIL.WRONG_FORMAT", baht: false } :
                !checkMoney3.status && checkMoney3.case === 2 ? { name: 'ADD_POLICY.DUE_MONEY', case: "POLICY_DETAIL.WRONG_FORMAT", baht: false } : { name: '', case: "", baht: false }


      const errorText: string = this.translateService.instant("POLICY_DETAIL.PLEASE_TEXT");
      const errorTextName: string = this.translateService.instant(text.name);
      const errorTextCase: string = this.translateService.instant(text.case);
      const errorTextCaseBaht: string = text.baht ? this.translateService.instant('CODE.BATH') : ""

      const errorTextLase = this.translateService.instant("POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2")
      const sumText = errorText + errorTextName + errorTextCase + errorTextCaseBaht
      await this.uiService.presentAlert(errorTextLase);
      return;
    }
    this.policy.SumInsured = +_SumInsured
    this.policy.InsurancePremium = +_InsurancePremium
    this.policy.DueMoney = +_DueMoney
    //end validate input number



    if (this.policy.YearToPaid > this.policy.YearOfProtect) {
      const errorText: string = this.translateService.instant("POLICY_DETAIL.ALERT_ERROR_YEAR");
      await this.uiService.presentAlert(errorText);
      return;
    }

    
    if (this.policy.ProtectList == null || this.policy.ProtectList.length == 0) {
      let errorText: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_6");
      await this.uiService.presentAlert(errorText);
      return;
    }

    
    var sumOfYearOfProtect = this.SumNumber(1,this.policy.YearOfProtect);
    var checkSum = 0;   
    for (let i = 0; i < this.policy.ProtectList.length; i++) {
      let data = this.policy.ProtectList[i];
      let sum = this.SumNumber(data.Start, data.End);
      checkSum = checkSum + sum;
      // if (data.End == this.policy.YearOfProtect) {
      //   isProtectAllYear = true;
      // }
      // if (data.End > this.policy.YearOfProtect) {
      //   const errorText: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_4");
      //   await this.uiService.presentAlert(errorText);
      //   return;
      // }
    }
    if (sumOfYearOfProtect != checkSum) {
      const errorText: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_4");
      await this.uiService.presentAlert(errorText);
      return;
    }


    if (this.userProfile.Role == MagicNumber.master) {
      if (this.policy.ComissionList.length < 1) {
        const errorText: string = this.translateService.instant("ADD_POLICY.COMMISSION_ERROR");
        await this.uiService.presentAlert(errorText);
        return;
      }
    }

    for (let i = 0; i < this.policy.ComissionList.length; i++) {
      let data = this.policy.ComissionList[i];
      if (data.End > this.policy.YearToPaid) {
        const errorText: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_5");
        await this.uiService.presentAlert(errorText);
        return;
      }
    }

    for (let i = 0; i < this.policy.ReturnList.length; i++) {
      let data = this.policy.ReturnList[i];
      if (data.End > this.policy.YearOfProtect) {
        const errorText: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_4");
        await this.uiService.presentAlert(errorText);
        return;
      }
    }


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
    const _YearOfProtect = '' + this.policy.YearOfProtect
    const _YearToPaid = '' + this.policy.YearToPaid
    // validate number input
    let checkYear1 = this.uiService.checkInputYear(_YearOfProtect)
    let checkYear2 = this.uiService.checkInputYear(_YearToPaid)
    if (!checkYear1.status || !checkYear2.status) {
      const text = checkYear1.case === 1 ? "POLICY_DETAIL.ALERT_ERROR_YEAR_PROTECT_INPUT" :
        checkYear2.case === 1 ? "POLICY_DETAIL.ALERT_ERROR_YEAR_TOPAID_INPUT" : ""
      const text2 = checkYear1.case === 2 || checkYear2.case === 2 ? "POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2" : ""
      const errorTextLase = this.translateService.instant("POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2")
      const sumText = text || text2
      const errorText: string = this.translateService.instant(errorTextLase);

      this.uiService.presentAlert(errorText);
      return;
    }
    this.policy.YearOfProtect = +_YearOfProtect
    this.policy.YearToPaid = +_YearToPaid
    // validate money

    const _SumInsured = '' + this.policy.SumInsured
    const _InsurancePremium = '' + this.policy.InsurancePremium
    const _DueMoney = '' + this.policy.DueMoney


    let checkMoney1 = this.uiService.checkInputMoney(_SumInsured)
    let checkMoney2 = this.uiService.checkInputMoney(_InsurancePremium)
    let checkMoney3 = this.uiService.checkInputMoneyZero(_DueMoney)
    if (!checkMoney1.status || !checkMoney2.status || !checkMoney3.status) {
      const text = !checkMoney1.status && checkMoney1.case === 1 ? { name: 'ADD_POLICY.SUM_INSURED', case: "POLICY_DETAIL.MORE_THAN_ZERO", baht: false } :
        !checkMoney2.status && checkMoney2.case === 1 ? { name: 'ADD_POLICY.INSURANCE_PREMIUM', case: "POLICY_DETAIL.MORE_THAN_ZERO", baht: false } :
          !checkMoney3.status && checkMoney3.case === 1 ? { name: 'ADD_POLICY.DUE_MONEY', case: "POLICY_DETAIL.MORE_THAN_ZERO", baht: false } :
            !checkMoney1.status && checkMoney1.case === 2 ? { name: 'ADD_POLICY.SUM_INSURED', case: "POLICY_DETAIL.WRONG_FORMAT", baht: false } :
              !checkMoney2.status && checkMoney2.case === 2 ? { name: 'ADD_POLICY.INSURANCE_PREMIUM', case: "POLICY_DETAIL.WRONG_FORMAT", baht: false } :
                !checkMoney3.status && checkMoney3.case === 2 ? { name: 'ADD_POLICY.DUE_MONEY', case: "POLICY_DETAIL.WRONG_FORMAT", baht: false } : { name: '', case: "", baht: false }


      const errorText: string = this.translateService.instant("POLICY_DETAIL.PLEASE_TEXT");
      const errorTextName: string = this.translateService.instant(text.name);
      const errorTextCase: string = this.translateService.instant(text.case);
      const errorTextCaseBaht: string = text.baht ? this.translateService.instant('CODE.BATH') : ""

      const errorTextLase = this.translateService.instant("POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2")
      const sumText = errorText + errorTextName + errorTextCase + errorTextCaseBaht
      this.uiService.presentAlert(errorTextLase);
      return;
    }
    this.policy.SumInsured = +_SumInsured
    this.policy.InsurancePremium = +_InsurancePremium
    this.policy.DueMoney = +_DueMoney
    //end validate input number

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

  yearInputValidate(input, isProtect) {
    let result = Math.floor(input)
    if (isProtect) {
      if (result > 0) {
        this.policy.YearOfProtect = +result;
      } else {
        this.policy.YearOfProtect = 1;
      }
    } else {
      if (result > 0) {
        this.policy.YearToPaid = +result;
      } else {
        this.policy.YearToPaid = 1;
      }
    }
  }

  moneyReg(evt) {
    console.log('evt', evt)
    console.log('evt', evt.replace(/[^0-9.]/g, ""))
    this.policy.SumInsured = evt.replace(/[^0-9.]/g, "");
    console.log('this.policy.SumInsured', this.policy.SumInsured)

  }

  moneyRegChange(event) {
    console.log('evt change', event)

  }

  moneyInputValidate(input, mode) {
    console.log('input', input)
    if (input == "00") {
      input = 0
    }
    let result = +input
    console.log('input', input)

    if (mode === "SUM_INSURED") {
      if (result >= 0) {
        this.policy.SumInsured = result
      } else {
        this.policy.SumInsured = 0
      }
    }

    if (mode === "INSURANCE_PREMIUM") {
      if (result >= 0) {
        this.policy.InsurancePremium = result
      }
      else {
        this.policy.InsurancePremium = 0
      }
    }
  }


}
