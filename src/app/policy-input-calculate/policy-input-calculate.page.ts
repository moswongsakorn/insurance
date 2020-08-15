import { Component, OnInit } from '@angular/core';
import { PolicyCrudModel, UserCrudModel } from '../interfaces';
import { DataCenterService } from '../services/data-center.service';
import { IrrService } from '../services/irr.service';
import { NavController } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-policy-input-calculate',
  templateUrl: './policy-input-calculate.page.html',
  styleUrls: ['./policy-input-calculate.page.scss'],
})
export class PolicyInputCalculatePage implements OnInit {

  constructor(
    private DataCenterService: DataCenterService,
    private irrService: IrrService,
    private NavController: NavController,
    private uiService: UiService,
    private translateService:TranslateService
  ) { }

  public sumInsured: number;
  public insurancePremium: number;

  public policy: PolicyCrudModel = new PolicyCrudModel();
  public userProfile: UserCrudModel = new UserCrudModel();


  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.userProfile = this.DataCenterService.GetThisUserProfile();
    this.policy = this.DataCenterService.GetPolicyDetail();
  }

  async Save() {

    if (this.sumInsured == null || this.insurancePremium == null) {
        let errorText: string = this.translateService.instant("ADD_POLICY.ERROR_RESPONSE_TEXT");
        // var alertText = "กรุณากรอกข้อมูลให้ครบ";
      this.uiService.presentAlert(errorText);
    }
    else {
      
      // validate money
      const checkMoney1 =this.sumInsured!=null?this.uiService.checkInputMoney(this.sumInsured):{status:true,case:3}
    const checkMoney2 =this.insurancePremium!=null?this.uiService.checkInputMoney(this.insurancePremium):{status:true,case:3}
    if(!checkMoney1.status || !checkMoney2.status){
      const text = !checkMoney1.status&&checkMoney1.case===1?{name:"ADD_POLICY.SUM_INSURED",case:"POLICY_DETAIL.MORE_THAN_ZERO",baht:true}:
      !checkMoney1.status&&checkMoney1.case===2?{name:"ADD_POLICY.SUM_INSURED",case:"POLICY_DETAIL.WRONG_FORMAT",baht:false}:
      !checkMoney2.status&&checkMoney2.case===1?{name:"ADD_POLICY.INSURANCE_PREMIUM",case:"POLICY_DETAIL.MORE_THAN_ZERO",baht:true}:
      !checkMoney2.status&&checkMoney2.case===2?{name:"ADD_POLICY.INSURANCE_PREMIUM",case:"POLICY_DETAIL.WRONG_FORMAT",baht:false}:
      {name:"ADD_POLICY.INSURANCE_PREMIUM",case:"POLICY_DETAIL.WRONG_FORMAT"}
     
      let errorText: string = this.translateService.instant('POLICY_DETAIL.PLEASE_TEXT');
      let errorTextName: string = this.translateService.instant(text.name);
      let errorTextCase: string = this.translateService.instant(text.case);
      let baht: string = text.baht?this.translateService.instant('CODE.BATH'):""
      let sumText = errorText+errorTextName+errorTextCase+baht

      await this.uiService.presentAlert(sumText);
      return;
    }


      await this.uiService.presentLoading();
      var policy = new PolicyCrudModel();
      policy.MapData(this.policy);
      var newPolicy = policy.CloneModel();
      newPolicy.SumInsured = (this.sumInsured) ? this.sumInsured : 0;
      newPolicy.InsurancePremium = this.insurancePremium ? this.insurancePremium : 0;

      let irr = this.irrService.irr(newPolicy.GetCashFlow());
      newPolicy.Irr = irr;

      let irrAgent = this.irrService.irr(newPolicy.GetCashFloawAgent());
      newPolicy.IrrAgent = irrAgent;

      newPolicy.Calculate();
      this.uiService.dismissLoading();

      this.DataCenterService.SetPolicyCalculate(newPolicy);
      this.NavController.navigateForward(['policy-detail-calculate']);
    }
  }

  
  moneyInputValidate(input,mode){
    if(input=="00"){
      input = 0
    }
    let result = +input
    
    if(mode==="SUM_INSURED"){
      if (result >= 0) {
        this.sumInsured = result
      }else{
        this.sumInsured = 0
      }
    }

    if(mode==="INSURANCE_PREMIUM"){
      if (result >= 0) {
        this.insurancePremium = result
      }
      else{
        this.insurancePremium = 0
      }
    }
  }

}
