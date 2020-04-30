import { Component, OnInit } from '@angular/core';
import { UserCrudModel, UidRoleModel } from '../interfaces/index';
import { UserServiceService } from '../services/user-service.service';
import { DataCenterService } from '../services/data-center.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalController } from '@ionic/angular';
import { EditChangePasswordPage } from '../edit-change-password/edit-change-password.page';

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
    private translateService:TranslateService,
    public modalController: ModalController
  ) { }

  ngOnInit() {

  }

  async  ionViewDidEnter() {
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

  private async changePassword(){
    const modal = await this.modalController.create({
      component: EditChangePasswordPage
    });

    modal.onDidDismiss().then(result => {
      console.log(result)
    })
    return await modal.present(); 
  }

}
