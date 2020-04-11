import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy-detail-general-user',
  templateUrl: './policy-detail-general-user.page.html',
  styleUrls: ['./policy-detail-general-user.page.scss'],
})
export class PolicyDetailGeneralUserPage implements OnInit {
  private items = new Array(5)
  constructor() { }

  ngOnInit() {
  }

}
