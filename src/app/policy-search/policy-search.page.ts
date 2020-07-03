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

  ngOnInit() {}

  async searchPolicy() {
    this.SearchModel.irr = (this.SearchModel.irr) ? this.SearchModel.irr : 0;
    this.SearchModel.worth = (this.SearchModel.worth) ? this.SearchModel.worth : 0;
    this.SearchModel.protect = (this.SearchModel.protect) ? this.SearchModel.protect : 0;


    this.SearchModel.isHealthFalse = (this.SearchModel.isHealthFalse) ? this.SearchModel.isHealthFalse : false;
    this.SearchModel.isHealthTrue = (this.SearchModel.isHealthTrue) ? this.SearchModel.isHealthTrue : false;
    this.SearchModel.isTaxDeductFalse = (this.SearchModel.isTaxDeductFalse) ? this.SearchModel.isTaxDeductFalse : false;
    this.SearchModel.isTaxDeductTrue = (this.SearchModel.isTaxDeductTrue) ? this.SearchModel.isTaxDeductTrue : false;

    var sumPercent = this.SearchModel.irr + this.SearchModel.worth + this.SearchModel.protect;
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
}
