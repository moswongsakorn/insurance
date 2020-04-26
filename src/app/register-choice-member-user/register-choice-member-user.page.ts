import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register-choice-member-user',
  templateUrl: './register-choice-member-user.page.html',
  styleUrls: ['./register-choice-member-user.page.scss'],
})
export class RegisterChoiceMemberUserPage implements OnInit {

  constructor(
    public navController: NavController,
    private translateService:TranslateService
  ) { }

  ngOnInit() {
  }

}
