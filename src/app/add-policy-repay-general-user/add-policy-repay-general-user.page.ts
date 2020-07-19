import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LengthYearAmount } from '../interfaces/LengthYearAmount';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { UiService } from '../services/ui.service';
import { YearAmount } from '../interfaces/YearAmount';


@Component({
  selector: 'app-add-policy-repay-general-user',
  templateUrl: './add-policy-repay-general-user.page.html',
  styleUrls: ['./add-policy-repay-general-user.page.scss'],
})
export class AddPolicyRepayGeneralUserPage implements OnInit {

  public lengthYearAmountList: LengthYearAmount[] = new Array<LengthYearAmount>();

  constructor(
    private translateService: TranslateService,
    private NavController: NavController,
    private uiService: UiService,
    private modalController: ModalController,
  ) {
  }

  @ViewChild('content', { static: true }) private content: any;
  @Input('name') name: string;
  @Input('yearToPaid') yearToPaid: number;
  @Input('yearOfProtect') yearOfProtect: number;
  @Input('thisLengthYearAmountList') thisLengthYearAmountList: LengthYearAmount[];


  public Title: string = "";

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.lengthYearAmountList = [...this.thisLengthYearAmountList];
    if (this.lengthYearAmountList.length == 0) {
      var lengthYearAmount1 = new LengthYearAmount();
      lengthYearAmount1.IsRange = false;
      this.lengthYearAmountList.push(lengthYearAmount1);

      var lengthYearAmount2 = new LengthYearAmount();
      lengthYearAmount2.IsRange = true;
      this.lengthYearAmountList.push(lengthYearAmount2);
    }

    if (this.name == 'ReturnList') {
      this.Title = this.translateService.instant("ADD_POLICY.LAST_YEAR_INSURANCE_MONEY");
    }

    else if (this.name == 'ComissionList') {
      this.Title = this.translateService.instant("ADD_POLICY.COMMISSION");

    }

    else if (this.name == 'ProtectList') {
      this.Title = this.translateService.instant("ADD_POLICY.DEATH_COVERAGE");

    }
  }


  back() {
    this.modalController.dismiss(false)
  }

  async submit() {
    var IsSubmit = true;
    this.lengthYearAmountList.sort((a, b) => (a.Start > b.Start) ? 1 : -1);    

    var isProtectAllYear = false;
    for (let i = this.lengthYearAmountList.length - 1; i >= 0; i--) {
      var element = this.lengthYearAmountList[i];
      if (element.Start == null &&
        element.End == null &&
        element.Amount == null) {
        this.delete(i);
        continue;
      }


      if (element.IsRange == false) element.End = element.Start;
      if (element.End == element.Start) element.IsRange = false;

      if (element.End < element.Start) {
        let errorText: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_1");
        // errorText = "กรุณากรอกข้อมูลให้ถูกต้อง";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }

      if (this.name == 'ReturnList' && element.End > this.yearOfProtect) {
        let errorText: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_4");
        // let errorText = "จำนวนปีต้องไม่เกินระยะเวลาคุ้มครอง";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }

      if (this.name == 'ComissionList' && element.End > this.yearToPaid) {
        let errorText: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_5");
        // let errorText = "จำนวนปีต้องไม่เกินระยะเวลาชำระเบี้ยประกัน";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }

      if (this.name == 'ProtectList' && element.End == this.yearOfProtect) isProtectAllYear = true;
      if (this.name == 'ProtectList' && element.End > this.yearOfProtect) {
        let errorText: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_4");
        // let errorText = "จำนวนปีต้องไม่เกินระยะเวลาคุ้มครอง";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }

      if (element.Start == null &&
        element.End == null &&
        element.Amount == null) {
        this.delete(i);
        continue;
      }


      if (element.Start == null || element.Start == 0 ||
        element.End == null || element.End == 0 ||
        element.Amount == null) {
        let errorText: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_3");
        // errorText = "กรุณากรอกข้อมูลให้ครบถ้วน";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }
    }

    var yearAmount = this.GetYearAmount(this.lengthYearAmountList);
    console.log(yearAmount)

    for (let i = 0; i < yearAmount.length; i++) {
      const before = (yearAmount[i - 1]) ? yearAmount[i - 1].Year : 0;
      const after = yearAmount[i].Year;
      if (before == after) {
        let errorText: string = this.translateService.instant("POLICY_DETAIL.ALERT_ERROR_YEAR");
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }      
    }

    if (this.name == 'ProtectList' && !isProtectAllYear) {
      let errorText1: string = this.translateService.instant("POLICY_REPAY.ERROR_TEXT_2");
      let errorText2: string = this.translateService.instant("CODE.YEAR");
      let errorText = "กรุณากรอกจำนวนปีคุ้มครองให้ครบ";
      //  errorText = "จำนวนปีของค่าคอมต้องไม่เกิน " + this.yearToPaid + " ปี";
      await this.uiService.presentAlert(errorText);
      IsSubmit = false;
      return;
    }

    if (IsSubmit) {
      var date = {
        lengthYearAmountList: this.lengthYearAmountList,
        name: this.name
      }
      this.modalController.dismiss(date)
    }
  }

  public GetYearAmount(list: LengthYearAmount[]): YearAmount[] {
    var _list = new Array<YearAmount>();
    list.forEach(element => {
      for (var i = element.Start; i <= element.End; i++) {
        var yearAmount = new YearAmount();
        yearAmount.Year = i;
        yearAmount.Amount = element.Amount;
        _list.push(yearAmount);
      }
    });
    _list.sort((a, b) => (a.Year < b.Year) ? 1 : -1);
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

}
