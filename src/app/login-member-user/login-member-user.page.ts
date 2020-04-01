import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-member-user',
  templateUrl: './login-member-user.page.html',
  styleUrls: ['./login-member-user.page.scss'],
})
export class LoginMemberUserPage implements OnInit {

  constructor(
    public navController: NavController
  ) { }

  ngOnInit() {
  }

  public Register(){
    this.navController.navigateForward(['register-choice-member-user']);
  }

}
