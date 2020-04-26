import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LengthYearAmount } from '../interfaces/LengthYearAmount';
import { NavController, ModalController } from '@ionic/angular';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-add-policy-repay-general-user',
  templateUrl: './add-policy-repay-general-user.page.html',
  styleUrls: ['./add-policy-repay-general-user.page.scss'],
})
export class AddPolicyRepayGeneralUserPage implements OnInit {

  constructor(
    private translateService: TranslateService,
    private NavController: NavController,
    private uiService: UiService,
    private modalController: ModalController,
  ) { }


  @Input('name') name: string;
  @Input('yearToPaid') yearToPaid: number;
  @Input('yearOfProtect') yearOfProtect: number;
  @Input('lengthYearAmountList') lengthYearAmountList: LengthYearAmount[];

  ngOnInit() {
    if (this.lengthYearAmountList.length == 0) {
      var lengthYearAmount1 = new LengthYearAmount();
      lengthYearAmount1.IsRange = false;
      this.lengthYearAmountList.push(lengthYearAmount1);

      var lengthYearAmount2 = new LengthYearAmount();
      lengthYearAmount2.IsRange = true;
      this.lengthYearAmountList.push(lengthYearAmount2);
    }
  }


  back() {
    this.modalController.dismiss('false')
  }

  async submit() {
    var IsSubmit = true;
    for (let key in this.lengthYearAmountList) {
      var element = this.lengthYearAmountList[key];
      if (element.IsRange == false) element.End = element.Start;
      if (element.End == element.Start) element.IsRange = false;

      if (element.End < element.Start) {
        let errorText: string = this.translateService.instant("ADD_POLICY.ERROR_RESPONSE_TEXT");
        errorText = "กรุณากรอกข้อมูลให้ถูกต้อง";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }

      if (this.name != 'ComissionList' && element.End > this.yearToPaid) {
        let errorText: string = this.translateService.instant("ADD_POLICY.ERROR_RESPONSE_TEXT");
        errorText = "จำนวนปีจ่ายเบี้ยต้องไม่เกิน " + this.yearToPaid + " ปี";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }

      if (this.name == 'ComissionList' && element.End > this.yearOfProtect) {
        let errorText: string = this.translateService.instant("ADD_POLICY.ERROR_RESPONSE_TEXT");
        errorText = "จำนวนปีของค่าคอมต้องไม่เกิน " + this.yearOfProtect + " ปี";
        await this.uiService.presentAlert(errorText);
        IsSubmit = false;
        return;
      }
    }

    if (IsSubmit) {
      var date = {
        lengthYearAmountList: this.lengthYearAmountList,
        name: this.name
      }
      this.modalController.dismiss(date)
    }
  }

  addSingle() {
    var lengthYearAmount1 = new LengthYearAmount();
    lengthYearAmount1.IsRange = false;
    this.lengthYearAmountList.push(lengthYearAmount1);
  }
  addRange() {
    var lengthYearAmount2 = new LengthYearAmount();
    lengthYearAmount2.IsRange = true;
    this.lengthYearAmountList.push(lengthYearAmount2);
  }

  delete(i: number) {
    this.lengthYearAmountList.splice(i, 1);
  }

}
