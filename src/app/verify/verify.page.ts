import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from '../services/ui.service';
import { UserServiceService } from '../services/user-service.service';
import { NavController } from '@ionic/angular';
import { DataCenterService } from '../services/data-center.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  constructor(
    private translateService: TranslateService,
    private uiService: UiService,
    private UserService: UserServiceService,
    private NavController: NavController,
    private DataCenterService: DataCenterService
  ) { }


  async ngOnInit() {
  }

  async ionViewDidEnter() {
    var userProfile = await this.UserService.GetThisUser();;
    if (userProfile == null) this.NavController.navigateRoot(["home"]);
    else if (userProfile.Verify) this.NavController.navigateRoot(["policy-list-general-user"]);
  }

  async Logout() {
    const resultText: string = this.translateService.instant('POLICY_LIST_PAGE.LOGOUT_CONFIRM');
    this.uiService.presentAlertConfirm(resultText,
      async () => {
        this.uiService.presentLoading();
        var result = await this.UserService.Logout();
        console.log(result);
        if (result.status) {
          this.NavController.navigateRoot(["home"]);
          this.uiService.dismissLoading();
        }
      }
    );
  }

}
