import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LengthYearAmount } from "../interfaces/LengthYearAmount";
import { NavController, ModalController, NavParams } from "@ionic/angular";
import { UiService } from "../services/ui.service";
import { YearAmount } from "../interfaces/YearAmount";

@Component({
  selector: "app-add-policy-repay-general-user",
  templateUrl: "./add-policy-repay-general-user.page.html",
  styleUrls: ["./add-policy-repay-general-user.page.scss"],
})
export class AddPolicyRepayGeneralUserPage implements OnInit {
  public lengthYearAmountList: LengthYearAmount[] = new Array<
    LengthYearAmount
  >();

  constructor(
    private translateService: TranslateService,
    private NavController: NavController,
    private uiService: UiService,
    private modalController: ModalController
  ) {}

  @ViewChild("content", { static: true }) private content: any;
  @Input("name") name: string;
  @Input("yearToPaid") yearToPaid: number;
  @Input("yearOfProtect") yearOfProtect: number;
  @Input("thisLengthYearAmountList")
  thisLengthYearAmountList: LengthYearAmount[];

  public Title: string = "";
  public SUB_TEAR_AT: string = "";

  public SubTitle: String = "";

  ngOnInit() {}

  ionViewDidEnter() {
    this.lengthYearAmountList = JSON.parse(
      JSON.stringify(this.thisLengthYearAmountList)
    );

    if (this.lengthYearAmountList.length == 0) {
      var lengthYearAmount1 = new LengthYearAmount();
      lengthYearAmount1.IsRange = false;
      this.lengthYearAmountList.push(lengthYearAmount1);

      var lengthYearAmount2 = new LengthYearAmount();
      lengthYearAmount2.IsRange = true;
      this.lengthYearAmountList.push(lengthYearAmount2);
    }

    if (this.name == "ReturnList") {
      this.Title = this.translateService.instant("ADD_POLICY.LAST_YEAR_INSURANCE_MONEY");
      this.SubTitle = this.translateService.instant("ADD_POLICY.SUB_TITLE_RETURN");
      this.SUB_TEAR_AT = this.translateService.instant("ADD_POLICY.SUB_TEAR_AT_2");
    } else if (this.name == "ComissionList") {
      this.Title = this.translateService.instant("ADD_POLICY.COMMISSION");
      this.SubTitle = this.translateService.instant("ADD_POLICY.SUB_TITLE_COMMISSION");
      this.SUB_TEAR_AT = this.translateService.instant("POLICY_REPAY.SUB_TEAR_AT");
    } else if (this.name == "ProtectList") {
      this.Title = this.translateService.instant("ADD_POLICY.DEATH_COVERAGE");
      this.SubTitle = this.translateService.instant("ADD_POLICY.SUB_TITLE_PROTECT");
      this.SUB_TEAR_AT = this.translateService.instant("ADD_POLICY.SUB_TEAR_AT_2");
    }
  }

  back() {
    this.modalController.dismiss(false);
  }

  async submit() {
    var IsSubmit = true;   


    var checkSumOfProtect = 0;
    for (let i = this.lengthYearAmountList.length - 1; i >= 0; i--) {
      var element = this.lengthYearAmountList[i];
      if (
        element.Start == null &&
        element.End == null &&
        element.Amount == null
        
      ) {
        this.delete(i);
        continue;
      }
      //console.log('element', element)
      // VAlidate Year
      const _elementStart = ''+element.Start
      const  _elementEnd = ''+element.End
      const checkYear1 =element.Start!=null?this.uiService.checkInputYear(_elementStart):{status:true,case:3}
      const checkYear2 =element.End!=null?this.uiService.checkInputYear(_elementEnd):{status:true,case:3}
      if(!checkYear1.status || !checkYear2.status){
        const text = !checkYear1.status&&checkYear1.case===1?"POLICY_DETAIL.ALERT_YEAR_INPUT":
        !checkYear1.status&&checkYear1.case===2?"POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2":
        !checkYear2.status&&checkYear2.case===1?"POLICY_DETAIL.ALERT_YEAR_INPUT":
        !checkYear2.status&&checkYear2.case===2?"POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2":""
        let errorText: string = this.translateService.instant(text);

        const errorTextLase = this.translateService.instant("POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2")
        await this.uiService.presentAlert(errorTextLase);
        IsSubmit = false;
        return;
      }

      element.Start = +_elementStart || null
      element.End = +_elementEnd || null
      //validate money
      const _elementAmount = element.Amount!=null?''+element.Amount:null
      let checkMoney1
      if(this.name == "ProtectList"){
         checkMoney1 = element.Amount!=null?this.uiService.checkInputMoneyPercentZero(_elementAmount):{status:true,case:3}
      }else{
         checkMoney1 = element.Amount!=null?this.uiService.checkInputMoneyPercentNoneZero(_elementAmount):{status:true,case:3}
      }

      if(!checkMoney1.status){
        const text = !checkMoney1.status&&checkMoney1.case===1?"POLICY_DETAIL.ALERT_MONEY_INPUT":
        !checkMoney1.status&&checkMoney1.case===2?"POLICY_DETAIL.ALERT_MONEY_INPUT_FORMAT":""
        let errorText: string = this.translateService.instant(text);

        const errorTextLase = this.translateService.instant("POLICY_DETAIL.ALERT_ERROR_YEAR_INPUT_CASE2")
        await this.uiService.presentAlert(errorTextLase);
        IsSubmit = false;
        return;
      }
      element.Amount = +_elementAmount
      console.log(' element.Amount',  element.Amount)
      if (element.IsRange == false) element.End = element.Start;
      if (element.End == element.Start) element.IsRange = false;

      if (element.End < element.Start) {
        let errorText: string = this.translateService.instant(
          "POLICY_REPAY.ERROR_TEXT_1"
        );
        // errorText = "กรุณากรอกข้อมูลให้ถูกต้อง";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }

      if (this.name == "ReturnList" && element.End > this.yearOfProtect) {
        let errorText: string = this.translateService.instant(
          "POLICY_REPAY.END_MORE_YEAR_PROTECT"
        );
        // let errorText = "จำนวนปีต้องไม่เกินระยะเวลาคุ้มครอง";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }

      if (this.name == "ComissionList" && element.End > this.yearToPaid) {
        let errorText: string = this.translateService.instant(
          "POLICY_REPAY.END_MORE_YEAR_PAID"
        );
        // let errorText = "จำนวนปีต้องไม่เกินระยะเวลาชำระเบี้ยประกัน";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }

      checkSumOfProtect = checkSumOfProtect + this.SumNumber(element.Start, element.End)
      // if (this.name == "ProtectList" && element.End == this.yearOfProtect)      
      //   isProtectAllYear = true;

      

      if (
        element.Start == null &&
        element.End == null &&
        element.Amount == null
      ) {
        this.delete(i);
        continue;
      }

      if (
        element.Start == null ||
        element.Start == 0 ||
        element.End == null ||
        element.End == 0 ||
        element.Amount == null
      ) {
        let errorText: string = this.translateService.instant(
          "POLICY_REPAY.ERROR_TEXT_3"
        );
        // errorText = "กรุณากรอกข้อมูลให้ครบถ้วน";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }
    }

    var yearAmount = this.GetYearAmount(this.lengthYearAmountList);
    //console.log(yearAmount);

    for (let i = 0; i < yearAmount.length; i++) {
      const before = yearAmount[i - 1] ? yearAmount[i - 1].Year : 0;
      const after = yearAmount[i].Year;
      if (before == after) {
        let errorText: string = this.translateService.instant(
          "POLICY_DETAIL.DUPLICATE_YEAR"
        );
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }
    } 
    
    if(this.name == "ComissionList" && this.lengthYearAmountList.length < 1){
      let errorText: string = this.translateService.instant("ADD_POLICY.COMMISSION_ERROR");
      await this.uiService.presentAlert(errorText);
      IsSubmit = false;
      return;
    }

    var totalProtectSum = this.SumNumber(1, this.yearOfProtect);
    

    if (this.name == "ProtectList" && this.lengthYearAmountList.length == 0) {
      let errorText: string = this.translateService.instant(
        "POLICY_REPAY.ERROR_TEXT_6"
      );
      // let errorText = "กรุณากรอกจำนวนปีคุ้มครองให้ครบ";
      //  errorText = "จำนวนปีของค่าคอมต้องไม่เกิน " + this.yearToPaid + " ปี";
      await this.uiService.presentAlert(errorText);
      IsSubmit = false;
      return;
    }

    if (this.name == "ProtectList" && (checkSumOfProtect != totalProtectSum)) {
      let errorText: string = this.translateService.instant(
        "POLICY_REPAY.PROTECT_CHECK_SUM"
      );
      // let errorText = "จำนวนปีต้องไม่เกินระยะเวลาคุ้มครอง";
      await this.uiService.presentAlert(errorText);
      IsSubmit = false;
      return;
    }

    if (IsSubmit) {
      this.lengthYearAmountList.sort((a, b) => (a.Start > b.Start ? 1 : -1));
      var date = {
        lengthYearAmountList: this.lengthYearAmountList,
        name: this.name,
      };
      this.modalController.dismiss(date);
    }
  }

  public GetYearAmount(list: LengthYearAmount[]): YearAmount[] {
    var _list = new Array<YearAmount>();
    list.forEach((element) => {
      for (var i = element.Start; i <= element.End; i++) {
        var yearAmount = new YearAmount();
        yearAmount.Year = i;
        yearAmount.Amount = +element.Amount;
        _list.push(yearAmount);
      }
    });
    _list.sort((a, b) => (a.Year < b.Year ? 1 : -1));
    return _list;
  }

  addSingle() {
    var lengthYearAmount1 = new LengthYearAmount();
    lengthYearAmount1.IsRange = false;
    this.lengthYearAmountList.push(lengthYearAmount1);
    this.content.scrollToBottom(300);
  }

  addRange() {
    var lengthYearAmount2 = new LengthYearAmount();
    lengthYearAmount2.IsRange = true;
    this.lengthYearAmountList.push(lengthYearAmount2);
    this.content.scrollToBottom(300);
  }

  delete(i: number) {
    this.lengthYearAmountList.splice(i, 1);
  }

  yearInputValidate(input, index, isStart) {
    let result = Math.floor(input.replace('-',""))
    const patten = /[.]/g;
    const dot = patten.test(input)
    //console.log('result', result)
    if (isStart ) {
      if (result > 0 && !dot) { 
       this.lengthYearAmountList[index].Start = Math.floor(+result);   
      } else {
        this.lengthYearAmountList[index].Start = 1;
      }
    } else {
      if (result > 0) {
        this.lengthYearAmountList[index].End = Math.floor(+result);
      } else {
        this.lengthYearAmountList[index].End = 1;
      }
    }
  }

  moneyInputValidate(input,index){
    let result = +input
      if (result >= 0) {
        this.lengthYearAmountList[index].Amount = +result;
      } else {
        this.lengthYearAmountList[index].Amount = 1;
      }
  }

  SumNumber(start:number,end:number): number{
    var sum = 0;
    for (let index = start; index <= end; index++) {
      sum = sum + index;     
    }
    return sum;
}

}
