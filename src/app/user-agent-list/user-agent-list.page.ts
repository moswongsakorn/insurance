import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserCrudModel } from '../interfaces';
import { UserServiceService } from '../services/user-service.service';
import { DataCenterService } from '../services/data-center.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-agent-list',
  templateUrl: './user-agent-list.page.html',
  styleUrls: ['./user-agent-list.page.scss'],
})
export class UserAgentListPage implements OnInit {

  constructor(
    private NavController: NavController,
    private UserService: UserServiceService,
    private DataCenterService: DataCenterService
  ) { }

  public userProfile: UserCrudModel = new UserCrudModel();
  public userAgentList: UserCrudModel[];
  public userAgentListForSearch: UserCrudModel[];

  ngOnInit() {
  }

  async ionViewDidEnter() {
    try {
      this.userProfile = this.DataCenterService.GetThisUserProfile();
      this.userAgentList = await this.UserService.GetUserAgentListByPin(this.userProfile.Pin);
      this.userAgentList = this.userAgentList.filter(user => user.Uid != this.userProfile.Uid);
      this.userAgentListForSearch = this.userAgentList;
      console.log(this.userAgentList)
    } catch (error) {
    }
  }


  Searchbar(event) {
    let searchData = this.userAgentListForSearch.filter((value, key) => {
      let val = value.FirstName + " " + value.LastName;
      if (val.search(event.detail.value) == -1) {
        return false;
      } else {
        return true;
      }
    });
    this.userAgentList = searchData;
  }

  back() {
    this.NavController.navigateBack("policy-list-general-user");
  }

  userAgentInformation(uid: string) {
    this.NavController.navigateForward('agent-information', { queryParams: { uid: uid } })

  }

}
