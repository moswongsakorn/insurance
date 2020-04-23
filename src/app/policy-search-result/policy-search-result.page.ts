import { Component, OnInit } from '@angular/core';
import { PolicyCrudModel } from '../interfaces';
import { UiService } from '../services/ui.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-policy-search-result',
  templateUrl: './policy-search-result.page.html',
  styleUrls: ['./policy-search-result.page.scss'],
})
export class PolicySearchResultPage implements OnInit {
  public activeStatus:boolean =false;
  public policyList
  constructor(
    private UiService:UiService,
    private translateService:TranslateService
  ) { }

  ngOnInit() {
    this.UiService.presentLoading() //Present Loading

    this.policyList  = [{},{}]
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.UiService.dismissLoading() //Dismiss Loading
      this.activeStatus = true
    }, 2000);
  }

}
