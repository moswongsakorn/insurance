import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy-list-general-user',
  templateUrl: './policy-list-general-user.page.html',
  styleUrls: ['./policy-list-general-user.page.scss'],
})
export class PolicyListGeneralUserPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(){
    console.log('click',)
    this.router.navigate(['/personal-information-general-user'])
  }

}
