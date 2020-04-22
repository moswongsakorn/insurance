import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-policy-repay-general-user',
  templateUrl: './add-policy-repay-general-user.page.html',
  styleUrls: ['./add-policy-repay-general-user.page.scss'],
})
export class AddPolicyRepayGeneralUserPage implements OnInit {

  constructor(
    private translateService:TranslateService
  ) { }

  ngOnInit() {
  }

}
