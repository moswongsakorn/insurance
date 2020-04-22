import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-policy-protection-general-user',
  templateUrl: './add-policy-protection-general-user.page.html',
  styleUrls: ['./add-policy-protection-general-user.page.scss'],
})
export class AddPolicyProtectionGeneralUserPage implements OnInit {

  constructor(
    private translateService:TranslateService
  ) { }

  ngOnInit() {
  }

}
