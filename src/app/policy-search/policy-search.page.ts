import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-policy-search",
  templateUrl: "./policy-search.page.html",
  styleUrls: ["./policy-search.page.scss"],
})
export class PolicySearchPage implements OnInit {
  option_1_1: boolean = true;
  option_1_2: boolean = true;
  option_2_1: boolean = true;
  option_2_2: boolean = true;

  constructor(
    private NavController: NavController,
    private translateService: TranslateService
  ) {}

  ngOnInit() {}

  searchPolicy() {
    this.NavController.navigateForward(["policy-search-result"]);
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
