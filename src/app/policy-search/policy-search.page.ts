import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { SearchModel } from '../interfaces/SearchModel';
import { DataCenterService } from '../services/data-center.service';
import { UiService } from '../services/ui.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-policy-search",
  templateUrl: "./policy-search.page.html",
  styleUrls: ["./policy-search.page.scss"],
})
export class PolicySearchPage implements OnInit {

  public SearchModel: SearchModel = new SearchModel();
  private isThaiLanguage = false
  constructor(
    private NavController: NavController,
    private translateService: TranslateService,
    private DataCentorService: DataCenterService,
    private uiService: UiService
  ) { }
  option_1_1: boolean = true;
  option_1_2: boolean = true;
  option_2_1: boolean = true;
  option_2_2: boolean = true;

  // constructor(
  //   private NavController: NavController,
  //   private translateService: TranslateService
  // ) {}

  ngOnInit() {
    this.isThaiLanguage = localStorage.getItem("language")==="th"?true:false
  }

  async searchPolicy() {
    this.SearchModel.irr = (this.SearchModel.irr) ? this.SearchModel.irr : 0;
    this.SearchModel.worth = (this.SearchModel.worth) ? this.SearchModel.worth : 0;
    this.SearchModel.protect = (this.SearchModel.protect) ? this.SearchModel.protect : 0;

    // validate money
  const _SearchModelirr = ''+this.SearchModel.irr 
  const _SearchModelworth = ''+this.SearchModel.worth 
  const _SearchModelprotect = ''+this.SearchModel.protect 

  console.log(this.SearchModel)

    const checkMoney1 =this.SearchModel.irr!=null?this.uiService.checkInputMoneyPercent(_SearchModelirr):{status:true,case:3}
    const checkMoney2 =this.SearchModel.worth!=null?this.uiService.checkInputMoneyPercent(_SearchModelworth):{status:true,case:3}
    const checkMoney3 =this.SearchModel.protect!=null?this.uiService.checkInputMoneyPercent(_SearchModelprotect):{status:true,case:3}
    if(!checkMoney1.status || !checkMoney2.status || !checkMoney3.status){
      const text = !checkMoney1.status&&checkMoney1.case===1?{name:"POLICY_SEARCH.SEARCH_TEXT_IRR",case:"POLICY_DETAIL.MORE_THAN_ZERO"}:
      !checkMoney1.status&&checkMoney1.case===2?{name:"POLICY_SEARCH.SEARCH_TEXT_IRR",case:"POLICY_DETAIL.WRONG_FORMAT"}:
      !checkMoney2.status&&checkMoney2.case===1?{name:"POLICY_SEARCH.SEARCH_TEXT_PROTECT_RATE",case:"POLICY_DETAIL.MORE_THAN_ZERO"}:
      !checkMoney2.status&&checkMoney2.case===2?{name:"POLICY_SEARCH.SEARCH_TEXT_PROTECT_RATE",case:"POLICY_DETAIL.WRONG_FORMAT"}:
      !checkMoney3.status&&checkMoney3.case===1?{name:"POLICY_SEARCH.SEARCH_TEXT_WORTH_RATE",case:"POLICY_DETAIL.MORE_THAN_ZERO"}:
      !checkMoney3.status&&checkMoney3.case===2?{name:"POLICY_SEARCH.SEARCH_TEXT_WORTH_RATE",case:"POLICY_DETAIL.WRONG_FORMAT"}:{name:"POLICY_SEARCH.SEARCH_TEXT_WORTH_RATE",case:"POLICY_DETAIL.WRONG_FORMAT"}

      let errorText: string = this.translateService.instant('POLICY_DETAIL.PLEASE_TEXT');
      let errorTextName: string = this.translateService.instant(text.name);
      let errorTextCase: string = this.translateService.instant(text.case);
      let sumText = errorText+errorTextName+errorTextCase

      const errorTextLase = this.translateService.instant("POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2")
      await this.uiService.presentAlert(errorTextLase);
      return;
    }
    this.SearchModel.irr = +_SearchModelirr 
    this.SearchModel.worth = +_SearchModelworth 
    this.SearchModel.protect = +_SearchModelprotect 

    console.log('irr+++++', this.SearchModel.irr)
    console.log('worth+++++', this.SearchModel.worth)
    console.log('protect+++++', this.SearchModel.protect)
    console.log('sum=', this.SearchModel.irr+this.SearchModel.worth+this.SearchModel.protect)
    console.log('***********************************************',)
    // end validate   


    this.SearchModel.isHealthFalse = (this.SearchModel.isHealthFalse) ? this.SearchModel.isHealthFalse : false;
    this.SearchModel.isHealthTrue = (this.SearchModel.isHealthTrue) ? this.SearchModel.isHealthTrue : false;
    this.SearchModel.isTaxDeductFalse = (this.SearchModel.isTaxDeductFalse) ? this.SearchModel.isTaxDeductFalse : false;
    this.SearchModel.isTaxDeductTrue = (this.SearchModel.isTaxDeductTrue) ? this.SearchModel.isTaxDeductTrue : false;

    var sumPercent = this.SearchModel.irr + this.SearchModel.worth + this.SearchModel.protect;
    sumPercent = Math.round(sumPercent * 100) / 100;
    if (sumPercent != 100) {
      const errorText: string = this.translateService.instant("POLICY_SEARCH.SUB_TITLE");
      await this.uiService.presentAlert(errorText);
    }
    else {
      this.DataCentorService.SetSearchModel(this.SearchModel);
      this.NavController.navigateForward(["policy-search-result"]);
    }
  }

  option_1_Click(option, question) {
    //toggel optopn 1 ลดหย่อนภาษี
    if (question === "1") {
      if (option === "not") {
        this.option_1_2 = !this.option_1_2;
      }
      if (option === "have") {
        this.option_1_1 = !this.option_1_1;
      }
    }

    //toggel optopn 2 ประกันสุขภาพ
    if (question === "2") {
      if (option === "not") {
        this.option_2_2 = !this.option_2_2;
      }
      if (option === "have") {
        this.option_2_1 = !this.option_2_1;
      }
    }
  }

  moneyInputValidate(input,mode){
    if(input=="00"){
      input = 0
    }
    let result = +input
    
    if(mode==="SEARCH_TEXT_IRR"){
      if (result >= 0) {
        this.SearchModel.irr = result
      }else{
        this.SearchModel.irr = 0
      }
    }

    if(mode==="SEARCH_TEXT_PROTECT_RATE"){
      if (result >= 0) {
        this.SearchModel.protect = result
      }
      else{
        this.SearchModel.protect = 0
      }
    }

    if(mode==="SEARCH_TEXT_WORTH_RATE"){
      if (result >= 0) {
        this.SearchModel.worth = result
      }
      else{
        this.SearchModel.worth = 0
      }
    }


  }
}
