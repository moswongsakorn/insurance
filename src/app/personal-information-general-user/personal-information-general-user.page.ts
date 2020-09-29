import { Component, OnInit } from '@angular/core';
import { UserCrudModel, UidRoleModel } from '../interfaces/index';
import { UserServiceService } from '../services/user-service.service';
import { DataCenterService } from '../services/data-center.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalController, NavController } from '@ionic/angular';
import { EditChangePasswordPage } from '../edit-change-password/edit-change-password.page';
import { UiService } from '../services/ui.service';
import { async } from '@angular/core/testing';
import { PolicyService } from '../services/policy.service';
import { MagicNumber } from '../interfaces/MagicNumber';

@Component({
  selector: 'app-personal-information-general-user',
  templateUrl: './personal-information-general-user.page.html',
  styleUrls: ['./personal-information-general-user.page.scss'],
})
export class PersonalInformationGeneralUserPage implements OnInit {

  public user: UserCrudModel = new UserCrudModel();

  constructor(
    private UserService: UserServiceService,
    private DataCenterService: DataCenterService,
    private translateService: TranslateService,
    public modalController: ModalController,
    public uiService: UiService,
    private policyService: PolicyService,
    private NavController: NavController
  ) { }

  ngOnInit() {

  }

  async ionViewDidEnter() {
    var isLogin = await this.UserService.IsLogin();
    if (isLogin.status) {
      var isLoginDetail = isLogin.detail as UidRoleModel;
      this.UserService.GetUserProfilePromise(isLoginDetail.Uid)
        .then(user => {
          this.user = user;
          this.DataCenterService.SetUserCrudModel(this.user);
          console.log('user', this.user)
        });
    }
  }

  private async changePassword() {
    const modal = await this.modalController.create({
      component: EditChangePasswordPage
    });

    modal.onDidDismiss().then(result => {
      console.log(result)
    })
    return await modal.present();
  }

  public async RemoveUser() {
    this.uiService.ConfirmedRemove(async (password) => {
      this.uiService.presentLoading();
      if (this.user.Role != MagicNumber.user) {
        var policyList = await this.policyService.GetPolicyListByPin(this.user.Pin);
        policyList.forEach(po => {
          var result = this.policyService.RemovePolicy(po.Key);
          console.log("Remove==> ",result )
        });

        var agentList = await this.UserService.GetUserAgentListByPin(this.user.Pin);
        agentList.forEach(user => {
          user.Pin = "";
          this.UserService.UpdateAgentUser(user);
        });
      }

      var result = await this.UserService.RemoveAccount(password);
      if (result.status) {       
        this.uiService.dismissLoading();
        this.NavController.navigateRoot(['home']);
      }
      else {
        const resultText = this.translateService.instant('REGISTER_GENERAL.ERROR_TEXT_5')
        this.uiService.dismissLoading();
        this.uiService.presentAlert(resultText);
      }
    })
  }

}
