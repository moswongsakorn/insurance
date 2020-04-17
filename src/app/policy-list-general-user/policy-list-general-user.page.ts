import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { UserServiceService } from "../services/user-service.service";
import { PolicyService } from "../services/policy.service";
import { UserCrudModel, PolicyCrudModel } from "../interfaces";
import { DataCenterService } from "../services/data-center.service";
import { UiService } from "../services/ui.service";
import { async } from "@angular/core/testing";

@Component({
  selector: "app-policy-list-general-user",
  templateUrl: "./policy-list-general-user.page.html",
  styleUrls: ["./policy-list-general-user.page.scss"],
})
export class PolicyListGeneralUserPage implements OnInit {
  constructor(
    private router: Router,
    private UserService: UserServiceService,
    private NavController: NavController,
    private PolicyService: PolicyService,
    private DataCenterService: DataCenterService,
    public uiService: UiService
  ) {}

  public policyList: PolicyCrudModel[];
  public policyListForSearch: PolicyCrudModel[];

  public userProfile: UserCrudModel = new UserCrudModel();
  public activeStatus:boolean=false;
  public skeletonArray = new Array(15)

  async ngOnInit() {
  }

  async ionViewDidEnter() {
    try {
      this.userProfile = this.DataCenterService.GetThisUserProfile();
      this.policyList = await this.PolicyService.GetPolicyListByPin(
        this.userProfile.Pin
      );
      this.policyListForSearch = this.policyList;
      console.log(this.policyList);
      this.activeStatus = true
      this.skeletonArray = null
    } catch (error) {
    }
  
  }

  navigate() {
    console.log("click");
    this.router.navigate(["/personal-information-general-user"]);
  }

  async Logout() {
    this.uiService.presentAlertConfirm(
      "ต้องการออกจากระบบใช่หรือไม่",
      async () => {
        this.uiService.presentLoading();
        var result = await this.UserService.Logout();
        console.log(result);
        if (result.status) {
          this.NavController.navigateRoot(["login-general-user"]);
          this.uiService.dismissLoading();
        }
      }
    );
  }

  Searchbar(event) {
    let searchData = this.policyListForSearch.filter((value, key) => {
      let val = value.CompanyName + " " + value.PolicyName;
      if (val.search(event.detail.value) == -1) {
        return false;
      } else {
        return true;
      }
    });
    this.policyList = searchData;
  }
}
